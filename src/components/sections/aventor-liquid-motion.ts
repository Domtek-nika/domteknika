export const AVENTOR_FLOW_COLUMNS = 32;
export const AVENTOR_FLOW_SAMPLES = 192;
export const AVENTOR_FLOW_HALF_WIDTH = 80;
export const AVENTOR_FLOW_RANGE = 8;

function waveX(y: number) {
  if (y < 340) return 660 + 440 * Math.pow(Math.max(0, (340 - y) / 360), 1.35);
  if (y < 640) return 660 + 147 * Math.pow((y - 340) / 300, 0.85);
  return 807 + 658 * Math.pow((y - 640) / 285, 1.35);
}

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));
type Pointer = { x: number; y: number };

export function createAventorLiquidMotion() {
  const columns = AVENTOR_FLOW_COLUMNS;
  const rows = AVENTOR_FLOW_SAMPLES;
  const count = columns * rows;
  const spacingX = 2 * AVENTOR_FLOW_HALF_WIDTH / (columns - 1);
  const spacingY = 941 / (rows - 1);
  // A two-dimensional flow inside the glass, with momentum separate from displacement.
  // Pointer events add force; only the animation loop moves the reflections.
  let velocityX = new Float32Array(count);
  let velocityY = new Float32Array(count);
  let offsetX = new Float32Array(count);
  let offsetY = new Float32Array(count);
  let nextVX = new Float32Array(count);
  let nextVY = new Float32Array(count);
  let nextX = new Float32Array(count);
  let nextY = new Float32Array(count);
  const pixels = new Uint8Array(count * 4);
  const curve = Array.from({ length: rows }, (_, index) => {
    const y = index * spacingY;
    const slope = (waveX(y + 1) - waveX(y - 1)) / 2;
    const length = Math.hypot(slope, 1);
    return { x: waveX(y), y, nx: 1 / length, ny: -slope / length, ty: 1 / length };
  });
  let previous: Pointer | null = null;
  let scale = 2;

  const sample = (values: Float32Array, x: number, y: number) => {
    if (x < 0 || x > columns - 1 || y < 0 || y > rows - 1) return 0;
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const i = iy * columns + ix;
    const right = Math.min(ix + 1, columns - 1) - ix;
    const down = (Math.min(iy + 1, rows - 1) - iy) * columns;
    return (values[i] * (1 - fx) + values[i + right] * fx) * (1 - fy)
      + (values[i + down] * (1 - fx) + values[i + down + right] * fx) * fy;
  };
  const pack = () => {
    for (let index = 0; index < count; index++) {
      const n = Math.round(32768 + clamp(offsetX[index] / AVENTOR_FLOW_RANGE, 1) * 32767);
      const s = Math.round(32768 + clamp(offsetY[index] / AVENTOR_FLOW_RANGE, 1) * 32767);
      pixels[index * 4] = n >> 8;
      pixels[index * 4 + 1] = n & 255;
      pixels[index * 4 + 2] = s >> 8;
      pixels[index * 4 + 3] = s & 255;
    }
    return pixels;
  };

  return {
    move(x: number, y: number, imagePixelsPerScreenPixel: number, time: number) {
      scale = imagePixelsPerScreenPixel;
      const from = previous;
      previous = { x, y };
      if (!from) return;
      const dx = (x - from.x) / scale;
      const dy = (y - from.y) / scale;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.05 || distance > 160) return;
      const steps = Math.max(1, Math.ceil(distance / 2));
      const idle = Math.sin(time * 0.55) * 0.65 * Math.min(6.5, scale);
      for (let step = 1; step <= steps; step++) {
        const t = step / steps;
        const px = from.x + (x - from.x) * t;
        const py = from.y + (y - from.y) * t;
        if (py < 70 || py > 855) continue;
        const row = Math.max(1, Math.min(rows - 2, Math.round(py / spacingY)));
        const center = curve[row];
        const distanceToGlass = Math.abs((px - waveX(py) - idle) * center.nx) / scale;
        if (distanceToGlass >= 7) continue;
        const proximity = 1 - distanceToGlass / 7;
        const contact = proximity * proximity * (3 - 2 * proximity);
        const transverse = (dx * center.nx + dy * center.ny) / steps;
        const along = (-dx * center.ny + dy * center.nx) / steps;
        const support = 17 * scale;
        const rowSupport = Math.ceil(support / spacingY);
        for (let iy = Math.max(1, row - rowSupport); iy <= Math.min(rows - 2, row + rowSupport); iy++) {
          const node = curve[iy];
          for (let ix = 1; ix < columns - 1; ix++) {
            const across = ix * spacingX - AVENTOR_FLOW_HALF_WIDTH;
            const radius = Math.hypot(node.x + across - px, node.y - py) / support;
            if (radius >= 1) continue;
            const weight = Math.pow(1 - radius * radius, 3) * contact;
            const index = iy * columns + ix;
            velocityX[index] = clamp(velocityX[index] + transverse * 2.8 * weight, 22);
            velocityY[index] = clamp(velocityY[index] + (along * 4.5 + Math.abs(transverse) * 5) * weight, 38);
          }
        }
      }
    },
    leave() { previous = null; },
    reset() {
      previous = null;
      for (const field of [velocityX, velocityY, offsetX, offsetY, nextVX, nextVY, nextX, nextY]) field.fill(0);
      pack();
    },
    step(delta: number) {
      const seconds = Math.max(0, Math.min(delta, 64)) / 1000;
      const steps = Math.max(1, Math.ceil(seconds / (1 / 60)));
      const dt = seconds / steps;
      const drag = Math.exp(-dt / 0.65);
      const fade = Math.exp(-dt / 1.5);
      for (let step = 0; step < steps; step++) {
        for (let iy = 1; iy < rows - 1; iy++) {
          const node = curve[iy];
          for (let ix = 1; ix < columns - 1; ix++) {
            const index = iy * columns + ix;
            const upstreamY = iy - (24 + velocityY[index] * 0.3) * scale * node.ty * dt / spacingY;
            const upstreamX = ix - velocityX[index] * scale * node.nx * dt / spacingX;
            const vx = sample(velocityX, upstreamX, upstreamY);
            const vy = sample(velocityY, upstreamX, upstreamY);
            const diffusion = Math.min(0.15, 35 * scale * scale * dt / (spacingX * spacingY));
            nextVX[index] = (vx + diffusion * (velocityX[index-1] + velocityX[index+1] + velocityX[index-columns] + velocityX[index+columns] - 4*velocityX[index])) * drag;
            nextVY[index] = (vy + diffusion * (velocityY[index-1] + velocityY[index+1] + velocityY[index-columns] + velocityY[index+columns] - 4*velocityY[index])) * drag;
            nextX[index] = clamp((sample(offsetX, upstreamX, upstreamY) + nextVX[index] * dt) * fade, 2.4);
            nextY[index] = clamp((sample(offsetY, upstreamX, upstreamY) + nextVY[index] * dt) * fade, 4.5);
          }
        }
        [velocityX, nextVX] = [nextVX, velocityX];
        [velocityY, nextVY] = [nextVY, velocityY];
        [offsetX, nextX] = [nextX, offsetX];
        [offsetY, nextY] = [nextY, offsetY];
      }
      return pack();
    },
  };
}

const HEIGHT = 941;
const SAMPLES = 128;
const MAX_X = 32;
const MAX_Y = 12;

function waveX(y: number) {
  if (y < 340) return 660 + 440 * Math.pow(Math.max(0, (340 - y) / 360), 1.35);
  if (y < 640) return 660 + 147 * Math.pow((y - 340) / 300, 0.85);
  return 807 + 658 * Math.pow((y - 640) / 285, 1.35);
}

export function createAventorLiquidMotion() {
  const nodes = Array.from({ length: SAMPLES }, (_, index) => {
    const y = index / (SAMPLES - 1) * HEIGHT;
    return { x: waveX(y), y, dragX: 0, dragY: 0, offsetX: 0, offsetY: 0 };
  });
  const pixels = new Uint8Array(SAMPLES * 4);
  let previous: { x: number; y: number } | null = null;

  return {
    samples: SAMPLES,
    move(x: number, y: number, imagePixelsPerScreenPixel: number) {
      const radiusX = 18 * imagePixelsPerScreenPixel;
      const radiusY = 38 * imagePixelsPerScreenPixel;
      const nearGlass = nodes.some((node) => Math.pow((x - node.x) / radiusX, 2) + Math.pow((y - node.y) / radiusY, 2) < 1);
      if (!nearGlass) { previous = null; return; }
      if (previous) {
        const dx = Math.max(-80, Math.min(80, x - previous.x));
        const dy = Math.max(-60, Math.min(60, y - previous.y));
        for (const node of nodes) {
          const distance = Math.pow((x - node.x) / radiusX, 2) + Math.pow((y - node.y) / radiusY, 2);
          const weight = Math.pow(Math.max(0, 1 - distance), 2) * Math.sin(node.y / HEIGHT * Math.PI);
          node.dragX = Math.max(-MAX_X, Math.min(MAX_X, node.dragX + dx * weight * 0.42));
          node.dragY = Math.max(-MAX_Y, Math.min(MAX_Y, node.dragY + dy * weight * 0.16));
        }
      }
      previous = { x, y };
    },
    leave() { previous = null; },
    reset() {
      previous = null;
      for (const node of nodes) node.dragX = node.dragY = node.offsetX = node.offsetY = 0;
    },
    step(delta: number) {
      const release = Math.exp(-delta / 550);
      const follow = 1 - Math.exp(-delta / 110);
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        node.dragX *= release;
        node.dragY *= release;
        node.offsetX += (node.dragX - node.offsetX) * follow;
        node.offsetY += (node.dragY - node.offsetY) * follow;
        pixels[index * 4] = Math.round(128 + node.offsetX / MAX_X * 127);
        pixels[index * 4 + 1] = Math.round(128 + node.offsetY / MAX_Y * 127);
        pixels[index * 4 + 2] = 0;
        pixels[index * 4 + 3] = 255;
      }
      return pixels;
    },
  };
}

import { AVENTOR_FLOW_COLUMNS, AVENTOR_FLOW_HALF_WIDTH, AVENTOR_FLOW_RANGE, AVENTOR_FLOW_SAMPLES } from "./aventor-liquid-motion";

const VERTEX = `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  varying vec2 uv;
  uniform sampler2D picture;
  uniform sampler2D liquid;
  uniform float elapsed;
  uniform float motionScale;
  const vec2 size = vec2(1671.0, 941.0);

  float waveX(float y) {
    if (y < 340.0) return 660.0 + 440.0 * pow(max(0.0, (340.0 - y) / 360.0), 1.35);
    if (y < 640.0) return 660.0 + 147.0 * pow((y - 340.0) / 300.0, 0.85);
    return 807.0 + 658.0 * pow((y - 640.0) / 285.0, 1.35);
  }
  vec3 colorAt(vec2 p) {
    return texture2D(picture, vec2(p.x / size.x, 1.0 - p.y / size.y)).rgb;
  }
  vec2 decodeFlow(vec2 index) {
    vec4 encoded = texture2D(liquid, (index + 0.5) / vec2(${AVENTOR_FLOW_COLUMNS}.0, ${AVENTOR_FLOW_SAMPLES}.0)) * 255.0;
    return (vec2(encoded.r * 256.0 + encoded.g, encoded.b * 256.0 + encoded.a) - 32768.0) / 32767.0 * ${AVENTOR_FLOW_RANGE}.0;
  }
  vec2 flowAt(vec2 p) {
    vec2 grid = vec2(${AVENTOR_FLOW_COLUMNS - 1}.0, ${AVENTOR_FLOW_SAMPLES - 1}.0);
    vec2 at = clamp(vec2((p.x - waveX(p.y)) / ${AVENTOR_FLOW_HALF_WIDTH * 2}.0 + 0.5, p.y / size.y), 0.0, 1.0) * grid;
    vec2 first = floor(at), f = fract(at);
    return mix(mix(decodeFlow(first), decodeFlow(min(first + vec2(1.0, 0.0), grid)), f.x),
      mix(decodeFlow(min(first + vec2(0.0, 1.0), grid)), decodeFlow(min(first + 1.0, grid)), f.x), f.y);
  }
  float protectedMarking(vec2 p) {
    // Protect the entire marking, including antialiasing and the surrounding panel.
    // A luminance mask misses light edges and creates displaced copies of letters.
    vec2 outside = max(max(vec2(530.0, 378.0) - p, p - vec2(855.0, 462.0)), vec2(0.0));
    return 1.0 - smoothstep(0.0, 24.0, length(outside));
  }
  float protectedBody(vec2 p) {
    // Pin the two edges of the body as glass streaks move vertically over the panel.
    float top = 1.0 - smoothstep(7.0, 20.0, abs(p.y - 341.0));
    float bottomY = 631.0 + (p.x - 710.0) * 0.07;
    float bottom = 1.0 - smoothstep(6.0, 18.0, abs(p.y - bottomY));
    float extent = smoothstep(580.0, 625.0, p.x) * (1.0 - smoothstep(900.0, 950.0, p.x));
    return max(protectedMarking(p), max(top, bottom) * extent);
  }
  vec3 glassAt(vec2 p) {
    float center = waveX(p.y);
    float band = 1.0 - smoothstep(24.0, 64.0, abs(p.x - center));
    vec3 left = colorAt(vec2(center - 75.0, p.y));
    vec3 right = colorAt(vec2(center + 100.0, p.y));
    vec3 background = mix(left, right, clamp((p.x - center + 75.0) / 175.0, 0.0, 1.0));
    // Separate the glass's light and dark streaks from the stationary body panel.
    return (colorAt(p) - background) * band * (1.0 - protectedBody(p));
  }
  void main() {
    vec2 p = vec2(uv.x, 1.0 - uv.y) * size;
    float center = waveX(p.y);
    float protection = protectedBody(p);
    if (protection == 1.0 || abs(p.x - center) > 170.0 || p.y < 1.0 || p.y > 920.0) {
      gl_FragColor = vec4(colorAt(p), 1.0);
      return;
    }
    float band = 1.0 - smoothstep(55.0, 150.0, abs(p.x - center));
    float anchored = smoothstep(0.0, 100.0, p.y) * (1.0 - smoothstep(795.0, 941.0, p.y));
    // Transport the existing glass streaks along the curve instead of pulling dents.
    vec2 current = flowAt(p);
    float slope = (waveX(p.y + 1.0) - waveX(p.y - 1.0)) * 0.5;
    float tangentY = inversesqrt(1.0 + slope * slope);
    float idle = sin(elapsed * 0.85) * 2.4;
    float shimmer = sin(elapsed * 0.92 - p.y * 0.006) * 1.55;
    float amount = anchored * band * (1.0 - protection);
    float sourceY = p.y - (current.y + shimmer) * motionScale * tangentY * amount;
    float sourceX = p.x + waveX(sourceY) - center - (idle + current.x) * motionScale * amount;
    vec2 source = vec2(sourceX, sourceY);

    float air = 1.0 - smoothstep(285.0, 335.0, p.y);
    air += smoothstep(655.0, 710.0, p.y) * (1.0 - smoothstep(805.0, 870.0, p.y));
    vec3 color = colorAt(mix(p, source, air));
    float middle = smoothstep(300.0, 345.0, p.y) * (1.0 - smoothstep(665.0, 710.0, p.y));
    if (middle > 0.0 && abs(p.x - center) < 125.0) {
      color += (glassAt(source) - glassAt(p)) * middle;
    }
    color = mix(color, colorAt(p), protection);
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

export function createAventorLiquidRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const textures: WebGLTexture[] = [];
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  const dispose = () => {
    shaders.forEach((shader) => gl.deleteShader(shader));
    textures.forEach((texture) => gl.deleteTexture(texture));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  };

  try {
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Shader unavailable");
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compilation failed");
      return shader;
    };
    program = gl.createProgram();
    if (!program) throw new Error("Program unavailable");
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "Shader linking failed");
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = (unit: number) => {
      const result = gl.createTexture();
      if (!result) throw new Error("Texture unavailable");
      textures.push(result);
      gl.activeTexture(unit);
      gl.bindTexture(gl.TEXTURE_2D, result);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return result;
    };
    texture(gl.TEXTURE0);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(gl.getUniformLocation(program, "picture"), 0);
    const liquid = texture(gl.TEXTURE1);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, AVENTOR_FLOW_COLUMNS, AVENTOR_FLOW_SAMPLES, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.uniform1i(gl.getUniformLocation(program, "liquid"), 1);
    const elapsed = gl.getUniformLocation(program, "elapsed");
    const motionScale = gl.getUniformLocation(program, "motionScale");

    return {
      render(field: Uint8Array, time: number) {
        const displayWidth = canvas.clientWidth;
        const width = Math.max(1, Math.round(displayWidth * 2));
        const height = Math.max(1, Math.round(canvas.clientHeight * 2));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, liquid);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, AVENTOR_FLOW_COLUMNS, AVENTOR_FLOW_SAMPLES, gl.RGBA, gl.UNSIGNED_BYTE, field);
        gl.uniform1f(elapsed, time);
        gl.uniform1f(motionScale, Math.min(6.5, 1671 / Math.max(displayWidth, 1)));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      },
      dispose,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.warn("Aventor animation unavailable", error);
    dispose();
    return null;
  }
}

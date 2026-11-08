import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0,0.0)), u.x), mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y) * 2.0;
  float t = uTime * 0.04;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float f = fbm(p + 3.0 * q + uScroll * 0.4);

  vec3 col = vec3(0.016, 0.02, 0.032);
  col += vec3(0.02, 0.2, 0.17) * smoothstep(0.35, 0.95, f);
  col += vec3(0.05, 0.07, 0.16) * smoothstep(0.45, 1.0, q.x);

  float d = distance(vec2(uv.x * asp, uv.y), vec2(uMouse.x * asp, uMouse.y));
  float glow = exp(-d * 3.5);
  float ring = sin(d * 38.0 - uTime * 1.6) * 0.5 + 0.5;
  col += vec3(0.3, 1.0, 0.82) * (0.08 * glow * (0.5 + f) + 0.012 * glow * ring);

  col *= 0.55 + 0.45 * smoothstep(1.3, 0.1, distance(uv, vec2(0.5)));
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderBg() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1) * 0.75, alpha: false, antialias: false });
    } catch {
      return; // no WebGL: CSS background stays
    }
    const gl = renderer.gl;
    el.appendChild(gl.canvas);
    gl.canvas.style.cssText = 'width:100%;height:100%;display:block';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uScroll: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);

    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uScroll.value = window.scrollY / Math.max(1, document.body.scrollHeight);
      renderer.render({ scene: mesh });
    };
    if (reduced) renderer.render({ scene: mesh });
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      gl.canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={host} className="fixed inset-0 z-0 bg-ink" aria-hidden="true" />;
}

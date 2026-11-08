import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, BallCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const MINT = '#4DFFD2';

/* shared mutable state */
const S = {
  drag: null as RapierRigidBody | null,
  dragOff: new THREE.Vector3(),
  ptr: new THREE.Vector3(999, 999, 0),
  ptrOn: false,
  hover: null as THREE.Object3D | null,
};

/* ---------- materials ---------- */
const chrome = { color: '#cfd6e4', metalness: 1, roughness: 0.12 } as const;
const darkMetal = { color: '#0e1521', metalness: 0.9, roughness: 0.25 } as const;
const mintMetal = { color: MINT, metalness: 0.85, roughness: 0.18 } as const;

function G({ children }: { children: ReactNode }) {
  return <group>{children}</group>;
}

/* ---------- objects ---------- */
function Shield() {
  const geo = useMemo(() => {
    const sh = (k: number) => {
      const s = new THREE.Shape();
      s.moveTo(0, 1.25 * k);
      s.bezierCurveTo(0.35 * k, 1.05 * k, 0.75 * k, 1.0 * k, 0.95 * k, 1.0 * k);
      s.lineTo(0.95 * k, 0.15 * k);
      s.bezierCurveTo(0.95 * k, -0.55 * k, 0.5 * k, -1.0 * k, 0, -1.3 * k);
      s.bezierCurveTo(-0.5 * k, -1.0 * k, -0.95 * k, -0.55 * k, -0.95 * k, 0.15 * k);
      s.lineTo(-0.95 * k, 1.0 * k);
      s.bezierCurveTo(-0.75 * k, 1.0 * k, -0.35 * k, 1.05 * k, 0, 1.25 * k);
      return s;
    };
    const o = new THREE.ExtrudeGeometry(sh(1), { depth: 0.3, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 4, curveSegments: 24 });
    const i = new THREE.ExtrudeGeometry(sh(0.68), { depth: 0.1, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 24 });
    o.center();
    i.center();
    return { o, i };
  }, []);
  return (
    <G>
      <mesh geometry={geo.o}>
        <meshPhysicalMaterial {...chrome} clearcoat={1} />
      </mesh>
      <mesh geometry={geo.i} position={[0, 0, 0.26]}>
        <meshStandardMaterial {...mintMetal} emissive={MINT} emissiveIntensity={0.5} userData={{ glow: true }} />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[0.18, 0.7, 0.05]} />
        <meshStandardMaterial color="#05060a" />
      </mesh>
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.7, 0.18, 0.05]} />
        <meshStandardMaterial color="#05060a" />
      </mesh>
    </G>
  );
}

function Lock() {
  return (
    <G>
      <RoundedBox args={[1.6, 1.3, 0.7]} radius={0.16} smoothness={4} position={[0, -0.2, 0]}>
        <meshPhysicalMaterial {...mintMetal} clearcoat={1} emissive={MINT} emissiveIntensity={0.25} userData={{ glow: true }} />
      </RoundedBox>
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.5, 0.14, 20, 40, Math.PI]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-0.5, 0.3, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.3, 16]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.3, 16]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[0, -0.15, 0.36]}>
        <circleGeometry args={[0.16, 24]} />
        <meshBasicMaterial color="#05060a" />
      </mesh>
      <mesh position={[0, -0.4, 0.36]}>
        <planeGeometry args={[0.1, 0.34]} />
        <meshBasicMaterial color="#05060a" />
      </mesh>
    </G>
  );
}

function Key() {
  return (
    <G>
      <mesh rotation-x={0}>
        <torusGeometry args={[0.5, 0.17, 24, 48]} />
        <meshPhysicalMaterial {...chrome} clearcoat={1} />
      </mesh>
      <mesh position={[1.3, 0, 0]}>
        <boxGeometry args={[1.9, 0.2, 0.2]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      {[1.75, 2.1, 2.2].map((x, i) => (
        <mesh key={i} position={[x, -0.22 - (i % 2) * 0.06, 0]}>
          <boxGeometry args={[0.16, 0.3 + (i % 2) * 0.1, 0.2]} />
          <meshStandardMaterial {...mintMetal} emissive={MINT} emissiveIntensity={0.3} userData={{ glow: true }} />
        </mesh>
      ))}
    </G>
  );
}

function Laptop() {
  return (
    <G>
      <RoundedBox args={[2.2, 0.12, 1.4]} radius={0.05} position={[0, -0.35, 0.2]}>
        <meshPhysicalMaterial {...darkMetal} clearcoat={0.6} />
        <Edges color={MINT} threshold={15} />
      </RoundedBox>
      <group position={[0, 0.3, -0.5]} rotation-x={-0.18}>
        <RoundedBox args={[2.2, 1.4, 0.08]} radius={0.05}>
          <meshPhysicalMaterial {...darkMetal} />
          <Edges color={MINT} threshold={15} />
        </RoundedBox>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.0, 1.2]} />
          <meshStandardMaterial color="#04100e" emissive={MINT} emissiveIntensity={0.25} userData={{ glow: true }} />
        </mesh>
        {[0.4, 0.2, 0, -0.2, -0.4].map((y, i) => (
          <mesh key={i} position={[-0.5 + (i % 3) * 0.12 + [0.2, 0.5, 0.05, 0.35, 0.2][i] * 0.5, y, 0.07]}>
            <boxGeometry args={[[1.1, 0.7, 1.4, 0.5, 0.9][i], 0.06, 0.01]} />
            <meshBasicMaterial color={i === 2 ? '#ffffff' : MINT} />
          </mesh>
        ))}
      </group>
    </G>
  );
}

function Chip() {
  return (
    <G>
      <RoundedBox args={[1.5, 1.5, 0.22]} radius={0.08}>
        <meshPhysicalMaterial {...darkMetal} clearcoat={1} />
        <Edges color={MINT} threshold={15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.7, 0.7, 0.04]} />
        <meshStandardMaterial {...mintMetal} emissive={MINT} emissiveIntensity={0.6} userData={{ glow: true }} />
      </mesh>
      {Array.from({ length: 16 }).map((_, i) => {
        const side = Math.floor(i / 4), k = (i % 4) - 1.5;
        const pos: [number, number, number] = side === 0 ? [k * 0.34, 0.85, 0] : side === 1 ? [k * 0.34, -0.85, 0] : side === 2 ? [0.85, k * 0.34, 0] : [-0.85, k * 0.34, 0];
        const horiz = side > 1;
        return (
          <mesh key={i} position={pos}>
            <boxGeometry args={horiz ? [0.2, 0.1, 0.08] : [0.1, 0.2, 0.08]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
        );
      })}
    </G>
  );
}

function Crystal() {
  return (
    <G>
      <mesh>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshPhysicalMaterial color="#0b1d1a" metalness={0.6} roughness={0.08} clearcoat={1} emissive={MINT} emissiveIntensity={0.18} userData={{ glow: true }} />
        <Edges color={MINT} threshold={1} />
      </mesh>
      <mesh scale={0.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={MINT} wireframe />
      </mesh>
    </G>
  );
}

function Packet({ i }: { i: number }) {
  return (
    <mesh>
      {i % 2 ? <sphereGeometry args={[0.2, 20, 20]} /> : <boxGeometry args={[0.32, 0.32, 0.32]} />}
      <meshStandardMaterial {...(i % 3 ? mintMetal : chrome)} emissive={i % 3 ? MINT : '#ffffff'} emissiveIntensity={0.35} userData={{ glow: true }} />
    </mesh>
  );
}

/* ---------- physical wrapper: float, hover, drag, throw ---------- */
interface Item {
  key: string;
  home: [number, number]; // fractions of half viewport
  body: ReactNode;
  collider: ReactNode;
  mass?: number;
  r?: number; // base scale
}

function Floater({ item, index, scale, vw, vh, mobile }: { item: Item; index: number; scale: number; vw: number; vh: number; mobile: boolean }) {
  const rb = useRef<RapierRigidBody>(null);
  const grp = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const hovered = useRef(false);

  const home = useMemo(() => new THREE.Vector3(item.home[0] * (mobile ? 0.8 : 1) * (vw / 2), (mobile ? item.home[1] * 0.45 + 0.22 : item.home[1]) * (vh / 2), 0), [item.home, vw, vh, mobile]);

  useEffect(() => {
    const m: THREE.MeshStandardMaterial[] = [];
    grp.current?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
      if (mat && mat.userData?.glow) {
        mat.userData.base = mat.emissiveIntensity;
        m.push(mat);
      }
    });
    mats.current = m;
  }, []);

  useFrame((_, dtRaw) => {
    const b = rb.current;
    if (!b) return;
    const dt = Math.min(dtRaw, 0.05);
    const p = b.translation();
    const dragged = S.drag === b;

    if (dragged) {
      const tx = S.ptr.x - S.dragOff.x, ty = S.ptr.y - S.dragOff.y;
      const vx = THREE.MathUtils.clamp((tx - p.x) * 14, -40, 40);
      const vy = THREE.MathUtils.clamp((ty - p.y) * 14, -40, 40);
      b.setLinvel({ x: vx, y: vy, z: 0 }, true);
      const av = b.angvel();
      b.setAngvel({ x: av.x * 0.9, y: av.y * 0.9 + vx * 0.02, z: av.z * 0.9 - vx * 0.03 }, true);
    } else {
      // soft spring back home (floaty, underdamped)
      const k = (index >= 100 ? 0.6 : 9) * b.mass();
      const hx = index >= 100 ? 0 : home.x, hy = index >= 100 ? 0 : home.y;
      b.applyImpulse({ x: (hx - p.x) * k * dt, y: (hy - p.y) * k * dt, z: 0 }, true);
      // keep faces toward the camera (soft upright spring, spin around z stays free)
      const r = b.rotation();
      const sg = r.w < 0 ? -1 : 1;
      const kr = 7 * b.mass() * dt;
      b.applyTorqueImpulse({ x: -r.x * sg * kr, y: -r.y * sg * kr, z: 0 }, true);
      // cursor repels gently
      if (S.ptrOn) {
        const dx = p.x - S.ptr.x, dy = p.y - S.ptr.y;
        const d = Math.hypot(dx, dy);
        const R = 2.4 * scale;
        if (d < R && d > 0.001) {
          const f = (1 - d / R) * 9 * dt * b.mass();
          b.applyImpulse({ x: (dx / d) * f, y: (dy / d) * f, z: 0 }, true);
          b.applyTorqueImpulse({ x: 0, y: 0, z: -dx * f * 0.4 }, true);
        }
      }
    }
    // hover glow
    mats.current.forEach((m) => {
      const base = (m.userData.base as number) ?? 0.3;
      const goal = dragged ? base + 1.6 : hovered.current ? base + 0.9 : base;
      m.emissiveIntensity += (goal - m.emissiveIntensity) * Math.min(1, dt * 8);
    });
  });

  const start = useMemo(() => [home.x + (Math.random() - 0.5) * 6, vh / 2 + 2 + Math.random() * 2, 0] as [number, number, number], [home, vh]);

  return (
    <RigidBody
      ref={rb}
      position={start}
      rotation={[0.3 * (index % 3), 0.5 * (index % 4), 0.2]}
      colliders={false}
      enabledTranslations={[true, true, false]}
      linearDamping={2.2}
      angularDamping={0.9}
      restitution={0.65}
      friction={0.2}
      mass={item.mass ?? 1}
      scale={scale * (item.r ?? 1)}
      canSleep={false}
    >
      {item.collider}
      <group
        ref={grp}
        onPointerDown={(e) => {
          e.stopPropagation();
          const b = rb.current!;
          S.drag = b;
          const p = b.translation();
          S.dragOff.set(S.ptr.x - p.x, S.ptr.y - p.y, 0);
          (e.target as Element)?.setPointerCapture?.(e.pointerId);
        }}
        onPointerOver={() => (hovered.current = true)}
        onPointerOut={() => (hovered.current = false)}
      >
        {item.body}
      </group>
    </RigidBody>
  );
}

/* ---------- arena (walls follow the viewport) ---------- */
function Arena({ w, h }: { w: number; h: number }) {
  return (
    <RigidBody type="fixed" colliders={false} restitution={0.7}>
      <CuboidCollider args={[0.5, h, 2]} position={[-w / 2 - 0.5, h / 2, 0]} />
      <CuboidCollider args={[0.5, h, 2]} position={[w / 2 + 0.5, h / 2, 0]} />
      <CuboidCollider args={[w, 0.5, 2]} position={[0, -h / 2 - 0.5, 0]} />
    </RigidBody>
  );
}

function Scene() {
  const { viewport, camera, gl, size } = useThree();
  const mobile = size.width < 768;
  const scale = THREE.MathUtils.clamp(viewport.width / 15, 0.55, 1.15);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const v2 = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    const el = gl.domElement;
    const upd = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      v2.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(v2, camera);
      ray.ray.intersectPlane(plane, S.ptr);
      S.ptrOn = e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const up = () => (S.drag = null);
    const leave = () => (S.ptrOn = false);
    window.addEventListener('pointermove', upd);
    el.addEventListener('pointerdown', upd, true);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', upd);
      el.removeEventListener('pointerdown', upd, true);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      el.removeEventListener('pointerleave', leave);
    };
  }, [camera, gl, plane, ray, v2]);

  const items: Item[] = useMemo(
    () => [
      { key: 'shield', home: [0.5, 0.15], body: <Shield />, collider: <CuboidCollider args={[0.95, 1.2, 0.3]} />, mass: 1.4, r: 1.15 },
      { key: 'lock', home: [0.84, -0.3], body: <Lock />, collider: <CuboidCollider args={[0.8, 0.95, 0.35]} position={[0, 0.05, 0]} />, mass: 1.2, r: 1.05 },
      { key: 'laptop', home: [0.5, -0.58], body: <Laptop />, collider: <CuboidCollider args={[1.1, 0.8, 0.5]} position={[0, 0.2, 0]} />, mass: 1.5, r: 1 },
      { key: 'key', home: [0.25, 0.5], body: <Key />, collider: <CuboidCollider args={[1.5, 0.35, 0.18]} position={[1.1, 0, 0]} />, mass: 0.9, r: 0.9 },
      { key: 'chip', home: [0.86, 0.48], body: <Chip />, collider: <CuboidCollider args={[0.9, 0.9, 0.2]} />, mass: 1, r: 0.95 },
      { key: 'crystal', home: [0.12, -0.18], body: <Crystal />, collider: <BallCollider args={[0.95]} />, mass: 1.1, r: 0.9 },
    ],
    []
  );
  const packets = useMemo(() => Array.from({ length: mobile ? 8 : 14 }, (_, i) => i), [mobile]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-6, -3, 5]} intensity={40} color={MINT} />
      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, 6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={3} color={MINT} position={[-6, 0, 4]} scale={[3, 8, 1]} />
        <Lightformer form="rect" intensity={2} color="#7aa2ff" position={[6, -2, 3]} scale={[3, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 0, -4]} scale={8} />
      </Environment>
      <Physics gravity={[0, 0, 0]}>
        <Arena w={viewport.width} h={viewport.height} />
        {items.map((it, i) => (
          <Floater key={it.key} item={it} index={i} scale={scale} vw={viewport.width} vh={viewport.height} mobile={mobile} />
        ))}
        {packets.map((i) => (
          <Floater
            key={'p' + i}
            index={100 + i}
            scale={scale}
            vw={viewport.width}
            vh={viewport.height}
            mobile={mobile}
            item={{ key: 'p' + i, home: [0, 0], body: <Packet i={i} />, collider: <BallCollider args={[0.2]} />, mass: 0.15 }}
          />
        ))}
      </Physics>
    </>
  );
}

export default function Playground() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 35, position: [0, 0, 16], near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true }}
      style={{ touchAction: 'pan-y' }}
    >
      <Scene />
    </Canvas>
  );
}

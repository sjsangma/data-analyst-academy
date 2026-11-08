import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FONT = "fonts/helvetiker_bold.typeface.json";

function Particles({ count = 900, animate }) {
  const ref = useRef(null);
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#38bdf8");
    const violet = new THREE.Color("#a855f7");
    for (let i = 0; i < count; i += 1) {
      const r = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 3;
      const c = blue.clone().lerp(violet, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[points.positions, 3]} />
        <bufferAttribute attach="attributes-color" count={count} args={[points.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ChromeText({ text, y, size }) {
  return (
    <Center position={[0, y, 0]}>
      <Text3D
        font={FONT}
        size={size}
        height={0.34}
        curveSegments={8}
        bevelEnabled
        bevelThickness={0.06}
        bevelSize={0.028}
        bevelOffset={0}
        bevelSegments={3}
      >
        {text}
        <meshPhysicalMaterial
          color="#e2ecff"
          metalness={0.98}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={2.6}
          emissive="#1b2a4a"
          emissiveIntensity={0.35}
        />
      </Text3D>
    </Center>
  );
}

function Rings({ animate }) {
  const outer = useRef(null);
  const inner = useRef(null);
  useFrame((state) => {
    if (!animate) return;
    if (outer.current) outer.current.rotation.z = state.clock.elapsedTime * 0.18;
    if (inner.current) inner.current.rotation.z = -state.clock.elapsedTime * 0.26;
  });
  return (
    <group position={[0, 0, -0.6]}>
      <mesh ref={outer}>
        <torusGeometry args={[3.55, 0.012, 12, 180]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </mesh>
      <mesh ref={inner} rotation={[0.55, 0, 0]}>
        <torusGeometry args={[3.05, 0.008, 12, 180]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[3.9, 4.0, 128]} />
        <meshBasicMaterial color="#6d5efc" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function NameGroup({ animate, interactive }) {
  const group = useRef(null);
  const state = useRef({
    dragging: false,
    paused: false,
    lastX: 0,
    lastY: 0,
    moved: 0,
    velY: 0,
    velX: 0,
    pointer: { x: 0, y: 0 },
  });
  const [paused, setPaused] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    if (!interactive) return undefined;
    const el = gl.domElement;
    el.style.touchAction = "pan-y";

    const down = (e) => {
      state.current.dragging = true;
      state.current.moved = 0;
      state.current.lastX = e.clientX;
      state.current.lastY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };

    const move = (e) => {
      const s = state.current;
      const rect = el.getBoundingClientRect();
      s.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      s.pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.moved += Math.abs(dx) + Math.abs(dy);
      s.velY = dx * 0.006;
      s.velX = dy * 0.0035;
    };

    const up = () => {
      const s = state.current;
      if (s.dragging && s.moved < 8) {
        s.paused = !s.paused;
        setPaused(s.paused);
      }
      s.dragging = false;
    };

    const leave = () => {
      state.current.dragging = false;
      state.current.pointer.x = 0;
      state.current.pointer.y = 0;
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("pointerleave", leave);
    };
  }, [gl, interactive]);

  useFrame((st, delta) => {
    const g = group.current;
    if (!g) return;
    const s = state.current;
    const t = st.clock.elapsedTime;

    if (!animate) return;

    if (!s.paused && !s.dragging) {
      g.rotation.y += delta * 0.32;
    }
    // inertia after a drag
    if (!s.dragging && (Math.abs(s.velY) > 0.0002 || Math.abs(s.velX) > 0.0002)) {
      g.rotation.y += s.velY;
      g.rotation.x += s.velX;
      s.velY *= 0.94;
      s.velX *= 0.94;
    }
    if (s.dragging) {
      g.rotation.y += s.velY;
      g.rotation.x += s.velX;
    }

    // gentle hover tilt (mouse parallax), never fights the drag
    if (!s.dragging) {
      const tilt = THREE.MathUtils.clamp(s.pointer.y * 0.18, -0.3, 0.3);
      g.rotation.x += (tilt - g.rotation.x) * 0.05;
      g.rotation.y += s.pointer.x * 0.0022;
    }

    g.position.y = Math.sin(t * 0.9) * 0.09;
  });

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        <ChromeText text="SHIBU" y={0.72} size={1.15} />
        <ChromeText text="SANGMA" y={-0.72} size={1.15} />
      </Suspense>
      <Rings animate={animate} />
      <PausedBadge paused={paused} />
    </group>
  );
}

function PausedBadge({ paused }) {
  return (
    <mesh position={[0, -1.85, 0]} visible={paused}>
      <planeGeometry args={[1.6, 0.34]} />
      <meshBasicMaterial color="#0b1020" transparent opacity={0.55} />
    </mesh>
  );
}

function Scene({ animate, interactive, onReady }) {
  const ready = useRef(false);
  useFrame(() => {
    if (!ready.current) {
      ready.current = true;
      onReady?.();
    }
  });

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 12, 26]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 6]} intensity={1.6} color="#dbeafe" />
      <pointLight position={[-7, -3, 4]} intensity={26} color="#38bdf8" distance={22} />
      <pointLight position={[7, 4, 3]} intensity={30} color="#a855f7" distance={24} />
      <spotLight position={[0, 9, 6]} angle={0.6} penumbra={1} intensity={40} color="#8b5cf6" />

      <NameGroup animate={animate} interactive={interactive} />
      <Particles animate={animate} count={interactive ? 900 : 380} />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={4.5} color="#eaf2ff" position={[0, 5, -6]} scale={[14, 7, 1]} />
        <Lightformer intensity={3.4} color="#38bdf8" position={[-6, 1, 2]} scale={[7, 7, 1]} />
        <Lightformer intensity={3.6} color="#a855f7" position={[6, -1, 2]} scale={[7, 7, 1]} />
        <Lightformer intensity={2} color="#ffffff" position={[0, -4, 3]} scale={[10, 2, 1]} />
        <Lightformer
          form="ring"
          intensity={2.4}
          color="#8b5cf6"
          position={[3, 4, -4]}
          scale={4}
        />
      </Environment>
    </>
  );
}

export default function Name3D({ onReady }) {
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    try {
      const canvas = document.createElement("canvas");
      const ok = !!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
      setSupported(ok);
    } catch (e) {
      setSupported(false);
    }
  }, []);

  const handleReady = () => {
    if (!ready) {
      setReady(true);
      onReady?.();
    }
  };

  if (!supported) {
    return (
      <div className="grid h-full w-full place-items-center px-6 text-center">
        <div>
          <h1 className="silver-text text-[13vw] font-bold leading-[0.9] md:text-[6.4rem]">SHIBU</h1>
          <h1 className="silver-text text-[13vw] font-bold leading-[0.9] md:text-[6.4rem]">SANGMA</h1>
          <p className="mt-4 text-xs tracking-[0.3em]" style={{ color: "var(--muted)" }}>
            3D SCENE NEEDS WEBGL
          </p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, mobile ? 1.4 : 1.9]}
      camera={{ position: [0, 0, 8.4], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene animate={!reduced} interactive={!mobile} onReady={handleReady} />
      </Suspense>
    </Canvas>
  );
}

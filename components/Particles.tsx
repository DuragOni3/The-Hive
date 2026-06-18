"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** A drifting cloud of glowing yellow particles (pollen / honey dust). */
export default function Particles({ count = 600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(255, 213, 79, 1)");
    grad.addColorStop(0.4, "rgba(255, 193, 7, 0.6)");
    grad.addColorStop(1, "rgba(255, 193, 7, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    // slow swirl
    points.current.rotation.y += delta * 0.03;
    // parallax toward mouse
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      -pointer.y * 0.15,
      0.04
    );
    points.current.position.x = THREE.MathUtils.lerp(
      points.current.position.x,
      pointer.x * 0.6,
      0.04
    );

    // gentle vertical drift on each particle
    const arr = points.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.0015;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={"#FFD54F"}
        sizeAttenuation
      />
    </points>
  );
}

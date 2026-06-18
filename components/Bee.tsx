"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A procedural low-poly bee built entirely from Three.js primitives
 * (no external model needed). Black & yellow, with flapping wings.
 * The whole bee tilts to follow the mouse pointer.
 */
export default function Bee() {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Target rotation follows pointer; clamp so the bee stays readable
    const targetY = pointer.x * 0.6;
    const targetX = -pointer.y * 0.4;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.06
    );

    // Gentle hover bob
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.4) * 0.15;

    // Wing flap
    const flap = Math.sin(t * 26) * 0.5 + 0.5; // 0..1
    if (leftWing.current) leftWing.current.rotation.z = 0.5 + flap * 0.7;
    if (rightWing.current) rightWing.current.rotation.z = -0.5 - flap * 0.7;
  });

  const yellow = new THREE.Color("#FFC107");
  const black = new THREE.Color("#0B0B0B");

  return (
    <group ref={group} scale={1.15} rotation={[0, 0, 0]}>
      {/* Abdomen — striped body */}
      <group position={[-0.1, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial
            color={yellow}
            roughness={0.45}
            metalness={0.05}
          />
        </mesh>
        {/* Stretch the abdomen into an egg shape */}
        {/* Black stripes (flattened rings) */}
        {[0.32, 0.0, -0.32].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} scale={[0.16, 1.02, 1.02]}>
            <sphereGeometry args={[1, 40, 40]} />
            <meshStandardMaterial color={black} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Thorax (fuzzy middle) */}
      <mesh position={[0.95, 0.05, 0]}>
        <sphereGeometry args={[0.62, 40, 40]} />
        <meshStandardMaterial color={"#3a2f00"} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[1.55, 0.1, 0]}>
        <sphereGeometry args={[0.45, 40, 40]} />
        <meshStandardMaterial color={black} roughness={0.4} />
      </mesh>

      {/* Eyes */}
      {[-0.28, 0.28].map((z, i) => (
        <mesh key={i} position={[1.78, 0.2, z]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color={"#fffceb"}
            roughness={0.2}
            emissive={"#FFD54F"}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Antennae */}
      {[-0.18, 0.18].map((z, i) => (
        <group key={i} position={[1.85, 0.45, z]} rotation={[0, 0, -0.5]}>
          <mesh position={[0.0, 0.18, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial color={black} />
          </mesh>
          <mesh position={[0.06, 0.45, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={yellow} emissive={"#FFB300"} emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Stinger */}
      <mesh position={[-1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.14, 0.5, 20]} />
        <meshStandardMaterial color={black} roughness={0.3} />
      </mesh>

      {/* Wings — translucent, anchored on top of the thorax */}
      <mesh
        ref={leftWing}
        position={[0.85, 0.55, 0.25]}
        rotation={[0.3, 0.2, 0.8]}
        scale={[1.1, 0.55, 0.08]}
      >
        <sphereGeometry args={[0.7, 24, 24]} />
        {/* flatten into a wing */}
        <meshPhysicalMaterial
          color={"#FFF3C4"}
          transmission={0.7}
          transparent
          opacity={0.55}
          roughness={0.1}
          thickness={0.2}
          ior={1.2}
        />
      </mesh>
      <mesh
        ref={rightWing}
        position={[0.85, 0.55, -0.25]}
        rotation={[-0.3, -0.2, -0.8]}
        scale={[1.1, 0.55, 0.08]}
      >
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshPhysicalMaterial
          color={"#FFF3C4"}
          transmission={0.7}
          transparent
          opacity={0.55}
          roughness={0.1}
          thickness={0.2}
          ior={1.2}
        />
      </mesh>
    </group>
  );
}

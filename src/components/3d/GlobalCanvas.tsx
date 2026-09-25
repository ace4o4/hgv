'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, Stars } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SignatureStructure() {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;
    
    // Animate structure based on scroll
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        if (group.current) {
          // As we scroll down, the structure rotates and moves slightly
          group.current.rotation.y = self.progress * Math.PI * 2;
          group.current.position.z = self.progress * 5; // moves towards camera
          group.current.position.y = self.progress * 2;
        }
      }
    });
  }, []);

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Architecture */}
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[4, 6, 4]} />
          <meshStandardMaterial 
            color="#1A1B1D" 
            roughness={0.2} 
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Inner Glass Structure */}
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[4.2, 6.2, 4.2]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            thickness={1}
          />
        </mesh>

        {/* Orbiting Elements - representing community nodes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 4, 
              Math.sin((i / 4) * Math.PI) * 2, 
              Math.sin((i / 8) * Math.PI * 2) * 4 - 2
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#2F80FF" emissive="#2F80FF" emissiveIntensity={2} />
          </mesh>
        ))}
        
        {/* Floating Pathways */}
        <mesh position={[0, -2, -1]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial color="#2F80FF" emissive="#2F80FF" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function SceneCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (!cameraRef.current) return;
    
    // Camera travels through the scene based on scroll
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        if (cameraRef.current) {
          // Camera moves forward into the scene as user scrolls
          cameraRef.current.position.z = 10 - (self.progress * 15);
          cameraRef.current.position.y = -(self.progress * 5);
        }
      }
    });

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(cameraRef.current!.position, {
        x: x * 0.5,
        duration: 1,
        ease: 'power2.out'
      });
      // Don't modify Y here to preserve scroll Y
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={45} />;
}

export default function GlobalCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: 'var(--background-black)', pointerEvents: 'none' }}>
      <Canvas dpr={[1, 2]}>
        <SceneCamera />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#2F80FF" />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <SignatureStructure />
        
        {/* Subtle Depth Fog */}
        <fog attach="fog" args={['#050607', 5, 20]} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

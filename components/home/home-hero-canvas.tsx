"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HomeHeroCanvasProps = {
  className?: string;
};

function getParticleCount(width: number) {
  if (width < 640) return 120;
  if (width < 1024) return 150;
  return 180;
}

function spreadForViewport(width: number, height: number) {
  const aspect = width / height;
  return {
    x: aspect * 1.96,
    y: 1.96,
    aspect,
  };
}

export function HomeHeroCanvas({ className }: HomeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let particleCount = getParticleCount(window.innerWidth);
    let spread = spreadForViewport(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const origins = new Float32Array(particleCount * 2);
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2);
    const colors = new Float32Array(particleCount * 3);

    const seedParticles = () => {
      spread = spreadForViewport(window.innerWidth, window.innerHeight);

      for (let i = 0; i < particleCount; i += 1) {
        const i2 = i * 2;
        const i3 = i * 3;
        const x = (Math.random() - 0.5) * spread.x;
        const y = (Math.random() - 0.5) * spread.y;

        origins[i2] = x;
        origins[i2 + 1] = y;
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = 0;

        const tint = 0.82 + Math.random() * 0.18;
        colors[i3] = 0.45 * tint;
        colors[i3 + 1] = 0.72 * tint;
        colors[i3 + 2] = 0.98 * tint;
      }
    };

    seedParticles();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 5.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: false,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let frameId = 0;

    const setPointerFromEvent = (clientX: number, clientY: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === 0 || height === 0) return;

      const nx = (clientX / width) * 2 - 1;
      const ny = -((clientY / height) * 2 - 1);
      pointer.targetX = nx * spread.aspect * 0.98;
      pointer.targetY = ny * 0.98;
    };

    const onMouseMove = (event: MouseEvent) => {
      setPointerFromEvent(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      setPointerFromEvent(touch.clientX, touch.clientY);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === 0 || height === 0) return;

      const nextSpread = spreadForViewport(width, height);
      if (Math.abs(nextSpread.aspect - spread.aspect) > 0.2) {
        seedParticles();
      }
      spread = nextSpread;

      camera.left = -spread.aspect;
      camera.right = spread.aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    resize();
    requestAnimationFrame(resize);

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);

      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;
      const time = performance.now() * 0.0003;

      for (let i = 0; i < particleCount; i += 1) {
        const i2 = i * 2;
        const i3 = i * 3;

        const originX = origins[i2];
        const originY = origins[i2 + 1];
        const floatX = Math.sin(time + i * 0.35) * 0.015;
        const floatY = Math.cos(time + i * 0.28) * 0.015;

        const dx = pointer.x - posArray[i3];
        const dy = pointer.y - posArray[i3 + 1];
        const dist = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - dist / 0.55);

        velocities[i2] += dx * influence * 0.004 + floatX * 0.0015;
        velocities[i2 + 1] += dy * influence * 0.004 + floatY * 0.0015;
        velocities[i2] += (originX - posArray[i3]) * 0.002;
        velocities[i2 + 1] += (originY - posArray[i3 + 1]) * 0.002;
        velocities[i2] *= 0.9;
        velocities[i2 + 1] *= 0.9;

        posArray[i3] += velocities[i2];
        posArray[i3 + 1] += velocities[i2 + 1];
      }

      positionAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}

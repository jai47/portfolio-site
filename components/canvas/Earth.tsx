"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { ASSETS } from "@/constants/assets";
import CanvasLoader from "./Loader";

function Planet() {
  const { scene } = useGLTF(ASSETS.models.planet);
  return (
    <primitive object={scene} scale={2.95} position-y={0} rotation-y={0} />
  );
}

useGLTF.preload(ASSETS.models.planet);

export default function EarthCanvas() {
  return (
    <div className="w-full h-full min-h-[320px]">
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 3, 5]} intensity={1.4} />
          <directionalLight position={[-4, -2, -2]} intensity={0.35} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.8}
            enableZoom={false}
            enablePan={false}
            enableRotate
            rotateSpeed={0.6}
            makeDefault
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Planet />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

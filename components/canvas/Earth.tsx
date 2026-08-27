"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { ASSETS } from "@/constants/assets";
import CanvasLoader from "./Loader";

function Planet() {
  const { scene } = useGLTF(ASSETS.models.planet);
  return <primitive object={scene} scale={2.6} position-y={0} rotation-y={0} />;
}

useGLTF.preload(ASSETS.models.planet);

export default function EarthCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            enableZoom={false}
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

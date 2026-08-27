"use client";

import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="canvas-loader" />
      <p className="text-white text-sm mt-4 text-center">
        {progress.toFixed(0)}%
      </p>
    </Html>
  );
}

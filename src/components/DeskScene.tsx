"use client";

import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { BakeShadows, Preload, Stats } from "@react-three/drei";
// import { Desk } from './Desk'
// import { Model as DeskInstanced, Instances } from './DeskInstanced'
import { Model as DeskInstanced, Instances } from "./DeskModel";
import { easing } from "maath";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SpinningBox } from "./SpinningBox";

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 24, (1 + state.pointer.y) / 2, 5.5], 1, delta);
    state.camera.lookAt(0, 0, 0);
  });
}

export default function DeskScene({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return (
    <Suspense fallback={null}>
      <Canvas {...props} camera={{ near: 1, far: 25, fov: 50 }}>
        <color attach="background" args={["black"]} />
        {/* <directionalLight intensity={0.25} /> */}
        {/* <ambientLight intensity={0.15} /> */}
        <spotLight position={[0, 10, 10]} angle={0.42} penumbra={1} intensity={0.3} castShadow shadow-mapSize={512} />

        <Instances>
          <DeskInstanced position={[0, -10.75, -4.5]} rotation={[0, 3, 0]} />
        </Instances>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>

        {/* <SpinningBox position={[0, 0, 0]} /> */}
        {/* {children} */}
        {/* <Preload all /> */}
        {/* Camera movements */}
        {/* @ts-ignore */}
        {/* <CameraRig /> */}
        {/* Small helper that freezes the shadows for better performance */}
        {/* <BakeShadows /> */}
        {/* <Perf /> */}
        {/* Debug */}
        <Stats />
      </Canvas>
    </Suspense>
  );
}

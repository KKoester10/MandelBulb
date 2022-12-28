
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { BufferAttribute } from "three";



function App() {
  const DIM = 32;
  function Cube() {
    const meshRef = useRef();
    const shape1 = 
    useFrame(() => {
      if (!meshRef.current) {
        return;
      }
    });
    return (
      <points ref={meshRef}>
          <octahedronGeometry args={[2, 25]}/>
          <pointsMaterial
            size={.05}
            threshold={0.5}
            color={15054}
            sizeAttenuation={true}
          />
      </points>
    )
  }
  function BufferPoints({ count = 80000 }) {
    const points = useMemo (() => {
      const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 120);
      return new BufferAttribute(new Float32Array(p), 3);
    }, [count]);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
          size={.07}
          threshold={0.1}
          color={0xC30F0F}
          sizeAttenuation={true}
        />
      </points>
    )
  }
  return (
      <Canvas >
        <pointLight position={[8,12,15]}/>
        <OrbitControls />
        <BufferPoints/>
        <Cube/>
      </Canvas>
  );
}

export default App;

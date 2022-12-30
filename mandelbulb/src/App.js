
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Box3Helper, BufferAttribute } from "three";
import { mapLinear } from 'three/src/math/MathUtils';



function App() {
  const DIM = 32;
  const p = new Array();
  let x = 0;
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
          <boxGeometry args={[2, 2, 2]}/>
          <pointsMaterial
            size={.15}
            threshold={0.5}
            color={15054}
            sizeAttenuation={true}
          />
      </points>
    )
  }
  const point = ()=>{
    for (let i = -32; i < DIM; i++) {
      for (let j = -32; j < DIM; j++) {
        for (let k = -32; k < DIM; k++) {
          x = p.push(i,j,k)
        }
      }
    }
  }
  function BufferPoints() {
    const points = useMemo (() => {
      point();
      return new BufferAttribute(
        new Float32Array(p),3)
    }, []);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
          size={.1}
          threshold={0.5}
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
        <axesHelper />
      </Canvas>
  );
}

export default App;

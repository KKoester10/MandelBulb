
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Box3Helper, BufferAttribute, DirectionalLight, Vector3 } from "three";
import { mapLinear } from 'three/src/math/MathUtils';



function App() {
  const DIM = 32;
  const mandelBulb = new Array();
  
  
  const point = ()=>{
    for (let x = -DIM; x < DIM; x++) {
      for (let y = -DIM; y < DIM; y++) {
        for (let z = -DIM; z < DIM; z++) {
          let vector = new Vector3(x,y,z);
          
          mandelBulb.push(vector.x,vector.y,vector.z);
          
        }
      }
    }
  }
  function BufferPoints() {
    const points = useMemo (() => {
      point();
      return new BufferAttribute(
        new Float32Array(mandelBulb),3)
    }, []);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
          size={.05}
          threshold={0.5}
          color={0xffff}
          sizeAttenuation={true}
        />
      </points>
    )
  }
  return (
      <Canvas style={{background: 'black'}} camera={{fov: 1000000000, far:10000000000000}}>
        <pointLight position={[8,12,15]}/>
        <OrbitControls />
        <BufferPoints/>
        <axesHelper />
      </Canvas>
  );
}

export default App;

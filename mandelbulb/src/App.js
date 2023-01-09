
import './App.css';
import { Canvas} from '@react-three/fiber';
import { useMemo } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Float32BufferAttribute, Vector3 } from "three";




function App() {
  const DIM = 32;
  const  mandelBulb = new Array();
  const n = 8;
  
  let maxIterations = 20;
  let iteration = 0;

  function map(value, start1, stop1, start2, stop2) {
    return parseFloat((value - start1)*(stop2 - start2) / (stop1 - start1) + start2);
  } 
  
  const point = ()=>{
    for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM; j++) {
        for (let k = 0; k < DIM; k++) {

          let x = map(i, 0, DIM, -1, 1);
          let y = map(j, 0, DIM, -1, 1);
          let z = map(k, 0, DIM, -1, 1);
          
          let zeta = new Vector3(0,0,0);
          while (true) {
            let r = Math.sqrt(Math.pow(zeta.x,2) + Math.pow(zeta.y,2) + Math.pow(zeta.z,2));
            let theta = Math.atan2( Math.sqrt(Math.pow(zeta.x,2) + Math.pow(zeta.y,2)), zeta.z);
            let phi = Math.atan2( zeta.y, zeta.x);

            let cZ = new Vector3(r,theta,phi);

            let newx = Math.pow(cZ.x, n) * Math.sin(cZ.y*n) * Math.cos(cZ.z*n);
            let newy = Math.pow(cZ.x, n) * Math.sin(cZ.y*n) * Math.sin(cZ.z*n);
            let newz = Math.pow(cZ.x, n) * Math.cos(cZ.y*n);

            zeta.x = newx + x;
            zeta.y = newy + y;
            zeta.z = newz + z;
            
            iteration++
            
            if (cZ.x > 16) {
              console.log("you're in the if cZ if > 16");
              break;
            }
            
            if (iteration > maxIterations) {
              mandelBulb.push(zeta.x,zeta.y,zeta.z);
              break;
            } 
          }          
        }
      }
    }
  }
  function BufferPoints() {
    const points = useMemo (() => {
      console.log(mandelBulb);
      point();
      return new Float32BufferAttribute(
       mandelBulb,3)
    }, []);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
          size={.001}
          threshold={0.5}
          color={0xffff}
          sizeAttenuation={true}
        />
      </points>
    )
  }
  return (
      <Canvas style={{background: 'black'}} camera={{fov: 1000000000, far:10000000000000000}}>
        <pointLight position={[8,12,15]}/>
        <OrbitControls />
        <BufferPoints/>
        <axesHelper />
      </Canvas>
  );
}

export default App;

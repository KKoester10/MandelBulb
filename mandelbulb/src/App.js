
import './App.css';
import { Canvas} from '@react-three/fiber';
import { useMemo } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Float32BufferAttribute, Vector3 } from "three";




function App() {
  const DIM = 254;
  const  mandelBulb = new Array();

  function map(value, start1, stop1, start2, stop2) {
    return parseFloat((value - start1)*(stop2 - start2) / (stop1 - start1) + start2);
  } 
  function sphericalR (x , y , z) {
    let r =parseFloat( Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)));
    return r
  }
  function sphericalTheta (x , y , z) {
    let theta = parseFloat(  Math.atan2(Math.sqrt(Math.pow(x,2) + Math.pow(y,2)), z));
    return theta
  }
  function sphericalPhi (x , y) {
    let phi = parseFloat(  Math.atan2(y, x));
    return phi
  }
  
  const point = ()=>{
    for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM; j++) {
        let edge = false;
        for (let k = 0; k < DIM; k++) {

          let x = map(i, 0, DIM, -1, 1);
          let y = map(j, 0, DIM, -1, 1);
          let z = map(k, 0, DIM, -1, 1);

          const n = 16;
          let maxIterations = 30;
          let iteration = 0;
          
          let zeta = new Vector3(0,0,0);

          while (true) {
            let r = sphericalR(zeta.x,zeta.y,zeta.z);
            let theta = sphericalTheta(zeta.x,zeta.y,zeta.z)
            let phi = sphericalPhi(zeta.x,zeta.y)
            
            let newx = Math.pow(r, n) * Math.sin(theta * n) * Math.cos(phi * n);
            let newy = Math.pow(r, n) * Math.sin(theta * n) * Math.sin(phi * n);
            let newz = Math.pow(r, n) * Math.cos(theta * n);

            zeta.x = newx + x;
            zeta.y = newy + y;
            zeta.z = newz + z;
            
            iteration++
            
            if (r > 2) {
              if (edge) {
                edge = false;
              }
              break;
            }
            if (iteration > maxIterations) {
              if (!edge) {
                edge = true;
                mandelBulb.push(x*100, y*100, z*100);
              }
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
      return new Float32BufferAttribute(mandelBulb,3)
    }, []);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...points} />
        </bufferGeometry>
        <pointsMaterial
          size={.001}
          threshold={0.5}
          color={0xf7a902}
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

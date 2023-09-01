import React, { Suspense, useMemo, useRef } from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import model from '../../assets/farm.glb';

export const FarmBotModel = ({ handleModelRegime = () => {} }) => {
  const { nodes, materials } = useGLTF(model);
  const cameraRef = useRef();

  const boundingBox = useMemo(() => {
    if (nodes && nodes.Cube && nodes.Cube.geometry) {
      nodes.Cube.geometry.computeBoundingBox();
      return nodes.Cube.geometry.boundingBox;
    }
    return null;
  }, [nodes]);

  const center = boundingBox
    ? [
        (boundingBox.min.x + boundingBox.max.x) / 2,
        (boundingBox.min.y + 2 + boundingBox.max.y) / 2,
        (boundingBox.min.z + boundingBox.max.z) / 2,
      ]
    : [0, 0, 0];

  const ambientLightPosition = center;
  const spotLightPosition = [center[0] + 5, center[1] + 20, center[2] + 20];

  return (
    <Canvas camera={{ fov: 5, position: [600, 120, 0] }}>
      <ambientLight intensity={1} position={ambientLightPosition} />
      <spotLight intensity={1} position={spotLightPosition} />
      <OrbitControls
        enableDamping
        minDistance={1}
        maxDistance={150}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={center}
        autoRotate
        enableRotate
        enableZoom
        enablePan
        camera={cameraRef.current}
      />
      <Suspense fallback={null}>
        <group dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials['Wood.002']}
            position={[0, 1.613, 0]}
            scale={[6.2, 1, 2.2]}
          />
          <group position={[0, 4.703, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane_1.geometry}
              material={materials['Frozen white metal']}
              materialColor="red"
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane_2.geometry}
              material={materials.DarkMetal}
            />
          </group>
          <group
            position={[0, 2.813, 2.161]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-6.2, -0.125, -0.05]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube002_1.geometry}
              material={materials['Frozen white metal']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube002_2.geometry}
              material={materials['Frozen white metal']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={materials.Plastic}
            position={[-6.462, 2.411, 0.006]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.27, -0.2, -0.576]}
          />
          <group
            position={[0.04, 4.703, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane003_1.geometry}
              material={materials['Frozen white metal']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane003_2.geometry}
              material={materials.DarkMetal}
            />
          </group>
          <group
            position={[0.026, 4.703, 2.399]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane004.geometry}
              material={materials['Frozen white metal']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane004_1.geometry}
              material={materials.DarkMetal}
            />
          </group>
          <group position={[0, 4.703, -4.446]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane006.geometry}
              material={materials['Frozen white metal']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane006_1.geometry}
              material={materials.DarkMetal}
            />
          </group>
          <group
            position={[0, 2.813, -2.142]}
            rotation={[0, 0, -Math.PI]}
            scale={[-6.2, -0.125, -0.05]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials['Frozen white metal']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube008_1.geometry}
              material={materials['Frozen white metal']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials['Frozen white metal']}
            position={[-6.202, 2.622, 0.448]}
            scale={[0.095, 0.027, 0.051]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials['Frozen white metal']}
            position={[-6.142, 2.643, 0.479]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={materials['Frozen white metal']}
            position={[-6.142, 2.643, 0.42]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={materials.DarkMetal}
            position={[-6.142, 2.643, 0.42]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials['Frozen white metal']}
            position={[-6.259, 2.643, 0.479]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere004.geometry}
            material={materials['Frozen white metal']}
            position={[-6.259, 2.643, 0.42]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003.geometry}
            material={materials['Frozen white metal']}
            position={[-6.202, 2.622, -0.435]}
            scale={[0.095, 0.027, 0.051]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere005.geometry}
            material={materials['Frozen white metal']}
            position={[-6.142, 2.643, -0.405]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere006.geometry}
            material={materials['Frozen white metal']}
            position={[-6.142, 2.643, -0.463]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere007.geometry}
            material={materials['Frozen white metal']}
            position={[-6.259, 2.643, -0.405]}
            scale={0.018}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere008.geometry}
            material={materials['Frozen white metal']}
            position={[-6.259, 2.643, -0.463]}
            scale={0.018}
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => {
            const setIndex = Math.floor(item / 2);
            let xElementPosition;

            if (setIndex === 0) {
              xElementPosition = 5;
            } else if (setIndex === 1) {
              xElementPosition = 5 - 2;
            } else {
              xElementPosition = 5 - (setIndex - 1) * 2;
            }
            const yELementPosition = 1.7;
            let zElementPosition = -1;
            if (item === 0) {
              zElementPosition = 1;
            }
            if (item % 2 === 0) {
              zElementPosition = 1;
            }

            return (
              <mesh
                onClick={handleModelRegime}
                key={item}
                material-color="#906e54"
                position={[
                  xElementPosition,
                  yELementPosition,
                  zElementPosition,
                ]}
              >
                <boxGeometry args={[2, 2, 2]} />
              </mesh>
            );
          })}
        </group>
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload(model);

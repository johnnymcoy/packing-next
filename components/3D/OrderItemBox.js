import React, { useRef, useState, useEffect} from 'react';
import {  useFrame  } from '@react-three/fiber';
// import * as THREE from 'three'

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function Box(){
    const groupRef = useRef();

    useFrame(() => {
        if (groupRef.current) {
          groupRef.current.rotation.y += 0.01;
        //   groupRef.current.rotation.x += 0.01;

        }
      });
    
      return (
    <group ref={groupRef} position={[0.5, 1, 0.5]}>
          <mesh position={[-0.5, -0.5, -0.5]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="royalblue" wireframe />
          </mesh>
    </group>
      );
}


const OrderItemBox = React.forwardRef(({rotation, position, size, color, bWireframe, bAxisHelper, ...props}, ref) =>  {
    // This reference will give us direct access to the mesh
    const meshRef = useRef();
    const groupRef = useRef();

    // const boundingBox = useRef(new THREE.Box3());
    // console.log("position:" , Math.abs(position[0]), Math.abs(position[0]) + 1.0)
    // console.log("position:" ,position, "Rotation:", rotation)

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false)

    const [showOutline, setShowOutline] = useState(false);

    useFrame(() => {
    if(meshRef.current)
    {
        // // meshRef.current.rotation.y += 0.01;
        if(!showOutline) 
        {
            setShowOutline(true);
            // boundingBox.current.setFromObject(meshRef.current);
        }
    }
    if(groupRef.current)
    {
        // groupRef.current.rotation.y += 0.01;
    }
    });

    function onBoxClick(event){
        // console.log("Position", position, size)
        // setHover(prevState => !prevState)
    }
    const adjustedPosition = [
        Math.abs(position[0]) + (size[0] / 2),
        Math.abs(position[0]) + (size[1] / 2),
        Math.abs(position[0]) + (size[2] / 2)
    ];
    return (
    <group 
        rotation={[0,0,0]}
    // position={[ 
    //     (position[0] - size[0] /2), 
    //     (position[1] - size[1] /2),
    //     (position[2] - size[2] /2)
    // ]} 
    ref={groupRef}>

        {/* <Box /> */}
        <mesh
            {...props}
            // rotation={[0,0,0]}
            // TODO the rotation is the incorrect axis
            rotation={[rotation[1], rotation[0], rotation[2]]}

            position={position}
            // position={[ position[0], position[0], position[0]]}
            // position={[ adjustedPosition[0], adjustedPosition[1], adjustedPosition[2]]}

            // position={[position[0] + size[0],position[0] + size[1] ,position[0] + size[2]]}

            ref={meshRef}
            onClick={onBoxClick}
            // onPointerOver={onMeshHovered}
            // onPointerOut={onMeshUnHovered}
            >
                
            <boxGeometry receiveShadow castShadow args={size ? size : [1, 1, 1]} />
            {bAxisHelper && <axesHelper args={[2,2,2]} /> }
            <meshStandardMaterial color={color ? new THREE.Color( getRandomColor() ) : "red"} wireframe={bWireframe}  />
            {showOutline  && (
            <lineSegments pointerEvents="none">
                <edgesGeometry attach="geometry" args={[meshRef.current.geometry]} pointerEvents="none" />
                <lineBasicMaterial attach="material" color="white" linewidth={1} pointerEvents="none" />
            </lineSegments> 
            )}
        </mesh>

    </group>
    )
})


export default OrderItemBox;
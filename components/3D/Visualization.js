import React, { useRef, useState, useMemo, useEffect, useContext, useReducer, Suspense  } from 'react';
import * as THREE from "three";
import { EffectComposer, Outline, Selection, Select } from '@react-three/postprocessing';
import { Canvas, useFrame  } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { BlendFunction, Resizer, KernelSize} from 'postprocessing'
import OrderItemBox from './OrderItemBox';
import VisualControls from './VisualControls';

function PackageContainer(props)
{
    return(
<mesh {...props}>
    <boxGeometry args={props.size ? props.size : [1, 1, 1]} />
    <meshStandardMaterial wireframe wireframeLinewidth={100000} color={"black"}/>
</mesh>
);}


function CustomBox({ rotation,...props}){
    const meshRef = useRef();
    const groupRef = useRef();

    const size = props.size;
    const [showOutline, setShowOutline] = useState(false);

    useFrame(() => {
    if(props.outline && meshRef.current)
    {
        if(groupRef.current)
        {
            // groupRef.current.rotation.y += 0.001;
        }
        // meshRef.current.rotation.y += 0.01;
        // if(!showOutline) 
        // {
            setShowOutline(true);
            // boundingBox.current.setFromObject(meshRef.current);
        // }
    }});
    let positionWidthMove = 0;
    let positionHeightMove = 0;
    let positionDepthMove = 0;
    // Rotation Moves
    if(rotation[1] < 0)
    {
        // console.log(props.rotation[1])
        positionWidthMove = size[0]/2
    }
    if(rotation[1] > 0)
    {
        console.log("Rotation Larger around 1")
        // positionWidthMove = size[0]/2
    }
    
    // let positionDepthMove = 0;
    if(rotation[2] > 0)
    {
        console.log("Rotation Larger around 2")
        // console.log(props.rotation[2])
        positionWidthMove = size[1]
    }
    if(rotation[2] < 0)
    {
        console.log("Rotation Smaller around 2")
        // positionWidthMove = size[0]/2

    }
    if(rotation[0] > 0)
    {
        console.log("Rotation Around 0")
        positionHeightMove = size[2]
        // positionWidthMove = size[1]
    }
    if(rotation[0] < 0)
    {
        console.log("Rotation Smaller Around 0")
        positionDepthMove = size[1]
        // positionHeightMove = size[0] /2
        // console.log(props.rotation[0])
        // positionWidthMove = size[0]
        // positionWidthMove = size[1]
    }


    return(    
<group>
    <group 
        position={[props.position[0]+ positionWidthMove, props.position[1] + positionHeightMove, props.position[2] + positionDepthMove]} 
        rotation={rotation}
        ref={groupRef}
    >
        <mesh 
            ref={meshRef}
            position={[size[0]/2, size[1]/2, size[2]/2]} 
            // rotation={props.rotation}
            // position={[0, 0, 0]} 
        >
            <boxGeometry args={size} />
            <meshBasicMaterial 
                color={props.color ? props.color: "royalblue"} 
                // wireframe
                wireframe={props.bWireframe} 
            />
        {showOutline  && 
        <lineSegments pointerEvents="none">
                <edgesGeometry attach="geometry" args={[meshRef.current.geometry]} pointerEvents="none" />
                <lineBasicMaterial attach="material" color="white" linewidth={1} pointerEvents="none" />
        </lineSegments>}
        </mesh>
        {/* <axesHelper scale={2}  /> */}

    </group>
</group>

)
}

function Visualization(props){
    const { packingResults } = props;
    console.log(packingResults)
    //- New times  //
    const [Items, setItems] = useState([]);
    const [PackingBoxes, setPackingBoxes] = useState([]);
    useEffect(() => {
        let newItems = [];
        let newPackingBoxes = [];
        if(packingResults && packingResults.length !== 0)
        {
            if(!packingResults.bin.bIsEmpty)
            {
                for(let j = 0; j < packingResults.items.length; j++)
                {
                    const itemData = packingResults.items[j];
                    newItems.push(itemData);
                }
                newPackingBoxes.push(packingResults.bin);
            }
        }

        // if(packingResults.length !== 0)
        // {
        //     for(let i = 0; i < packingResults.length; i++)
        //     {
        //         if(!packingResults[i].bin.bIsEmpty)
        //         {
        //             for(let j = 0; j < packingResults[i].items.length; j++)
        //             {
        //                 const itemData = packingResults[i].items[j];
        //                 newItems.push(itemData);
        //             }
        //             newPackingBoxes.push(packingResults[i].bin);
        //         }
        //     }
        // }
        setItems(newItems);
        setPackingBoxes(newPackingBoxes);
    }, [packingResults]);

    if(Items.length === 0 || Items[0].position === undefined)
    {
        return(<div>
            Results need to be calculated
        </div>)
    }

    return(
<div className='canvas'>
    <Canvas 
        camera={{ position: [10, 5, 10], fov: 60 } }
        >
        {Array.isArray(Items) && Items.map((item, index) => {
            let width = Math.abs(Number(item.width));
            let normalizedValue = Math.max(0.1, Math.min(width, 2)) / 4; // Normalize to range 0 to 1
            let colorValue = Math.round(normalizedValue * 255); // Scale to range 0 to 255
            let color = new THREE.Color(`rgb(${colorValue * 2}, ${colorValue}, ${colorValue / 2})`);
            return(
                <CustomBox key={index} 
                size={[Number(item.width),Number(item.depth),Number(item.height)]} 
                position={[Number(item.position[0]), Number(item.position[2]), Number(item.position[1])]} 
                name={item.name}
                outline
                // bWireframe
                color={color}
                // position={[item.position]} 
                // rotation={[0,0,0]} 
                rotation={[item.rotation[1], item.rotation[2], item.rotation[0]]} 
                
                />
            )})}
        {Array.isArray(PackingBoxes) && PackingBoxes.map((item, index) => (
            <CustomBox key={index} rotation={[0,0,0]}
            size={[item.width, item.depth, item.height ]} 
            position={[0,0,0]}  
            color="red"
            bWireframe
            />
            ))}

        <Lights />
        <EffectsVisuals />
    </Canvas>
</div>
)};



function Lights(){
    return(
<group>
        <gridHelper 
        scale={2} 
        />
    <ambientLight intensity={0.6} />
    <directionalLight
        castShadow
        position={[5, 10, 10]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />
    <OrbitControls 
        enableDamping 
        dampingFactor={0.25} 
        screenSpacePanning={false} 
        enablePan={false}
        minDistance={10} 
        maxDistance={50000} 
        rotateSpeed={0.5}
    />   
</group>
    );
}

function EffectsVisuals(){
    return(
<EffectComposer>
    <Outline
        //  selection={box1Ref ? [box1Ref] : null}//[box1Ref, box2Ref]} // selection of objects that will be outlined
        selectionLayer={10} // selection layer
        blendFunction={BlendFunction.SCREEN} // set this to BlendFunction.ALPHA for dark outlines
        patternTexture={null} // a pattern texture
        edgeStrength={2.5} // the edge strength
        pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
        visibleEdgeColor={0xffffff} // the color of visible edges
        hiddenEdgeColor={0x22090a} // the color of hidden edges
        width={Resizer.AUTO_SIZE} // render width
        height={Resizer.AUTO_SIZE} // render height
        kernelSize={KernelSize.LARGE} // blur kernel size
        blur={false} // whether the outline should be blurred
        xRay={true} // indicates whether X-Ray outlines are enabled        
    />
</EffectComposer>
)}

export default Visualization;
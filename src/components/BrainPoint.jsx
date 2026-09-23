import { useState } from "react";
import { Html } from "@react-three/drei";


function BrainPoint({x,y,z, weight, pointNumber, evidenceStrength, studyName}) {
    let color = null;
    const [hovered, setHovered] = useState(false);
    if (weight>0.75){
        color = "red";
    }
    else if (weight>0.50){
        color = "orange";
    }
    else {
        color = "yellow";
    }
    
    return (
        <mesh onPointerOver={()=>setHovered(true)} onPointerOut={()=>setHovered(false)} position={[x/73.33, z/73.33, y/73.33]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={4}
                />
            {hovered && (
                <Html>
                    <div>
                        <div>Point {pointNumber} - {evidenceStrength} evidence</div>
                        <div>Study name {studyName}</div>
                    </div>
                </Html>
            )}
        </mesh>
    )    
}

export default BrainPoint
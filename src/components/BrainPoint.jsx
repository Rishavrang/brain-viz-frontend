function BrainPoint({x,y,z, weight}) {
    let color = null;
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
        <mesh position={[x/73.33, z/73.33, y/73.33]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
                color={color}
                emissive={color}
                emissiveIntensity={4}
                />
        </mesh>
    )    
}

export default BrainPoint
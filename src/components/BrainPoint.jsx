function BrainPoint({x,y,z}) {
    return (
        <mesh position={[x/73.33, z/73.33, y/73.33]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="red" 
                emissive="red"
                emissiveIntensity={1}
                />
        </mesh>
    )    
}

export default BrainPoint
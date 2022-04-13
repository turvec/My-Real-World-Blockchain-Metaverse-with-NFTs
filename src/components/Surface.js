const Surface = () => {
    return (
        <mesh position={[0,0,0]}>
            <planeBufferGeometry attach="geometry" args={[50,50]} />
            <meshStandardMaterial
        </mesh>
    );
}
export default Surface;
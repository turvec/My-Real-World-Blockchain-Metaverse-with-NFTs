import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
//textures
import SurfaceNormalMap from '../assets/textures/grounds/ground_cube.jpg'
import SurfaceMap from '../assets/textures/grounds/ground_flat.jpg'

const Surface = () => {
    const [surface, color] = useLoader(TextureLoader, [SurfaceNormalMap, SurfaceMap] )
    return (
        <mesh position={[0,0,0]}>
            <planeBufferGeometry attach="geometry" args={[50,50, 20]} />
            <meshStandardMaterial map={color} normalMap={surface} />
        </mesh>
    );
}
export default Surface;
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
//textures
import NormalMap from '../assets/textures/concrete/concrete_cube.jpg'
import Map from '../assets/textures/concrete/concrete_flat.jpg'

const Plot = ({position, size, landId, setLandName, setLandOwner, setHasOwner, landInfo, setLandId}) => {
    const [surface, color] = useLoader(TextureLoader, [NormalMap, Map] )
    const clickHandler = () => {
        setLandName(landInfo.name)
        setLandId(landId)

        if (landInfo.owner === '0x0000000000000000000000000000000000000000') {
            setLandOwner('No Owner')
            setHasOwner(false)
        } else {
            setLandOwner(landInfo.owner)
            setHasOwner(true)
        }
    }
    return (
        <mesh position={position} onClick={clickHandler} >
            <planeBufferGeometry attach="geometry" args={size} />
            <meshStandardMaterial map={color} normalMap={surface} metalness={0.5} roughness={0} />
        </mesh>
    );
}
export default Plot;
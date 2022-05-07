import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"

//textures
import NormalMap from '../assets/textures/building/building_cube.jpg'
import Map from '../assets/textures/building/building_flat.jpg'


const Building = ({position, size, landId, setLandName, setLandOwner, setHasOwner, landInfo, setLandId}) => {
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
            <boxBufferGeometry args={size} />
            <meshStandardMaterial map={color} normalMap={surface} metalness={0.25} roughness={0} />
        </mesh>
    );
}
export default Building;
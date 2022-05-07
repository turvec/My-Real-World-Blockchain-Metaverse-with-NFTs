import './App.css'
import './assets/bootstrap/css/bootstrap.min.css'
import Web3 from 'web3'
import { Suspense, useState, useEffect} from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky, MapControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import Land from './deployed/Land.json'

import Header from './components/Header'
import Surface from './components/Surface'
import Plot from './components/Plot'
import Building from './components/Building'

function App() {

  const [web3, setWeb3] = useState(null)
  const [account, setAccount] = useState(null)
  const [landContract, setLandContract] = useState(null)
  const [cost, setCost] = useState(0)
  const [buildings, setBuildings] = useState(null)

  const [landId, setLandId] = useState(null)
  const [landName, setLandName] = useState(null)
  const [landOwner, setLandOwner] = useState(null)
  const [hasOwner, setHasOwner] = useState(null)

  useEffect( () => {
    loadBlockchainData()
  }, [account])

  const loadBlockchainData = async () => {
       // Modern dapp browsers...
      //  if (window.ethereum) {
      //   window.web3 = new Web3(window.ethereum)
      //   await window.ethereum.enable()
      // }
      // else if (window.web3) {
      //     window.web3 = new Web3(window.web3.currentProvider)
      // }
      // else {
      //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      // }
      if(typeof window.ethereum !== 'undefined'){
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)

        const accounts = await web3.eth.getAccounts()

        if(accounts.length > 0){
          setAccount(accounts[0])
        }

        const networkId = await web3.eth.net.getId()

        const land = new web3.eth.Contract(Land.abi, Land.networks[networkId].address )
        setLandContract(land)

        const cost = await land.methods.cost().call()
        setCost(web3.utils.fromWei(cost.toString(), 'ether'))

        const buildings = await land.methods.getBuildings().call()
        setBuildings(buildings)

        window.ethereum.on('accountsChanged', function (accounts) {
          setAccount(accounts[0])
        })

        window.ethereum.on('chainChanged', function (chainId) {
          window.location.reload();
        })
      }
       else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
  }

  const web3Handler = async () => {
    if(web3){
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0])
    }
  }

  const buyHandler = async (_id) => {
    try{

      await landContract.methods.mint(_id).send({from: account, value: '1000000000000000000'})

      const buildings = await landContract.methods.getBuildings().call()
      setBuildings(buildings)

      setLandName(buildings[_id - 1].name)
      setLandOwner(buildings[_id - 1].owner)
      setHasOwner(true)

    }catch(error){
      window.alert('An Error occured')
    }
  }

  return (
    <div style={{backgroundColor: 'black'}}>
      <Header web3Handler={web3Handler} account={account} />
      <section >
            {landId &&
                (
                  
                    <div className='row py-4' >
                      <div className='col-md-4 '>
                      
                      </div>
                      <div className='col-md-4 '>
                      <div className='card card-body shadow '>
                        <h4>ID: {landId} </h4> <br/>
                        <h1>Property: <span className='text-success'> {landName} </span></h1> <br/>
                        <h3>Owner: {landOwner} </h3> <br/>
                        {
                          !hasOwner && (
                            <h1>Cost: <span className='text-success'> {`${cost} ETH`} </span> </h1>
                          )
                        }
                        {
                        !hasOwner && (
                            <button onClick={() => buyHandler(landId)} className='btn btn-outline-success'>Purchase</button>
                          )
                        }
                        
                      </div>
                      
                    </div>
                  </div>
                )
              } 
        </section>
      <section style={{height: '700px'}}>
      <Canvas camera={{position: [0, 0, 30], up: [0, 0, 1], far: 10000 }} >
        <Suspense fallback={null} >
        <Sky distance={450000} sunPosition={[1, 10, 0]} azimuth={0.25} />

        <ambientLight intensity={0.5} />
        <Physics>
          { buildings && buildings.map((building, index) => {
            if (building.owner === '0x0000000000000000000000000000000000000000') {
              return (
                <Plot 
                  key={index}
                  position={[building.posX, building.posY, 0.1]}
                  size={[building.width, building.height, 10]}
                  landId={index + 1}
                  landInfo={building}
                  setLandName={setLandName}
                  setLandOwner={setLandOwner}
                  setHasOwner={setHasOwner}
                  setLandId={setLandId}
                />
              )
            } else {
              return (
                <Building 
                  key={index}
                  position={[building.posX, building.posY, 0.1]}
                  size={[building.width, building.height, building.depth]}
                  landId={index + 1}
                  landInfo={building}
                  setLandName={setLandName}
                  setLandOwner={setLandOwner}
                  setHasOwner={setHasOwner}
                  setLandId={setLandId}
                />
              )
            }
          }) }
        </Physics>
        <Surface />
        <MapControls />
      
        </Suspense>
        
      </Canvas>
      </section>
          
    </div>
  );
}

export default App;

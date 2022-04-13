import './App.css'
import Web3 from 'web3'
import {useState, useEffect} from 'react'
import Land from './deployed/Land.json'

function App() {

  const [web3, setWeb3] = useState(null)
  const [account, setAccount] = useState(null)
  const [landContract, setLandContract] = useState(null)
  const [cost, setCost] = useState(0)
  const [buildings, setBuildings] = useState(null)

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
        const web = new Web3(window.ethereum)
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
  }

  const web3Handler = async () => {
    if(web3){
      const accounts = await window.ethereum.request({method: 'eth_requestAccount'});
      setAccount(accounts[0])
    }
  }

  return (
    <div >
      Virtual Land
    </div>
  );
}

export default App;

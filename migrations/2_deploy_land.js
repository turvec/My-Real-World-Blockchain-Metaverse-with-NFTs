const Land = artifacts.require("Land");

module.exports = async function (deployer) {

  const NAME = "Earth 2 Verse"
  const SYMBOL = "ET2"
  const COST = web3.utils.toWei('1', 'ether')

  await deployer.deploy(Land, NAME,  SYMBOL, COST);
};
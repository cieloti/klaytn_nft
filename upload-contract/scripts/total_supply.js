import { createRequire } from "module";
const require = createRequire(import.meta.url);
const contractJson = require("../../contract.json");
const Caver = require('caver-js');

const contractAddress = contractJson.baobabContract;
let caver = new Caver('https://api.baobab.klaytn.net:8651/');
if (process.env.REACT_APP_NETWORK === 'mainnet') {
  contractAddress = ContractData.cypressContract;
  caver = new Caver('https://api.cypress.klaytn.net:8651/');
}

async function totalSupplyFunction() {
  const contractABI = contractJson.contractABI;
  const sender = await caver.klay.accounts.wallet.add(contractJson.minterPrivatekey);
  const contract = new caver.contract.create(contractABI, contractAddress);
  const mintCount = await contract.methods.totalSupply().call();
  console.log(mintCount);
};

totalSupplyFunction();

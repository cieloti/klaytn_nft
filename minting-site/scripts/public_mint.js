import { createRequire } from "module";
const require = createRequire(import.meta.url);
const contractJson = require("../src/data/contract.json");
const Caver = require('caver-js');

const contractAddress = contractJson.baobabContract;  
let caver = new Caver('https://api.baobab.klaytn.net:8651/');
if (process.env.REACT_APP_NETWORK === 'mainnet') {
  contractAddress = ContractData.cypressContract;
  caver = new Caver('https://api.cypress.klaytn.net:8651/');
}

async function publicFunction() {
  const contractABI = contractJson.contractABI;
  const contract = new caver.contract.create(contractABI, contractAddress);
  const mintCount = await contract.methods.totalSupply().call();
  console.log(mintCount);

  const sender = await caver.klay.accounts.wallet.add(contractJson.minterPrivatekey);
  await caver.klay.sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: contractJson.minterAddress, //발행주소
      to: contractJson.baobabContract, //배포된 컨트랙트 주소
      data: contract.methods.setPublicMintEnabled(true).encodeABI(),
      gas: '1000000'
    }).catch((err) => { console.log(err); });

  await caver.klay.sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: contractJson.minterAddress, //발행주소
      to: contractJson.baobabContract, //배포된 컨트랙트 주소
      data: contract.methods.setupSale(10, 10, 10, 86457558, 1, 10000, caver.utils.toPeb(1).toString()).encodeABI(),
      gas: '1000000'
    }).catch((err) => { console.log(err); });
};

publicFunction();

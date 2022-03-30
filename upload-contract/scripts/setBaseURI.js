import { createRequire } from "module";
const require = createRequire(import.meta.url);
const contractJson = require("../../contract.json");
const Caver = require('caver-js');

const contractAddress = contractJson.baobabContract;
let caver = new Caver('https://api.baobab.klaytn.net:8651/');
if (contractJson.network === 'mainnet') {
  contractAddress = ContractData.cypressContract;
  caver = new Caver('https://api.cypress.klaytn.net:8651/');
}
async function publicFunction() {
  const contractABI = contractJson.contractABI;
  const sender = await caver.klay.accounts.wallet.add(contractJson.minterPrivatekey);
  const contract = new caver.contract.create(contractABI, contractAddress);

  await caver.klay.sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: contractJson.minterAddress, //발행주소
      to: contractJson.baobabContract, //배포된 컨트랙트 주소
      data: contract.methods.setBaseURI(contractJson.setBaseURI).encodeABI(),
      gas: '1000000'
    }).catch((err) => { console.log(err); });
};

publicFunction();

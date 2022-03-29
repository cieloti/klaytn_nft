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

async function publicFunction() {
  const contractABI = contractJson.contractABI;
  const sender = await caver.klay.accounts.wallet.add(contractJson.minterPrivatekey);
  const contract = new caver.contract.create(contractABI, contractAddress);
  console.log("Usage: _antibotInterval _mintLimitPerBlock _mintLimitPerSale _mintStartBlockNumber _mintIndexForSale _maxSaleAmount _mintPrice");

  const inter = Number(process.argv[2]);
  const limitBlock = Number(process.argv[3]);
  const limitSale = Number(process.argv[4]);
  const startBlock = Number(process.argv[5]);
  const index = Number(process.argv[6]);
  const maxSale = Number(process.argv[7]);
  const price = Number(process.argv[8]);


  await caver.klay.sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: contractJson.minterAddress, //발행주소
      to: contractJson.baobabContract, //배포된 컨트랙트 주소
      // data: contract.methods.setupSale(10, 10, 10, 86457558, 100, 10000, caver.utils.toPeb(1).toString()).encodeABI(),
      data: contract.methods.setupSale(inter, limitBlock, limitSale, startBlock, index, maxSale, caver.utils.toPeb(price).toString()).encodeABI(),
      gas: '1000000'
    }).catch((err) => { console.log(err); });
};

publicFunction();

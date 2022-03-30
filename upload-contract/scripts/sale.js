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

  const inter = Number(contractJson._antibotInterval);
  const limitBlock = Number(contractJson._mintLimitPerBlock);
  const limitSale = Number(contractJson._mintLimitPerSale);
  const startBlock = Number(contractJson._mintStartBlockNumber);
  const index = Number(contractJson._mintIndexForSale);
  const maxSale = Number(contractJson._maxSaleAmount);
  const price = Number(contractJson._mintPrice);
  console.log("Caution : 이미 민팅이 된 tokenId로 _mintIndexForSale를 설정하면 민팅이 실패합니다"); 

  
  console.log("setup sale start");
  await caver.klay.sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: contractJson.minterAddress, //발행주소
      to: contractJson.baobabContract, //배포된 컨트랙트 주소
      data: contract.methods.setupSale(inter, limitBlock, limitSale, startBlock, index, maxSale, caver.utils.toPeb(price).toString()).encodeABI(),
      gas: '1000000'
    }).catch((err) => { console.log(err); });
};

publicFunction();

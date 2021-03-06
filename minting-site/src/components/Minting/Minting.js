import React, { useEffect, useState } from 'react';
import Caver from 'caver-js';
import contractJson from '../../data/contract.json';

let contractAddress = contractJson.baobabContract;
if (contractJson.network === 'baobab') {
  contractAddress = contractJson.baobabContract;
} else if (contractJson.network === 'mainnet') {
  contractAddress = contractJson.cypressContract;
}
const contractABI = contractJson.contractABI;

function Minting() {
    const [account, setAccount] = useState('');
    const [minterAddress, setMinterAddress] = useState('');
    const [mintCnt, setMintCnt] = useState(0);
    const caver = new Caver(window.klaytn);
    const contract = new caver.contract.create(contractABI, contractAddress);
    const NFTPrice = contractJson._mintPrice;
    const [disable, setDisable] = useState(true);

    useEffect(async () => {
        const mintCount = await contract.methods.totalSupply().call();
        setMintCnt(mintCount);
    }, [minterAddress]);

    const connectWallet = async () => {
        const addr = contractJson.mintAddress;

        if (window.klaytn) {
            // console.log(window.klaytn);
            const [address] = await window.klaytn.enable();
            setAccount(address);
            setMinterAddress(addr);
            setDisable(false);
        }
    };

    const mintNFT1 = async () => {
        await caver.klay.sendTransaction({
            type: 'SMART_CONTRACT_EXECUTION',
            from: account,
            to: contractAddress,
            value: caver.utils.toPeb((NFTPrice * 1).toString(), 'KLAY'),
            data: contract.methods.publicMint(1).encodeABI(),
            gas: '850000',
        }).then(() => {
            alert('Mint success');
        })
            .catch(() => { alert('Mint failed.'); });
        const mintCount = await contract.methods.totalSupply().call();
        setMintCnt(mintCount);
    };
    const mintNFT5 = async () => {
        await caver.klay.sendTransaction({
            type: 'SMART_CONTRACT_EXECUTION',
            from: account,
            to: contractAddress,
            value: caver.utils.toPeb((NFTPrice * 5).toString(), 'KLAY'),
            data: contract.methods.publicMint(5).encodeABI(),
            gas: '2000000',
        }).then(() => {
            alert('Mint success');
        })
            .catch(() => { alert('Mint failed'); });
        const mintCount = await contract.methods.totalSupply().call();
        setMintCnt(mintCount);
    };
  return (
    <div>
      <div>{mintCnt}/{contractJson._maxSaleAmount}</div>
      <div>Price : {NFTPrice} Klay</div>
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      <div>Wallet address : {account}</div>
      <div>
        <button type="button" disabled={disable} onClick={mintNFT1}>Mint 1 NFT</button>
        <button type="button" disabled={disable} onClick={mintNFT5}>Mint 5 NFT</button>
      </div>
    </div>
  );
}

export default Minting;

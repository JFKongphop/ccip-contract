const { ethers } = require("ethers");
const dotenv = require('dotenv');
dotenv.config();

const contractName = 'Sender';
const data = require(`../artifacts/contracts/${contractName}.sol/${contractName}.json`);

const providerURL = process.env.SEPOLIA;
const privateKey = process.env.PRIVATE_KEY;
const contractABI = data.abi;

const contractAddress = '0x502627884E5278521A18241485012e78cEcEd548';

const execution = async () => {  
  const provider = new ethers.JsonRpcProvider(providerURL);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  const tx = await contract.sendMessage(
    '2279865765895943307',
    '0xFebd4eDc1d914669A40BE5221852feCdBD066DF5',
    'Hello World Chainlink'
  );

  const receipt = await tx.wait();

  console.log('DATA:', receipt);
};

execution().catch((error) => {
  console.error("Error deploying contract:", error);
});


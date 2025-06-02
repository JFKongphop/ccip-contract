const { ethers } = require("ethers");
const dotenv = require('dotenv');
dotenv.config();

const contractName = 'Receiver';
const data = require(`../artifacts/contracts/${contractName}.sol/${contractName}.json`);

const providerURL = process.env.SCROLL;
const privateKey = process.env.PRIVATE_KEY;
const contractABI = data.abi;

const contractAddress = '0xFebd4eDc1d914669A40BE5221852feCdBD066DF5';

const execution = async () => {  
  const provider = new ethers.JsonRpcProvider(providerURL);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  const result = await contract.getLastReceivedMessageDetails();

  console.log('MESSAGE:', result);
};

execution().catch((error) => {
  console.error("Error deploying contract:", error);
});


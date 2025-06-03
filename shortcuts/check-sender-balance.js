const { ethers } = require("ethers");
const dotenv = require('dotenv');
dotenv.config();

const data = require('../artifacts/@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json');

const providerURL = process.env.SEPOLIA;
const privateKey = process.env.PRIVATE_KEY;
const contractABI = data.abi

const contractAddress = '0x779877A7B0D9E8603169DdbD7836e478b4624789';

const execution = async () => {  
  const provider = new ethers.JsonRpcProvider(providerURL);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  const balance = await contract.balanceOf('0x502627884E5278521A18241485012e78cEcEd548');

  console.log('LINK BALANCE:', balance);
};

execution().catch((error) => {
  console.error("Error contract:", error);
});


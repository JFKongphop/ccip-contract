import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
// import { } from '../typechain-types';
import snarkjs, { CircuitSignals } from 'snarkjs';

describe('Contract', async () => {
  let user1: SignerWithAddress; 
  let user2: SignerWithAddress;
  let contract: any;


  before(async () => {
    [user1, user2] = await ethers.getSigners();
    
    const Contract = await ethers.getContractFactory('DecodeProof');
    contract = await Contract.deploy();
  });

  describe('extractProof', async () => {
    it('Should return public input', async () => {
      
      
    });
  })
});

const generateProof = async (publicInput: CircuitSignals) : Promise<string> => {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    publicInput,
    'proof-source/square_and_sum.wasm',
    'proof-source/square_and_sum.zkey'
  );

  const calldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
  const parsed = JSON.parse(`[${calldata}]`);

  return new ethers.AbiCoder().encode(
    ["bytes32[2]", "bytes32[2][2]", "bytes32[2]", "bytes32[1]"],
    parsed
  );
}
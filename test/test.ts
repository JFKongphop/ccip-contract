import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { DecodeProof } from '../typechain-types';
import { CircuitSignals, groth16 } from 'snarkjs';

describe('Contract', async () => {
  let user1: SignerWithAddress; 
  let user2: SignerWithAddress;
  let decodeProof: DecodeProof;

  before(async () => {
    [user1, user2] = await ethers.getSigners();

    const SquareSumVerifier = await ethers.getContractFactory('SquareSumVerifier');
    const squareSumVerifier = await SquareSumVerifier.deploy();
    
    const verifierAddress = await squareSumVerifier.getAddress();
    const DecodeProof = await ethers.getContractFactory('DecodeProof');
    decodeProof = await DecodeProof.deploy(verifierAddress);
  });

  describe('extractProof', async () => {
    it('Should return public input', async () => {
      const proofs = await generateProof({
        'x': 3,
        'y': 4
      });

      const data = await decodeProof.extractProof(proofs);
      console.log(data);
    });
  })
});

const generateProof = async (publicInput: CircuitSignals) : Promise<string> => {
  const { proof, publicSignals } = await groth16.fullProve(
    publicInput,
    'proof-source/square_and_sum.wasm',
    'proof-source/square_and_sum.zkey'
  );

  const calldata = await groth16.exportSolidityCallData(proof, publicSignals);
  const parsed = JSON.parse(`[${calldata}]`);

  return new ethers.AbiCoder().encode(
    ['uint[2]', 'uint[2][2]', 'uint[2]', 'uint[1]'],
    parsed
  );
}
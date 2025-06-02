const { ethers }  = require('ethers');
const snarkjs = require('snarkjs');

const generateProof = async (publicInput) => {
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

(async () => {
  const a = await generateProof({
    'x': 3,
    'y': 4
  });

  console.log(a);
  process.exit(0);
})();
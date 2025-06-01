import hre, { ethers } from 'hardhat';

const name = 'Sender';

const deploy = async () => {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy(
    '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
    '0x779877A7B0D9E8603169DdbD7836e478b4624789'
  );

  await contract.deploymentTransaction()?.wait(3);

  await contract.waitForDeployment()

  const contractAddress = await contract.getAddress();

  console.log(`${name} ADDRESS:`, contractAddress);

  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      contract: `contracts/${name}.sol:${name}`,
      constructorArguments: [],
    });
  }
  catch (e) {
    console.log("ERROR", e);
  }
}

deploy().catch((err) => {
  console.log(err);
  process.exitCode = 1;
})
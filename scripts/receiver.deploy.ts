import hre, { ethers } from 'hardhat';

const name = 'Receiver';

const deploy = async () => {
  const Contract = await ethers.getContractFactory(name);
  const contract = await Contract.deploy('0x6aF501292f2A33C81B9156203C9A66Ba0d8E3D21');

  await contract.deploymentTransaction()?.wait(3);

  await contract.waitForDeployment()

  const contractAddress = await contract.getAddress();

  console.log(`${name} ADDRESS:`, contractAddress);

  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      contract: `contracts/${name}.sol:${name}`,
      constructorArguments: ['0x6aF501292f2A33C81B9156203C9A66Ba0d8E3D21'],
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
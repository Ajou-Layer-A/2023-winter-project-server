const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Step 1: Import necessary modules and contracts
  const nftLootBox = await ethers.getContractFactory('NFTLootBox');

  // Step 2: Fetch contract source code
  const nftLootBoxContract = await nftLootBox.deploy();

  console.log('NFTLootBox contract address:', nftLootBoxContract.target);
}
// Execute the deploy function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

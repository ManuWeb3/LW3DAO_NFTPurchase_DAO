const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    console.log("Deploying FakeNFTMarketplace\n")
    const FakeNFTMarketplace = await ethers.getContractFactory(
        "FakeNFTMarketplace"
    );
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployTransaction.wait(10);

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);
    console.log("------------------------------")

    // Now deploy the CryptoDevsDAO contract
    const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
    
    const cryptoDevsDAO = await CryptoDevsDAO.deploy(
        fakeNftMarketplace.address,
        CRYPTODEVS_NFT_CONTRACT_ADDRESS,
        {
            value: ethers.utils.parseEther("0.05")
            // funding the DAO with 0.05 ether, default figure will be shown on Metamask
        }
    )
    
    await cryptoDevsDAO.deployTransaction.wait(10);

    console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
    console.log("--------------------------")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
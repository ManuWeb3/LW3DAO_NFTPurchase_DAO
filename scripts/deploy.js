const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS, FAKE_NFT_MARKETPLACE, EPNS_COMM_ADDRESS } = require("../constants");
const {network} = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config.js")
const {verify} = require("../utils/verify")

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    /*console.log("Deploying FakeNFTMarketplace\n")
    const FakeNFTMarketplace = await ethers.getContractFactory(
        "FakeNFTMarketplace"
    );
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployTransaction.wait(10);

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);
    console.log("------------------------------")
      */
    // Now deploy the CryptoDevsDAO contract
    console.log("Deploying CryptoDevsDAO\n")
    const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
    
    const cryptoDevsDAO = await CryptoDevsDAO.deploy(
        FAKE_NFT_MARKETPLACE,
        CRYPTODEVS_NFT_CONTRACT_ADDRESS,
        EPNS_COMM_ADDRESS,
        {
            value: ethers.utils.parseEther("0.03")
            // funding the DAO with 0.05 ether, default figure will be shown on Metamask
        }
    )
    
    await cryptoDevsDAO.deployTransaction.wait(10);

    console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
    console.log("--------------------------")

    //  2. Verify on Etherscan, if it's Goerli
    const args = [FAKE_NFT_MARKETPLACE, CRYPTODEVS_NFT_CONTRACT_ADDRESS, EPNS_COMM_ADDRESS]

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      console.log("Verifying on GoerliEtherscan...")
      await verify(cryptoDevsDAO.address, args)
      //  it takes address and args of the S/C as parameters
      console.log("-------------------------------")
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
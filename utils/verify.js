const {run} = require("hardhat")

const verify = async (contractAddress, args) => {               // verify() takes 2 args: 1. Contract address, 2. args - constructor args
    console.log("Verifying the contract, please wait...")
    try {
    await run("verify:verify", {    
                                      
      address: contractAddress,
      constructorArguments: args,   
                                    
  })}
  
  catch (e) {

    if(e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified")
      }
      else {
        console.log(e)
      }
    }
} // body of verify
      
module.exports = {verify}
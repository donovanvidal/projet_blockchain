const Odometer = artifacts.require("Odometer");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Odometer", function (/* accounts */) {
  
  it("should assert true", async function () {
    let instance = await Odometer.deployed();
    console.log(instance)
    return assert.isTrue(true);

  });

  it('declare owner', async () => { 
    let instance = await Odometer.deployed();
    const declare = await instance.createInspector("0xb7898484A245485A76fc8bF5D0Ca686089Ed1129"); 
    // const transfer =  web3.utils.toBN(web3.utils.toBN(web3.utils.toWei(supply))); 

    console.log(declare); 
    }); 
});

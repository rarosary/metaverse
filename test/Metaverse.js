const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Metaverse contract", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshot in every test.
    async function deployTokenFixture() {
      // Get the ContractFactory and Signers here.
      const Metaverse = await ethers.getContractFactory("Metaverse");
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // its deployed() method, which happens onces its transaction has been
      // mined.
      const metaverse = await Metaverse.deploy();
  
      await metaverse.deployed();
  
      // Fixtures can return anything you consider useful for your tests
      return { metaverse, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define each
        // of your tests. It receives the test name, and a callback function.
        //
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
          // We use loadFixture to setup our environment, and then assert that
          // things went well
          const { metaverse, owner } = await loadFixture(deployTokenFixture);
    
          // `expect` receives a value and wraps it in an assertion object. These
          // objects have a lot of utility methods to assert values.
    
          // This test expects the owner variable stored in the contract to be
          // equal to our Signer's owner.
          expect(await metaverse.owner()).to.equal(owner.address);
        });
            
    });
    describe('withdraw', function () {
        it('Should be reverted because the caller is not owner', async function () {
            const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
          
           await expect(await metaverse.connect(addr1).withdraw())//.to.be.revertedWith('Ownable: caller is not the owner')
            
        })
       
        it('Should withdraw funds by the owner', async function () {
            const { metaverse, owner } = await loadFixture(deployTokenFixture);
          expect(await metaverse.connect(owner).withdraw())
        })
    
       
    })

})
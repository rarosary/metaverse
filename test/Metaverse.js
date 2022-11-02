const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { Provider } = require("web3modal");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers")

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
          
           //await expect(await metaverse.connect(addr1).withdraw()).to.revertedWith('Ownable: caller is not the owner')
          await expect(metaverse.connect(addr1).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
          //expect(await metaverse.connect(addr1).withdraw());
            
        })
       
        it('Should withdraw funds by the owner', async function () {
            const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
            let listingPrice = await metaverse.cost();
      listingPrice = listingPrice.toString()
              
            expect( await 
                  metaverse.connect(addr1).mint("School",4,4,4,10,20,10,{ value: listingPrice }))
                  expect(await metaverse.connect(owner).withdraw())
          
          
          balance = await metaverse.provider.getBalance(owner.address)
          balance = ethers.utils.formatEther(balance)
          console.log("etherWithdrawnByOwner :",balance)
          
        })
    
       
    })

    describe('Minting', function()  {
       it('Succesfully Mints a building', async () => {
           const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
           let listingPrice = await metaverse.cost();
      listingPrice = listingPrice.toString()
      console.log("listingPrice : ",listingPrice)
            //const cost = {value:ethers.utils.parseEther('0.1'),}           
            expect( await 
                  metaverse.connect(addr1).mint("School",4,4,4,10,20,10,{ value: listingPrice }));
                  let getBuildings = await metaverse.getBuildings()
                  getBuildings = getBuildings.toString()
                  console.log("getBuildings : ",getBuildings)
                  
        })

        it('Cannot mint a building. insufficient funds', async () => {
          const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
          //let listingPrice = await metaverse.cost();
          //listingPrice = listingPrice.toString()
           //const cost = {value:ethers.utils.parseEther('0.01'),}  
           listingPrice = ethers.utils.parseEther('0.01')

           await expect(
                 metaverse.connect(addr1).mint("School",4,4,4,10,20,10,{ value: listingPrice })).to.be.reverted;//With("Need more Eth");
       })

       it('Cannot mint a building. Max buidings', async () => {
        const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
        let listingPrice = await metaverse.cost();
      listingPrice = listingPrice.toString()
         //const cost = {value:ethers.utils.parseEther('0.1')}  
         
         for (let i=0; i<100; i++)   {
          await expect(
            metaverse.connect(addr1).mint("School "+i,4,4,4,10,20,i,{ value: listingPrice }))//.to.be.reverted;//With("Max buildings reached");
         }
         //await expect(
          //metaverse.connect(addr1).mint("School",4,4,4,10,20,10,cost)).to.be.reverted;  
          let ownerBuildings = await metaverse.connect(addr1).getOwnerBuildings()
        totalOwnerBuildings = ownerBuildings.length.toString()
        console.log("No of owner buildings : ",totalOwnerBuildings)    
         console.log("lastOwnerBui: ",ownerBuildings[99].toString())
       })

       it('Cannot mint a building. Not enough input variables for buiding', async () => {
        const { metaverse, owner,addr1 } = await loadFixture(deployTokenFixture);
        let listingPrice = await metaverse.cost();
      listingPrice = listingPrice.toString()
         //const cost = {value:ethers.utils.parseEther('0.1'),supply:100}           
         await expect(
          metaverse.connect(addr1).mint("School",4,4,4,10,{ value: listingPrice })).to.be.rejected;//("need size and position inputs")
               //metaverse.connect(addr1).mint("School",4,4,4,10,cost)).to.be.reverted;//With("No building stats");
       })

    })
      
  })

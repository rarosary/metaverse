const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { expect } = require('chai')
const { ethers } = require('hardhat')
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
//require("@nomiclabs/hardhat-ethers");
//require("@nomiclabs/hardhat-waffle")
require('@nomicfoundation/hardhat-toolbox')


/* test/sample-test.js */
describe("Metaverse", function() {
          /* deploy the marketplace */
   let Metaverse, metaverse, owner, addr1, addr2
    beforeEach(async function () {
      Metaverse = await ethers.getContractFactory('Metaverse')
      metaverse = await Metaverse.deploy()
      metaverse = await metaverse.deployed()

      ;[owner, addr1, addr2] = await ethers.getSigners()
    })
          
    describe('Deployment', function () {
      it('Should set the right owner', async function () {
        expect(await metaverse.owner()).to.be.equal(owner.address)
      })
    })

    describe('withdraw', function () {
        it('Should be reverted because the caller is not owner', async function () {
          await expect(
            metaverse.connect(addr1).withdraw(),
            ).to.revertedWith('caller is not the owner')
            
        })
       
        it('Should withdraw funds by the owner', async function () {
          await metaverse.connect(owner).withdraw()
        })
    
       
    })

    describe('Minting', function()  {
        describe('Success', () => {
            it('Succesfully Mints a building', async () => {
                await metaverse.connect(owner)
                const overrides = {value:ethers.utils.parseEther('0.1'),}           
                await expect( 
                    metaverse.connect(addr1).mint("School",4,4,4,10,20,10,overrides),
                ).to.revertedWith('not able to mint')
            })

        })
        
    })
})


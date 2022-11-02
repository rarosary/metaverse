describe("Metaverse", function() {
    it("Should create and execute market sales", async function() {
      const Market = await ethers.getContractFactory("Metaverse")
      const market = await Market.deploy()
      await market.deployed()
      const marketAddress = market.address
  
      // const NFT = await ethers.getContractFactory("Metaverse")
      // const nft = await NFT.deploy(marketAddress)
      // await nft.deployed()
      // const nftContractAddress = nft.address
  
      let listingPrice = await market.cost();
      listingPrice = listingPrice.toString()
      console.log("listingPrice : ",listingPrice)

      let totalSupply = await market.totalSupply()
      totalSupply = totalSupply.toString()
      console.log("totalSupply : ",totalSupply)

      const auctionPrice = ethers.utils.parseUnits('0.1', 'ether')
      const [owner, buyerAddress] = await ethers.getSigners()
  
      await market.connect(buyerAddress).mint("LAND001",10,10,10,0,0,0, { value: listingPrice })
      await market.connect(buyerAddress).mint("LAND002",10,10,10,0,0,1, { value: listingPrice })

      let getBuildings = await market.getBuildings()
      getBuildings = getBuildings.toString()
      console.log("getBuildings : ",getBuildings)
    
      let totalSupplyAfterMint = await market.totalSupply()
      totalSupplyAfterMint = totalSupplyAfterMint.toString()
      console.log("totalSupplyAfterMint : ",totalSupplyAfterMint)
      

      let getOwnerBuildings = await market.connect(buyerAddress).getOwnerBuildings()
      getOwnerBuildings = getOwnerBuildings.toString()
      console.log("getOwnerBuildings : ",getOwnerBuildings)
        
        
      await market.connect(owner).withdraw()
       let etherWithdrawnByOwner = ethers.utils.formatEther(await market.provider.getBalance(owner.address))
      etherWithdrawnByOwner = etherWithdrawnByOwner.toString()
      console.log("etherWithdrawnByOwner :",etherWithdrawnByOwner)
    
  
      // await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
  
      // items = await market.fetchMarketItems()
      // items = await Promise.all(items.map(async i => {
      //   const tokenUri = await nft.tokenURI(i.tokenId)
      //   let item = {
      //     price: i.price.toString(),
      //     tokenId: i.price.toString(),
      //     seller: i.seller,
      //     owner: i.owner,
      //     tokenUri
      //   }
      //   return item
      // }))
      // console.log('items: ', items)
    })
  })

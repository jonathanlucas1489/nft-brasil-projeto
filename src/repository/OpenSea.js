const Web3 = require('web3')
const { OpenSeaPort, Network } =  require('opensea-js')
const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})
class OpenSea {
    static async getAsset(tokenAddress, tokenId) {
        try {
            const asset = await seaport.api.getAsset({
                tokenAddress: tokenAddress, // string
                tokenId: tokenId, // string | number | null
            })
            console.log(asset)
            return asset
        } catch(e) {
            return e.msg
        }
    }
}
module.exports = OpenSea

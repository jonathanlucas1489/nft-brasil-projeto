const express = require('express')
const opensea = require('../repository/OpenSea')
module.exports = {
    async getAsset(req, res) {
        try {
            const {tokenAddress, tokenId} = req.body
            const asset = await opensea.getAsset(tokenAddress, tokenId)
            return res.status(200).json(asset)
        } catch(err) {
            return res.status(400).json({ error: err.message })
        }
    }
}

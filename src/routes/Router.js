const express = require('express')
const assetController = require('../controllers/AssetController')
const routes = express.Router()
routes.get('/asset', assetController.getAsset)
module.exports = routes;



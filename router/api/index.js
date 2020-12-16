const express = require('express')
const api = express();
const apiv1 = require('./api1')

api.use('/1', apiv1)
module.exports = api
import axios from 'axios'
const https = require('https')

const api  = axios.create({
    baseURL:'http://localhost:4100/',
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
})
export default api;
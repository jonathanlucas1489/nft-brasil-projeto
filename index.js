const express = require('express')
const dotenv  = require('dotenv').config
const cors  = require('cors')
const routes = require('./src/routes/Router')
const port  = process.env.API_PORT || 3333;
const app = express();

app.use(express.json());
app.use(cors());    
app.use('/api', routes);
app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});
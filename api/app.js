const express = require('express')
const app = express()
require('dotenv').config();
var cors = require('cors')
const connectToDatabase = require('./db/db')
const user = require('./routes/user')
const customer = require('./routes/customer')
const item = require('./routes/item')

const port = process.env.PORT || 4000;

app.use(cors())
connectToDatabase();
app.use(express.json())
app.use('/user/auth', user)
app.use('/customer', customer);
app.use('/item', item);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})
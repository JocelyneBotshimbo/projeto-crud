const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
 
const indexRoute = require('./routes')
const { body } = require('express-validator')

const app = express()

//CONNECT TO MONGODB

const port = 3000
mongoose.connect('mongodb://localhost:27017/projeto_crud', {useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',() => console.log('something went wrong to connect to database'))
db.once('open',() =>{
  console.log('DB connection has been made successfully');
});
//MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
//ROUTING 

app.use('/', indexRoute)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
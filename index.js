const express = require('express');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/swaggerUser',{useNewUrlParser: true}, ()=>{
  console.log('connected to db')
})

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', user);

app.listen(4900, () => console.log('listening to port 4900'));

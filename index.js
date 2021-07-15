const express = require('express');
const app = express();

app.use(express.json());



app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/views/home.html')
  })


app.listen(3000)
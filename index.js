const express = require('express');
const app = express();

app.use(express.json());

let auth = function(req, res, next) {
    let value = 'Bearer 65a83e72c7e990a3e6565ae8b7cc071c';
    let token = req.get('authorization');

    console.log(token);
    if(token === value){
        next();
    }else{
        res.status(401).send('Unauthorized')
    }
}

app.get('/', auth, function(req, res){
    res.sendFile(__dirname + '/src/views/home.html')
  })


app.listen(3000)
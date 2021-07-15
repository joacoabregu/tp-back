const express = require('express');
const app = express();
const fs = require('fs')

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

let log = function(req, res, next) {
    let date = new Date;
    let actualDate = formatDate(date);
    let fileName = `/${actualDate}.log`;
    let content = `${req.ip}, ${actualDate} ${date.toTimeString().split(' ')[0]}, ${req.method}, ${req.path} `;

    fs.appendFile(__dirname + '/logs' + fileName, content, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    
    next();
}

app.get('/', log, function(req, res){
    res.sendFile(__dirname + '/src/views/home.html')
  })

app.post('/', log, function(req, res){
    res.sendFile(__dirname + '/src/views/home.html')
})

app.get('/contacto', log, auth, function(req, res){
    res.sendFile(__dirname + '/src/views/home.html')
  })


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


app.listen(3000)
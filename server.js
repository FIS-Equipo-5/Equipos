const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

/*Creamos variables para la ejecución de la API teams*/
const teamsAPI = require('./teamsAPI/v1/index');
/*Creamos variables para la ejecución de la API teams*/
var playersAPI = require('./playersAPI/v1/index');

var app = express();
app.use(bodyParser.json());

/*jwt secret token*/
app.set('secretKey', 'authServiceApi'); 

//jwt token is checked for all our routes
app.use('/', validateUser);

//Function that validates jwt token
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}

/*Ejecución de teamsAPI*/
teamsAPI.register(app);

/*Ejecución de playersAPI*/
playersAPI.register(app);

/*Exportamos el servidor*/
module.exports = app;
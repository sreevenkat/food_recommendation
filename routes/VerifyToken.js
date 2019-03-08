var jwt = require('jsonwebtoken');
var config = require('../config');
const AuthToken = require('../models').AuthToken;

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.hashsecret, function(err, decoded) {
    if (err){    
        return res.status(500).send({
            auth: false, 
            message: 'Failed to authenticate token.' 
        });
    }
    // if everything good, save to request for use in other routes
    AuthToken.findOne({where:{token: token, user_id: decoded.id}})
    .then(function(auth_token_object){
        if(!auth_token_object){
            return res.status(403).send({
                auth: false, 
                message: 'Invalid token.' 
            });
        }
        req.userId = decoded.id;
        next();
    })
    
  });
}
module.exports = verifyToken;
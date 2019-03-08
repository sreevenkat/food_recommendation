var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

const User = require('../models').User;
const AuthToken = require('../models').AuthToken;

module.exports = {
  logout(req, res) {
    return AuthToken.destroy({ where: { token: req.headers['x-access-token'] } })
      .then(function(affectedRows){
        if (!affectedRows) {
          return res.status(404).send({
            message: 'Token Not Found',
          });
        }
        return res.status(200).send();
      })
      .catch((error) => res.status(400).send(error));
  },

  login(req, res) {

    return User.findOne({ where: {email: req.body.email} })
    .then(function (user) {
        // if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        // console.log("Requesting token, passwordIsValid, user", passwordIsValid, user)
        AuthToken.generate(user.id).then(function(token){
          // console.log("Hey i got the token", token)
          res.status(200).send({ auth: true, token: token });
        })
    });

  },
};
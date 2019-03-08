var jwt = require('jsonwebtoken');
var config = require('../config');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  AuthToken.associate = function(models) {
    // associations can be defined here
    AuthToken.belongsTo(models.User, {foreignKey: "user_id"});
  };

  AuthToken.generate = function(user_id) {
    if (!user_id) {
      throw new Error('AuthToken requires a user ID')
    }

    var token = jwt.sign({ id: user_id }, config.hashsecret, {
      expiresIn: 86400 // expires in 24 hours
    });

    return AuthToken.create({ token:token, user_id:user_id })
  }
  return AuthToken;
};
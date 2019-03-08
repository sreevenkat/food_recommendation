'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Hotel, {
      through: 'HotelUser',
      as: 'hotel',
      foreignKey: 'user_id'
    });
    User.hasMany(models.HotelUser, {
      foreignKey: 'user_id',
      as: 'hotels',
    });
    User.hasMany(models.AuthToken, {foreignKey: 'user_id'});
  };
  return User;
};
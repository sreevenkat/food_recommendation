'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    name: DataTypes.STRING
  }, {});
  Hotel.associate = function(models) {
    // associations can be defined here
    Hotel.hasMany(models.Dish, {
      foreignKey: 'hotel_id',
      as: 'dishes',
    });
    Hotel.hasMany(models.HotelUser, {
      foreignKey: 'hotel_id',
      as: 'hotelusers',
    });
    Hotel.belongsToMany(models.User, {
      through: 'HotelUser',
      as: 'users',
      foreignKey: 'hotel_id'
    });
  };
  return Hotel;
};
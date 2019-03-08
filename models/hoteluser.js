'use strict';
module.exports = (sequelize, DataTypes) => {
  const HotelUser = sequelize.define('HotelUser', {
    hotel_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  HotelUser.associate = function(models) {
    // associations can be defined here
    HotelUser.belongsTo(models.Hotel, {foreignKey: "hotel_id"});
    HotelUser.belongsTo(models.User, {foreignKey: "user_id"});
  };
  return HotelUser;
};
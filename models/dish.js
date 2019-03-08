'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    name: DataTypes.STRING,
    hotel_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {});

  Dish.associate = function(models) {
    // associations can be defined here
    Dish.belongsTo(models.Hotel,{ foreignKey: "hotel_id" });
  };

  return Dish;
};
const HotelUser = require('../models').HotelUser;
const Dish = require('../models').Dish;
const Hotel = require('../models').Hotel;
const User = require('../models').User;

module.exports = {
  list(req, res) {
    return Dish
      .findAll({
        include: [{
          model: Hotel,
        }],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((dishes) => res.status(200).send(dishes))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Dish
      .findByPk(req.params.id,{include:[Hotel]})
      .then((dish) => {
        if (!dish) {
          return res.status(404).send({
            message: 'Dish Not Found',
          });
        }
        return res.status(200).send(dish);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return HotelUser.findOne({
        where:{user_id: req.userId, hotel_id:req.body.hotel_id}
      }).then(function(hotel_user){
        if(!hotel_user){
          return res.status(403).send("UnAuthorised")
        }
        return Dish.create({
          hotel_id: req.body.hotel_id,
          name: req.body.name,
        })
        .then((dish) => res.status(201).send(dish))
        .catch((error) => res.status(400).send(error));
    }).catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Dish
      .findByPk(req.params.id, {
        include: [{
          model: Hotel
        }],
      })
      .then(dish => {
        if (!dish) {
          return res.status(404).send({
            message: 'Dish Not Found',
          });
        }
        return HotelUser.findOne({
          where:{user_id: req.userId, hotel_id:dish.hotel_id}
        }).then(function(hotel_user){
          if(!hotel_user){
            return res.status(403).send("UnAuthorised")
          }
          return dish
            .update({
              name: req.body.name,
            })
            .then(() => res.status(200).send(dish))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Dish
      .findByPk(req.params.id)
      .then(dish => {
        if (!dish) {
          return res.status(400).send({
            message: 'Dish Not Found',
          });
        }
        return HotelUser.findOne({
          where:{user_id: req.userId, hotel_id:dish.hotel_id}
        }).then(function(hotel_user){
          if(!hotel_user){
            return res.status(403).send("UnAuthorised")
          }
          return dish
            .destroy()
            .then(() => res.status(204).send())
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
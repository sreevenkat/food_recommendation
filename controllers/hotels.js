const Hotel = require('../models').Hotel;
const Dish = require('../models').Dish;

module.exports = {
  list(req, res) {
    return Hotel
      .findAll({
        include: [{
          model: Dish,
          as: 'dishes'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Dish, as: 'dishes' }, 'createdAt', 'DESC'],
        ],
      })
      .then((hotels) => res.status(200).send(hotels))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Hotel
      .findById(req.params.id, {
        include: [{
          model: Dish,
          as: 'dishes'
        }],
      })
      .then((hotel) => {
        if (!hotel) {
          return res.status(404).send({
            message: 'Hotel Not Found',
          });
        }
        return res.status(200).send(hotel);
      })
      .catch((error) => res.status(400).send(error));
  },

  addWithDishes(req, res) {
    return Hotel
      .create({
        name: req.body.name,
        dishes: req.body.dishes,
        hotelusers: req.body.users
      }, {
        include: [{
          model: Dish,
          as: 'dishes'
        }]
      })
      .then((hotel) => res.status(201).send(hotel))
      .catch((error) => res.status(400).send(error));
  },
};
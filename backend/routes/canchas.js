var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);


router.get('/', function(req, res, next) {
  models.canchas.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
    .then(canchas => {
        res.json(canchas)
    })
    .catch(error => res.status(400).send(error))
});


router.get('/:canchaId', function(req, res, next) {
  models.canchas.findOne({
      attributes: { exclude: ["updatedAt"] },
      where: {
        id: req.params.canchaId
      }
    })
    .then(cancha => {
      res.json(cancha)
    })
    .catch(error => res.status(400).send(error))
});

router.post('/add', function(req, res, next) {
  var cancha = req.body;
  models.canchas.create({
    nombre: cancha.nombre,
    zona: cancha.zona,
    direccion: cancha.direccion,
    descripcion: cancha.descripcion,
    imgUrl: cancha.imgUrl,
    precio: cancha.precio,
    coordenadas: cancha.coordenadas
  })
    .then(cancha => {
      res.json(cancha)
    })
    .catch(error => res.status(400).send(error))
});

router.patch('/:canchaId', function(req, res, next) {
  var cancha = req.body;
  models.canchas.update({
    nombre: cancha.nombre,
    zona: cancha.zona,
    direccion: cancha.direccion,
    descripcion: cancha.descripcion,
    imgUrl: cancha.imgUrl,
    precio: cancha.precio,
    coordenadas: cancha.coordenadas
  }, {
    where: {
      id: req.params.canchaId
    }
  })
    .then(cancha => {
      res.json(cancha)
    })
    .catch(error => res.status(400).send(error))
});

router.delete('/:canchaId', function(req, res, next) {
  models.canchas.destroy({
      where: {
        id: req.params.canchaId
      }
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
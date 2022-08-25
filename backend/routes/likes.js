var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
models.likes.belongsTo(models.canchas, {foreignKey: 'canchas_id', targetKey: 'id'});
models.likes.belongsTo(models.cuentas, {foreignKey: 'cuentas_id', targetKey: 'id'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.likes.findAll({
      include: [{ model: models.canchas }, { model: models.cuentas }],
      attributes: { exclude: ["canchas_id", "cuentas_id"] }
  })
  .then(likes => {
      res.json(likes)
  })
  .catch(error => res.status(400).send(error))
});

router.get('/cuenta/:canchaId', function(req, res, next) {
  models.likes.findAll({
      include: [{ model: models.canchas }],
      attributes: { exclude: ["canchas_id"] },
      where: {
        canchas_id: req.params.canchaId
      }
  })
  .then(likes => {
      res.json(likes)
  })
  .catch(error => res.status(400).send(error))
});

router.get('/cancha/:canchaId', function(req, res, next) {
    models.likes.findAll({
        include: [{ model: models.cuentas }],
        attributes: { exclude: ["cuentas_id"] },
        where: {
          canchas_id: req.params.canchaId
        }
    })
    .then(likes => {
        res.json(likes)
    })
    .catch(error => res.status(400).send(error))
});

router.post('/add', function(req, res, next) {
  var like = req.body;
  models.likes.create({
    fecha: like.fecha,
    canchas_id: like.cancha.id,
    cuentas_id: like.cuenta.id
  })
    .then(like => {
      res.json(like)
    })
    .catch(error => res.status(400).send(error))
});

router.delete('/:likeId', function(req, res, next) {
  models.likes.destroy({
      where: {
        id: req.params.likeId
      }
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
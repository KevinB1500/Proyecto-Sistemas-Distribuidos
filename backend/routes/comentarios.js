var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
models.comentarios.belongsTo(models.canchas, {foreignKey: 'canchas_id', targetKey: 'id'});
models.comentarios.belongsTo(models.cuentas, {foreignKey: 'cuentas_id', targetKey: 'id'});

/* GET users listing. */
router.get('/cancha/:canchaId', function(req, res, next) {
    models.comentarios.findAll({
        include: [{ model: models.cuentas }],
        attributes: { exclude: ["cuentas_id"] },
        where: {
          canchas_id: req.params.canchaId
        }
    })
    .then(comentarios => {
        res.json(comentarios)
    })
    .catch(error => res.status(400).send(error))
});

router.get('/cuenta/:cuentaId', function(req, res, next) {
  models.comentarios.findAll({
      include: [{ model: models.canchas }],
      attributes: { exclude: ["canchas_id"] },
      where: {
        cuentas_id: req.params.cuentaId
      }
  })
  .then(comentarios => {
      res.json(comentarios)
  })
  .catch(error => res.status(400).send(error))
});

router.post('/add', function(req, res, next) {
  var comentario = req.body;
  models.comentarios.create({
    fecha: comentario.fecha,
    mensaje: comentario.mensaje,
    canchas_id: comentario.cancha.id,
    cuentas_id: comentario.cuenta.id
  })
    .then(comentario => {
      res.json(comentario)
    })
    .catch(error => res.status(400).send(error))
});

router.patch('/:comentarioId', function(req, res, next) {
  var comentario = req.body;
  models.comentarios.update({
    fecha: comentario.fecha,
    mensaje: comentario.mensaje
  }, {
    where: {
      id: req.params.comentarioId
    }
  })
    .then(comentario => {
      res.json(comentario)
    })
    .catch(error => res.status(400).send(error))
});

router.delete('/:comentarioId', function(req, res, next) {
  models.comentarios.destroy({
      where: {
        id: req.params.comentarioId
      }
    })
    .then(response => {
      res.json(response)
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;
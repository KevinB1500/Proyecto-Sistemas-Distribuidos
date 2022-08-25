var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET users listing. */
router.get('/', function (req, res, next) {
  models.cuentas.findAll({
    attributes: { exclude: ["clave"] }
  })
    .then(cuentas => {
      res.json(cuentas)
    })
    .catch(error => res.status(400).send(error))
});

router.post('/validate', function (req, res, next) {
  models.cuentas.findOne({
    attributes: {},
    where: {
      usuario: req.body.usuario,
      clave: req.body.clave
    }
  })
    .then(cuenta => {
      //req.session.usuario = cuenta.usuario;
      //req.session.nombre = cuenta.nombre;
      res.cookie('idUsuario',cuenta.id , {expire : new Date() + 9999});
      res.cookie('nombre',cuenta.nombre , {expire : new Date() + 9999});
      res.cookie('tipo',cuenta.tipo , {expire : new Date() + 9999});
      if (cuenta.tipo === "administrador") {
        res.send({ redirect: "/admin" })
      } else if(cuenta.tipo === "usuario") {
        res.send({ redirect: "/" })
      }
      //req.session = null;
      //res.cookie('usuario', '', {expires: new Date(0)});
      //res.cookie('nombre', '', {expires: new Date(0)});

    })
    .catch(error => {
      res.status(400).send(error)
    })
});

router.get('/:cuentaId', function (req, res, next) {
  models.cuentas.findOne({
    attributes: { exclude: ["clave"] },
    where: {
      id: req.params.cuentaId
    }
  })
    .then(cuenta => {
      res.json(cuenta)
    })
    .catch(error => res.status(400).send(error))
});



router.post('/add', function (req, res, next) {
  var cuenta = req.body;
  models.cuentas.create({
    usuario: cuenta.usuario,
    correo: cuenta.correo,
    clave: cuenta.clave,
    tipo: cuenta.tipo,
    nombre: cuenta.nombre,
    telefono: cuenta.telefono
  })
    .then(cuenta => {
      res.json(cuenta)
    })
    .catch(error => res.status(400).send(error))
});

router.patch('/:cuentaId', function (req, res, next) {
  var cuenta = req.body;
  models.cuentas.update({
    usuario: cuenta.usuario,
    correo: cuenta.correo,
    clave: cuenta.clave,
    nombre: cuenta.nombre,
    telefono: cuenta.telefono
  }, {
    where: {
      id: req.params.cuentaId
    }
  })
    .then(cuenta => {
      res.json(cuenta)
    })
    .catch(error => res.status(400).send(error))
});

router.delete('/:cuentaId', function (req, res, next) {
  models.comentarios.destroy({
    where: {
      id: req.params.cuentaId
    }
  })
    .then(response => {
      res.json(response)
    })
    .catch(error => res.status(400).send(error))
});

module.exports = router;

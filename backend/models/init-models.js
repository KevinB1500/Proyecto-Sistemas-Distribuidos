var DataTypes = require("sequelize").DataTypes;
var _canchas = require("./canchas");
var _comentarios = require("./comentarios");
var _cuentas = require("./cuentas");
var _likes = require("./likes");

function initModels(sequelize) {
  var canchas = _canchas(sequelize, DataTypes);
  var comentarios = _comentarios(sequelize, DataTypes);
  var cuentas = _cuentas(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);

  comentarios.belongsTo(canchas, { as: "cancha", foreignKey: "canchas_id"});
  canchas.hasMany(comentarios, { as: "comentarios", foreignKey: "canchas_id"});
  likes.belongsTo(canchas, { as: "cancha", foreignKey: "canchas_id"});
  canchas.hasMany(likes, { as: "likes", foreignKey: "canchas_id"});
  comentarios.belongsTo(cuentas, { as: "cuenta", foreignKey: "cuentas_id"});
  cuentas.hasMany(comentarios, { as: "comentarios", foreignKey: "cuentas_id"});
  likes.belongsTo(cuentas, { as: "cuenta", foreignKey: "cuentas_id"});
  cuentas.hasMany(likes, { as: "likes", foreignKey: "cuentas_id"});

  return {
    canchas,
    comentarios,
    cuentas,
    likes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

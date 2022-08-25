const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cuentas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    correo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    clave: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cuentas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

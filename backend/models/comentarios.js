const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    mensaje: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cuentas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuentas',
        key: 'id'
      }
    },
    canchas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'canchas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'comentarios',
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
      {
        name: "fk_comentarios_cuentas1_idx",
        using: "BTREE",
        fields: [
          { name: "cuentas_id" },
        ]
      },
      {
        name: "fk_comentarios_canchas1_idx",
        using: "BTREE",
        fields: [
          { name: "canchas_id" },
        ]
      },
    ]
  });
};

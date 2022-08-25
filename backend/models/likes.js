const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes', {
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
    canchas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'canchas',
        key: 'id'
      }
    },
    cuentas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cuentas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'likes',
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
        name: "fk_likes_canchas1_idx",
        using: "BTREE",
        fields: [
          { name: "canchas_id" },
        ]
      },
      {
        name: "fk_likes_cuentas1_idx",
        using: "BTREE",
        fields: [
          { name: "cuentas_id" },
        ]
      },
    ]
  });
};

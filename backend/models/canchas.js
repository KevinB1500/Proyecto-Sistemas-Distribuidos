const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('canchas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    zona: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    coordenadas: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'canchas',
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

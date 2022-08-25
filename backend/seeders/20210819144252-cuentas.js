'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cuentas = [
      {
        "usuario": "xpgarcia",
        "clave": "xpgarcia",
        "correo": "xpgarcia@espol.edu.ec",
        "tipo": "administrador",
        "nombre": "Xavier García",
        "telefono": "0992859362"
      },
      {
        "usuario": "garciaxa",
        "clave": "garciaxa",
        "correo": "garciaxa@espol.edu.ec",
        "tipo": "usuario",
        "nombre": "Patricio Baño",
        "telefono": "0992849062"
      },
      {
        "usuario": "mrcheems",
        "clave": "mrcheems",
        "correo": "mrcheems@espol.edu.ec",
        "tipo": "usuario",
        "nombre": "José Delgado",
        "telefono": "0989569362"
      },
      {
        "usuario": "tester",
        "clave": "tester",
        "correo": "tester@espol.edu.ec",
        "tipo": "administrador",
        "nombre": "Testing Tester",
        "telefono": "0992851236"
      }
    ];
    for (let cuenta of cuentas) {
      await queryInterface.bulkInsert('Cuentas', [{
        usuario: cuenta.usuario,
        clave: cuenta.clave,
        correo: cuenta.correo,
        tipo: cuenta.tipo,
        nombre: cuenta.nombre,
        telefono: cuenta.telefono
      }], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let j = 1; j <= 4; j++) {
      const randomIndex = Math.floor(Math.random() * 14) + 1;
      for (let k = randomIndex; k <= 14; k++) {
        await queryInterface.bulkInsert('Comentarios', [{
          fecha: new Date(),
          mensaje: `Un comentario sobre la cancha con id: ${k}, de parte del usuario con id: ${j}`,
          canchas_id: k,
          cuentas_id: j
        }], {});
      }
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

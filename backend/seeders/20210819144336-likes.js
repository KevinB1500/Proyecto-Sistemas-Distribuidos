'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let j = 1; j <= 4; j++) {
      const randomIndex = Math.floor(Math.random() * 14) + 1;
      for (let k = randomIndex; k <= 14; k++) {
        await queryInterface.bulkInsert('Likes', [{
          fecha: new Date(),
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

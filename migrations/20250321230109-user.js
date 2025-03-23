'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [queryInterface.addColumn(
      'users',
      'is_valid',
      Sequelize.BOOLEAN
    ),
    queryInterface.addColumn(
      'users',
      'token',
      Sequelize.TEXT
    )];
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'ducanh@gmail.com',
      password: '123',
      firstName: 'Duc Anh',
      lastName: 'Ngo',
      address: '1 Dai Co Viet',
      phonenumber: '0123456789',
      gender: true,
      image: null,
      roleId: null,
      positionId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cities', 'region_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'regions', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  down: queryInterface => queryInterface.removeColumn('cities', 'region_id'),
};

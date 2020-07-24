module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cities', 'uf_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'ufs', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  },

  down: queryInterface => queryInterface.removeColumn('cities', 'uf_id'),
};

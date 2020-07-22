import { Model, DataTypes } from 'sequelize';

class City extends Model {
  static init(sequelize) {
    super.init(
      {
        ibge: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        nome_cidade: DataTypes.STRING,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Uf, { foreignKey: 'uf_id', as: 'state' });
    this.belongsTo(models.Region, { foreignKey: 'region_id', as: 'zone' });
  }
}

export default City;

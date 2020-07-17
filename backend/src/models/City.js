import { Model, DataTypes } from 'sequelize';

class City extends Model {
  static init(sequelize) {
    super.init(
      {
        ibge: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        uf: DataTypes.STRING,
        nome_cidade: DataTypes.STRING,
        longitude: DataTypes.STRING,
        latitude: DataTypes.STRING,
        regiao: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

export default City;

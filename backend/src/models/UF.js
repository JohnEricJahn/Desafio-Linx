import { Model, DataTypes } from 'sequelize';

class Uf extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.City, { foreignKey: 'uf_id' });
  }
}

export default Uf;

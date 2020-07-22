import { Model, DataTypes, Sequelize } from 'sequelize';

class Region extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

export default Region;

import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import City from '../models/City';
import Region from '../models/Region';
import Uf from '../models/Uf';

const connection = new Sequelize(dbConfig);

City.init(connection);
Region.init(connection);
Uf.init(connection);

City.associate(connection.models);
Region.associate(connection.models);
Uf.associate(connection.models);

export default connection;

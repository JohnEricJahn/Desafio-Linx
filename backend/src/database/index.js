import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import City from '../models/City';

const connection = new Sequelize(dbConfig);

City.init(connection);

export default connection;

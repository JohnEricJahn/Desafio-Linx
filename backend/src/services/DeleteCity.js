import City from '../models/City';
import AppError from '../errors/AppError';

class DeleteCityService {
  async execute(ibge) {
    const city = await City.findByPk(ibge);

    if (!city) throw new AppError('This city not exist.');

    await city.destroy();
  }
}

export default DeleteCityService;

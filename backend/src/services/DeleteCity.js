import City from '../models/City';

class DeleteCityService {
  async execute(ibge) {
    const city = await City.findByPk(ibge);

    if (!city) throw new Error('This city not exist.');

    await city.destroy();
  }
}

export default DeleteCityService;

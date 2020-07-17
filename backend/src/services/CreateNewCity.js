import City from '../models/City';
import AppError from '../errors/AppError';

class CreateNewCity {
  async execute(ibge, uf, nome_cidade, longitude, latitude, regiao) {
    const checkCityWithSameIBGE = await City.findByPk(ibge);

    if (checkCityWithSameIBGE)
      throw new AppError('Already exists a city with the same IBGE.');

    const checkCityWithTheSameName = await City.findAll({
      where: {
        nome_cidade,
        uf,
      },
    });

    if (checkCityWithTheSameName.length !== 0)
      throw new AppError('Already exists a city with the same Name and UF');

    const city = await City.create({
      ibge,
      uf,
      nome_cidade,
      longitude,
      latitude,
      regiao,
    });

    return city;
  }
}

export default CreateNewCity;

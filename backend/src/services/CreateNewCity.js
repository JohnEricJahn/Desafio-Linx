import City from '../models/City';
import UF from '../models/Uf';
import Region from '../models/Region';
import AppError from '../errors/AppError';

class CreateNewCity {
  async execute(ibge, uf, nome_cidade, longitude, latitude, regiao) {
    const checkCityWithSameIBGE = await City.findByPk(ibge);
    if (checkCityWithSameIBGE)
      throw new AppError('Already exists a city with this IBGE.');

    const [createdUF] = await UF.findOrCreate({
      where: { name: uf },
    });

    const [createdRegion] = await Region.findOrCreate({
      where: { name: regiao },
    });

    const { id: uf_id } = createdUF;
    const { id: region_id } = createdRegion;

    const checkCityWithTheSameName = await City.findAll({
      where: {
        nome_cidade,
        uf_id,
      },
    });
    if (checkCityWithTheSameName.length !== 0)
      throw new AppError('Already exists a city with this Name and UF');

    await City.create({
      ibge,
      nome_cidade,
      longitude,
      latitude,
      uf_id,
      region_id,
    });
  }
}

export default CreateNewCity;

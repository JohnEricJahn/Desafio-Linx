import City from '../models/City';
import UF from '../models/Uf';
import Region from '../models/Region';

class CreateNewCity {
  async execute(ibge, nome_cidade, uf_id, longitude, latitude, region_id) {
    await City.create({
      ibge,
      nome_cidade,
      longitude,
      latitude,
      uf_id,
      region_id,
    });
  }

  async handleExceptions(ibge, nome_cidade, uf_id) {
    const checkCityWithSameIBGE = await City.findByPk(ibge);

    if (checkCityWithSameIBGE)
      throw new Error('Already exists a city with this IBGE.');

    const checkCityWithTheSameName = await City.findAll({
      where: {
        nome_cidade,
        uf_id,
      },
    });

    if (checkCityWithTheSameName.length !== 0)
      throw new Error('Already exists a city with this Name and UF');
  }

  async checkingUfAndRegion(uf, regiao) {
    const [checkedUf] = await UF.findOrCreate({
      where: { name: uf },
    });

    const [checkedRegion] = await Region.findOrCreate({
      where: { name: regiao },
    });

    const { id: uf_id } = checkedUf;
    const { id: region_id } = checkedRegion;

    return [uf_id, region_id];
  }
}

export default CreateNewCity;

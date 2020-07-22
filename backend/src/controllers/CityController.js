import City from '../models/City';

import CreateNewCityService from '../services/CreateNewCity';
import DeleteCityService from '../services/DeleteCity';
import ImportCitiesService from '../services/ImportCities';

class UserController {
  async index(req, res) {
    const listCities = await City.findAll({
      attributes: [
        'ibge',
        'uf',
        'nome_cidade',
        'longitude',
        'latitude',
        'regiao',
      ],
    });

    return res.json(listCities);
  }

  async store(req, res) {
    const { ibge, uf, nome_cidade, longitude, latitude, regiao } = req.body;

    const createNewCityService = new CreateNewCityService();

    await createNewCityService.execute(
      ibge,
      uf,
      nome_cidade,
      longitude,
      latitude,
      regiao,
    );

    return res.status(200).send();
  }

  async import(req, res) {
    const importCities = new ImportCitiesService();

    const cities = await importCities.execute(req.file.path);

    return res.status(200).json(cities);
  }

  async delete(req, res) {
    const { ibge } = req.params;

    const deleteCityService = new DeleteCityService();

    await deleteCityService.execute(ibge);

    return res.send();
  }
}

export default new UserController();

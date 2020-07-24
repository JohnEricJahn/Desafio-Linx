import ListCitiesService from '../services/ListCities';
import CreateNewCityService from '../services/CreateNewCity';
import DeleteCityService from '../services/DeleteCity';
import ImportCitiesService from '../services/ImportCities';

class UserController {
  async index(req, res) {
    const { nome_cidade } = req.query;

    const listCitiesService = new ListCitiesService();

    const listCities = await listCitiesService.execute(nome_cidade);

    return res.json(listCities);
  }

  async store(req, res) {
    try {
      const { ibge, uf, nome_cidade, longitude, latitude, regiao } = req.body;

      const createNewCityService = new CreateNewCityService();

      const [uf_id, region_id] = await createNewCityService.checkingUfAndRegion(
        uf,
        regiao,
      );

      await createNewCityService.handleExceptions(ibge, nome_cidade, uf_id);

      await createNewCityService.execute(
        ibge,
        nome_cidade,
        uf_id,
        longitude,
        latitude,
        region_id,
      );

      return res.status(200).send();
    } catch (e) {
      return res.status(400).json({ message: e.toString() });
    }
  }

  async import(req, res) {
    try {
      const importCities = new ImportCitiesService();

      const cities = await importCities.execute(req.file.path);

      return res.status(200).json(cities);
    } catch (e) {
      return res.status(400).json({ message: e.toString() });
    }
  }

  async delete(req, res) {
    const { ibge } = req.params;

    const deleteCityService = new DeleteCityService();

    await deleteCityService.execute(ibge);

    return res.send();
  }
}

export default new UserController();

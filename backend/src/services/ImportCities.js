import csvParse from 'csv-parse';
import fs from 'fs';

import City from '../models/City';
import CreateNewCityService from './CreateNewCity';

class ImportCitiesService {
  async execute(filePath) {
    const createNewCityService = new CreateNewCityService();

    const citiesReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      delimiter: ';',
      from_line: 2,
    });

    const parseCsv = citiesReadStream.pipe(parsers);

    const cities = [];

    parseCsv.on('data', async line => {
      const [
        ibge,
        uf,
        nome_cidade,
        longitude,
        latitude,
        regiao,
      ] = line.map(cell => cell.trim());

      if (!ibge || !uf || !nome_cidade || !longitude || !latitude || !regiao)
        throw new Error('You must to send all data.');

      cities.push({ ibge, uf, nome_cidade, longitude, latitude, regiao });
    });

    await new Promise(resolve => parseCsv.on('end', resolve));

    cities.map(async city => {
      const { ibge, uf, nome_cidade, longitude, latitude, regiao } = city;

      const checkCityWithSameIBGE = await City.findByPk(ibge);
      if (checkCityWithSameIBGE) return;

      const [uf_id, region_id] = await createNewCityService.checkingUfAndRegion(
        uf,
        regiao,
      );

      const checkCityWithTheSameName = await City.findAll({
        where: {
          nome_cidade,
          uf_id,
        },
      });
      if (checkCityWithTheSameName.length !== 0) return;

      await createNewCityService.execute(
        ibge,
        nome_cidade,
        uf_id,
        longitude,
        latitude,
        region_id,
      );
    });

    await fs.promises.unlink(filePath);

    return cities;
  }
}

export default ImportCitiesService;

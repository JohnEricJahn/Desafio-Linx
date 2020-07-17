import csvParse from 'csv-parse';
import fs from 'fs';
import City from '../models/City';
import AppError from '../errors/AppError';

class ImportCitiesService {
  async execute(filePath) {
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
        throw new AppError('You must to send all data.');

      cities.push({ ibge, uf, nome_cidade, longitude, latitude, regiao });
    });

    await new Promise(resolve => parseCsv.on('end', resolve));

    cities.map(async city => {
      const { ibge, uf, nome_cidade, longitude, latitude, regiao } = city;

      await City.create({ ibge, uf, nome_cidade, longitude, latitude, regiao });
    });

    await fs.promises.unlink(filePath);

    return cities;
  }
}

export default ImportCitiesService;

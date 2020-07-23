import { Op } from 'sequelize';
import City from '../models/City';
import Uf from '../models/Uf';
import Region from '../models/Region';

class ListCitiesService {
  async execute(nome_cidade) {
    let listCities = [];

    if (nome_cidade) {
      listCities = await City.findAll({
        attributes: ['ibge', 'nome_cidade', 'longitude', 'latitude'],
        include: [
          {
            model: Uf,
            attributes: ['name'],
          },
          {
            model: Region,
            attributes: ['name'],
          },
        ],
        where: {
          nome_cidade: {
            [Op.like]: `%${nome_cidade}%`,
          },
        },
      });

      return listCities;
    }

    listCities = await City.findAll({
      attributes: ['ibge', 'nome_cidade', 'longitude', 'latitude'],
      include: [
        {
          model: Uf,
          attributes: ['name'],
        },
        {
          model: Region,
          attributes: ['name'],
        },
      ],
    });

    return listCities;
  }
}

export default ListCitiesService;

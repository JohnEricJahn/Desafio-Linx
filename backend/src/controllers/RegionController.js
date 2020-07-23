import Region from '../models/Region';

class RegionController {
  async index(req, res) {
    const listStates = await Region.findAll({
      attributes: ['name'],
    });

    if (listStates.length === 0) return res.json('0');

    return res.json(listStates);
  }
}

export default new RegionController();

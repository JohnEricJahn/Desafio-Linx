import UF from '../models/Uf';

class UFController {
  async index(req, res) {
    const listStates = await UF.findAll({
      attributes: ['name'],
    });

    if (listStates.length === 0) return res.json('0');

    return res.json(listStates);
  }
}

export default new UFController();

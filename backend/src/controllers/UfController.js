import Uf from '../models/Uf';

class UFController {
  async index(req, res) {
    const listUfs = await Uf.findAll({
      attributes: ['name'],
    });

    if (listUfs.length === 0) return res.json('0');

    return res.json(listUfs);
  }
}

export default new UFController();

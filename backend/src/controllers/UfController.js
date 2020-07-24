import Uf from '../models/Uf';

class UFController {
  async index(req, res) {
    const listUfs = await Uf.findAll();

    if (listUfs.length === 0) return res.json([]);

    return res.json(listUfs);
  }
}

export default new UFController();

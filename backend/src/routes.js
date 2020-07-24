import multer from 'multer';
import { Router } from 'express';

import uploadConfig from './config/upload';

import cityController from './controllers/CityController';
import ufController from './controllers/UfController';
import RegionController from './controllers/RegionController';

const upload = multer(uploadConfig);

const routes = Router();

routes.get('/cities', cityController.index);
routes.post('/cities', cityController.store);
routes.delete('/cities/:ibge', cityController.delete);
routes.post('/cities/import', upload.single('file'), cityController.import);

routes.get('/ufs', ufController.index);
routes.get('/regions', RegionController.index);

export default routes;

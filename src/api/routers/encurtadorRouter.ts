import { Router } from 'express';
import EncurtadorController from '../controllers/encurtadorController';

const router = Router();
const encurtadorController = new EncurtadorController();

router.post('/encurtador', encurtadorController.encurtarUrl);

router.get('/:newUrl', encurtadorController.getUrl);

export default router;
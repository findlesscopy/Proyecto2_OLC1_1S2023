import express from 'express';
import { controller } from '../controllers/controller';
const router = express.Router();

router.get('/ping', controller.pong);

router.post('/interpretar', controller.interpretar);

router.get('/tablaSimbolos', controller.tablaSimbolos);

export default router;
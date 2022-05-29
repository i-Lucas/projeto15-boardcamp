import { Router } from 'express';

import { GetGamesController, PostGamesController } from '../controllers/games.js';
import { GetGamesMiddleware, PostGamesMiddleware } from '../middlewares/games.js';

const GamesRouter = Router();

GamesRouter.get('/games', GetGamesMiddleware, GetGamesController);
GamesRouter.post('/games', PostGamesMiddleware, PostGamesController);

export default GamesRouter;
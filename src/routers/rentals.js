import { Router } from 'express';

import { PostRentalController, GetRentalsController } from '../controllers/rentals.js';
import { PostRentalMiddleware } from '../middlewares/rentals.js';

const RentalsRouter = Router();

RentalsRouter.post('/rentals', PostRentalMiddleware, PostRentalController);
RentalsRouter.get('/rentals', GetRentalsController);

export default RentalsRouter;
import { Router } from 'express';

import { GetRentalsController } from '../controllers/rentals.js';

const RentalsRouter = Router();

RentalsRouter.get('/rentals', GetRentalsController);


export default RentalsRouter;
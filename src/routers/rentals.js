import { Router } from 'express';

import {

    PostRentalController,
    GetRentalsController,
    FinalizeRentController,
    DeleteRentalController

} from '../controllers/rentals.js';

import { PostRentalMiddleware } from '../middlewares/rentals.js';

const RentalsRouter = Router();

RentalsRouter.post('/rentals', PostRentalMiddleware, PostRentalController);
RentalsRouter.get('/rentals', GetRentalsController);
RentalsRouter.post('/rentals/:id/return', FinalizeRentController);
RentalsRouter.delete('/rentals/:id', DeleteRentalController);

export default RentalsRouter;
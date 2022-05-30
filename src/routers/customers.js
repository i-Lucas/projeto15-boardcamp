import { Router } from 'express';

import {

    GetCustomersController,
    PostCustomersController,
    PutCustomersController

} from '../controllers/customers.js';

import { PostCustomersMiddleware } from '../middlewares/customers.js';

const CustomersRouter = Router();

CustomersRouter.get('/customers', GetCustomersController);
CustomersRouter.get('/customers/:id', GetCustomersController);
CustomersRouter.post('/customers', PostCustomersMiddleware, PostCustomersController);
CustomersRouter.put('/customers/:id', PostCustomersMiddleware, PutCustomersController);

export default CustomersRouter;
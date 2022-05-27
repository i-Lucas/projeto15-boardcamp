import { Router } from 'express';

import { GetCategoriesController, PostCategoriesController } from '../controllers/categories.js';
import { GetCategoriesMiddleware, PostCategoriesMiddleware } from '../middlewares/categories.js';

const categoriesRouter = Router();

categoriesRouter.get("/categories", GetCategoriesMiddleware, GetCategoriesController);
categoriesRouter.post("/categories", PostCategoriesMiddleware, PostCategoriesController);

export default categoriesRouter;
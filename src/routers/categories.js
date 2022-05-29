import { Router } from 'express';

import { GetCategoriesController, PostCategoriesController } from '../controllers/categories.js';
import { GetCategoriesMiddleware, PostCategoriesMiddleware } from '../middlewares/categories.js';

const CategoriesRouter = Router();

CategoriesRouter.get("/categories", GetCategoriesMiddleware, GetCategoriesController);
CategoriesRouter.post("/categories", PostCategoriesMiddleware, PostCategoriesController);

export default CategoriesRouter;
import { PostCategoriesSchema } from '../schemas/categories.js';

export function GetCategoriesMiddleware(req, res, next) {

    console.log('GetCategoriesMiddleware');
    next();
}

export function PostCategoriesMiddleware(req, res, next) {

    console.log('PostCategoriesMiddleware');

    const { error } = PostCategoriesSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}
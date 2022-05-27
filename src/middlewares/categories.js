//import { LoginSchema, RegisterSchema } from '../schemas/authorization.js';

export function GetCategoriesMiddleware(req, res, next) {

    console.log('GetCategoriesMiddleware');

    //const { error } = LoginSchema.validate(req.body, { abortEarly: false });
    //if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}

export function PostCategoriesMiddleware(req, res, next) {

    console.log('PostCategoriesMiddleware');

    //const { error } = RegisterSchema.validate(req.body, { abortEarly: false });
    //if (error) return res.status(422).send((error.details.map(detail => detail.message)));

    next();
}
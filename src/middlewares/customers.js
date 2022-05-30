import { PostCustomersSchema } from '../schemas/customers.js';

export function PostCustomersMiddleware(req, res, next) {

    const { error } = PostCustomersSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
    
    next();
}
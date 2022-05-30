import { PostRentalSchema } from '../schemas/rentals.js';

export function PostRentalMiddleware(req, res, next) {

    const { error } = PostRentalSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
    next();
}

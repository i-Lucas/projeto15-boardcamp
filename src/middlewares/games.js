import { PostGamesSchema } from '../schemas/games.js';

export function GetGamesMiddleware(req, res, next) {

    next();
}

export function PostGamesMiddleware(req, res, next) {

    const { error } = PostGamesSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
    next();
}
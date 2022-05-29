import joi from 'joi';

export const PostCategoriesSchema = joi.object({ name: joi.string().min(3).required() });




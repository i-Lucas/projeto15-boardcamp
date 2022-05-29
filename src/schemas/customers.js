import joi from 'joi';

export const PostCustomersSchema = joi.object().keys({

    id: joi.number(),
    name: joi.string().min(3).max(15).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.string().required()

});
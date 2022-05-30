import joi from 'joi';

export const PostRentalSchema = joi.object({

    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required()
    
});
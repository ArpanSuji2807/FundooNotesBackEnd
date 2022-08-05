import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const NoteValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Description: Joi.string().required(),
        Color: Joi.string().allow(''),
        isArchived: Joi.boolean().optional().allow(false),

    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    } else {
        next();
    }
};

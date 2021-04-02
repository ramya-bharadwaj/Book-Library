const Joi = require('joi');
const messageCode = require('./messageCode');

const bookValidation = async (req, res, next) => {
    const schema = Joi.object({
        book: Joi.string().required()
    });

    const { error, value } = await schema.validate(req.body, { abortEarly: false });
    if(error !== undefined) {
        next({
            status: 422,
            code: messageCode.VALIDATION_ERROR.code,
            message: error.message
        })
    }
    next()
}

const updateBookValidation = async (req, res, next) => {
    const schema = Joi.object({
        original_book: Joi.string().required(),
        new_book: Joi.string().required()
    });

    const { error, value } = await schema.validate(req.body, { abortEarly: false });
    if(error !== undefined) {
        next({
            status: 422,
            code: messageCode.VALIDATION_ERROR.code,
            message: error.message
        })
    }
    next()
}

module.exports = { bookValidation, updateBookValidation }
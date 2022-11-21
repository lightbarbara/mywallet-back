import joi from 'joi'

export const userSignUpSchema = joi.object({
    name: joi.string().required().max(30),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
})

export const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
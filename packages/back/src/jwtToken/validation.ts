import * as Joi from "@hapi/joi";

export const registerValidation = (data: any) => {
    const schema = Joi.object({
        player_name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data, { debug: true });
};

export const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data, { debug: true });
};
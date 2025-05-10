import Joi from "joi";
import { typeList } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "any.required": "Name is required",
        "string.base": 'Name should be a string',
        "string.min": "Name should nave at least 3 characters",
        "string.max": "Name should have at most 20 characters",
    }),
    phoneNumber: Joi.number().required().messages({
        "any.required": "Phone number is required",
        "string.base": 'Phone number should be a number',
    }),
    email: Joi.string().email().min(3).max(20).messages({
        "string.min": "Email should nave at least 3 characters",
        "string.max": "Email should have at most 20 characters",
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.number(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
});
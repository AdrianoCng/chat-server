import { body } from "express-validator";

export default [
    body("username")
        .exists()
        .not()
        .isEmpty()
        .withMessage("username is required")
        .isString()
        .escape(),
    body("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
        })
        .withMessage("Password does not meet requirements"),
];

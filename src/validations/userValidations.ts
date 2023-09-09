import { body } from "express-validator";

export default [
    body("email").exists().not().isEmpty().withMessage("email is required").isEmail().trim(),
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

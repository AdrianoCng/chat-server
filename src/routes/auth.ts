import { Router } from "express";

import validate from "@middlewares/validate";
import userValidations from "@validations/userValidations";
import authControllers from "@controllers/authControllers";

const authRouter = Router();

authRouter.post("/register", validate(userValidations), authControllers.register);

export default authRouter;

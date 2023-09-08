import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
    res.send("ok");
});

export default authRouter;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import router from "@routes/index";
import errorHandler from "@middlewares/errorHandler";
import session from "express-session";
import passport from "passport";
import initializePassportConfig from "@configs/passport";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET ?? "",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);

app.use(errorHandler);

initializePassportConfig();

export default app;

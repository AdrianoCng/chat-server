import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import router from "@routes/index";
import errorHandler from "@middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use(errorHandler);

export default app;

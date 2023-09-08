import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1", router);

export default app;

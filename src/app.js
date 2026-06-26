import cors from "cors"
import express from "express"

import authRoutes from "./routes/AuthRoutes.js"

import errorHandler from "./core/ErrorHandler.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended: true
}))

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app
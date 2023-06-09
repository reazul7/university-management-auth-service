import cors from "cors";
import express, { Application } from "express";
import { UserRoutes } from "./app/modules/users/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", UserRoutes);

// testing
// app.get("/", async(req, res, next) => {
//     Promise.reject(new Error ("Unhandled Promise Rejection"))
// })

// global error handler
app.use(globalErrorHandler);

export default app;

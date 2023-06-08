import express, { Application } from "express";
import cors from "cors";
import usersRouter from "./app/modules/users/users.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users/", usersRouter);
// app.get("/", async (req: Request, res: Response) => {
//   res.send("Working Successfully");
// });

// global error handler
app.use(globalErrorHandler);

export default app;

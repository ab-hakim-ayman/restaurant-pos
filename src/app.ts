import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

const origin = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://aic-pos-restaurant.vercel.app",
  "https://aic-pos-restaurant-dashboard.vercel.app",
];

// parsers
app.use(express.json());
app.use(
  cors({
    origin,
    credentials: true,
  }),
);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "The server is running",
  });
});

// global error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

export default app;

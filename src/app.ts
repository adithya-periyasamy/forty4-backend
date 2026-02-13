import express, { type Response } from "express";

import UserRouter from "./routes/user.route.js";

import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : "*",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (res: Response) => {
  res.json({ message: "server is running" });
});

app.use("/api/users", UserRouter);

app.use((res: Response) => {
  res.status(404).json("Route not found");
});

export default app;

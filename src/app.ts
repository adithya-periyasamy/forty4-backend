import express from "express";

const app = express();

app.use(express.json());

// health check / root route

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

// 404 handler / catch-all route

app.use((req, res) => {
  res.status(404).json("Route not found");
});

export default app;

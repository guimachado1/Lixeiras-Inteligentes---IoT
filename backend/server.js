// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import binsRoutes from "./src/routes/bins.routes.js";
import telemetryRoutes from "./src/routes/telemetry.routes.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bins", binsRoutes);
app.use("/api/telemetry", telemetryRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`API Smart Bin rodando em http://localhost:${PORT}`)
  );
});

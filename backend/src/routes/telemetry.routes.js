// src/routes/telemetry.routes.js
import { Router } from "express";
import { Bin } from "../models/Bin.js";
import { Telemetry } from "../models/Telemetry.js";

const router = Router();

/**
 * POST /api/telemetry
 * {
 *   "deviceId": "lixeira-esp32-01",
 *   "distance_cm": 12.34,
 *   "fill_percent": 36,
 *   "state": "parcial"
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { deviceId, distance_cm, fill_percent, state } = req.body;

    if (!deviceId || typeof fill_percent !== "number") {
      return res
        .status(400)
        .json({ message: "deviceId e fill_percent são obrigatórios" });
    }

    const bin = await Bin.findOne({ deviceId });
    if (!bin) {
      return res.status(404).json({ message: "Lixeira (deviceId) não encontrada" });
    }

    bin.fillPercent = fill_percent;
    bin.state = state;
    bin.status = "online";
    bin.lastUpdate = new Date();
    await bin.save();

    await Telemetry.create({
      bin: bin._id,
      deviceId,
      distance_cm,
      fill_percent,
      state
    });

    res.json({
      message: "Telemetria recebida com sucesso",
      bin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno" });
  }
});

export default router;

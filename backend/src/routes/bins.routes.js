// src/routes/bins.routes.js
import { Router } from "express";
import { Bin } from "../models/Bin.js";

const router = Router();

router.get("/", async (req, res) => {
  const bins = await Bin.find().lean();
  res.json(bins);
});

router.get("/:id", async (req, res) => {
  const bin = await Bin.findById(req.params.id).lean();
  if (!bin) return res.status(404).json({ message: "Lixeira não encontrada" });
  res.json(bin);
});

router.post("/", async (req, res) => {
  try {
    const { name, location, campus, deviceId, priority = 1 } = req.body;

    const bin = await Bin.create({
      name,
      location,
      campus,
      deviceId,
      priority
    });

    res.status(201).json(bin);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erro ao criar lixeira", detail: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const bin = await Bin.findByIdAndDelete(req.params.id).lean();
  if (!bin) return res.status(404).json({ message: "Lixeira não encontrada" });
  res.json(bin);
});

export default router;

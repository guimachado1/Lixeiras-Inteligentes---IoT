// src/models/Bin.js
import mongoose from "mongoose";

const BinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  campus: { type: String, default: "Campus Joinville" },
  deviceId: { type: String, required: true, unique: true },
  priority: { type: Number, default: 1 },
  status: { type: String, enum: ["online", "offline"], default: "offline" },
  fillPercent: { type: Number, default: 0 },
  state: { type: String }, // vazia/parcial/cheia
  lastUpdate: { type: Date, default: null }
});

export const Bin = mongoose.model("Bin", BinSchema);

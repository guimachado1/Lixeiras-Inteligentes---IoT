import mongoose from "mongoose";

const TelemetrySchema = new mongoose.Schema({
  bin: { type: mongoose.Schema.Types.ObjectId, ref: "Bin" },
  deviceId: { type: String, required: true },
  distance_cm: { type: Number },
  fill_percent: { type: Number },
  state: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Telemetry = mongoose.model("Telemetry", TelemetrySchema);

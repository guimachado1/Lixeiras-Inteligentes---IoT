// src/routes/dashboard.routes.js
import { Router } from "express";
import { Bin } from "../models/Bin.js";

const router = Router();

const thresholds = {
  full: 90,
  overloaded: 95,
  offlineMinutes: 10
};

router.get("/", async (req, res) => {
  const { filter = "all", orderBy = "priority" } = req.query;

  // 1) busca todas as lixeiras do campus (pode receber campus por query se quiser)
  let binsQuery = {};
  const allBins = await Bin.find(binsQuery).lean();

  const now = Date.now();
  const offlineMs = thresholds.offlineMinutes * 60 * 1000;

  // recalcula status offline em memória (se quiser, pode persistir depois)
  let bins = allBins.map((b) => {
    let status = b.status;
    if (b.lastUpdate) {
      const diff = now - new Date(b.lastUpdate).getTime();
      if (diff > offlineMs) status = "offline";
    }
    return { ...b, status };
  });

  // helpers de data
  const isToday = (d) => {
    if (!d) return false;
    d = new Date(d);
    const t = new Date();
    return (
      d.getFullYear() === t.getFullYear() &&
      d.getMonth() === t.getMonth() &&
      d.getDate() === t.getDate()
    );
  };

  const isYesterday = (d) => {
    if (!d) return false;
    d = new Date(d);
    const y = new Date();
    y.setDate(y.getDate() - 1);
    return (
      d.getFullYear() === y.getFullYear() &&
      d.getMonth() === y.getMonth() &&
      d.getDate() === y.getDate()
    );
  };

  // 2) filtro (Todos / Hoje / Ontem / Parcial / Offline)
  if (filter === "today") {
    bins = bins.filter((b) => isToday(b.lastUpdate));
  } else if (filter === "yesterday") {
    bins = bins.filter((b) => isYesterday(b.lastUpdate));
  } else if (filter === "partial") {
    bins = bins.filter(
      (b) => b.fillPercent >= 30 && b.fillPercent < thresholds.full
    );
  } else if (filter === "offline") {
    bins = bins.filter((b) => b.status === "offline");
  }

  // 3) ordenação
  if (orderBy === "priority") {
    bins.sort((a, b) => a.priority - b.priority);
  } else if (orderBy === "fill") {
    bins.sort((a, b) => b.fillPercent - a.fillPercent);
  } else if (orderBy === "name") {
    bins.sort((a, b) => a.name.localeCompare(b.name));
  }

  const total = bins.length;

  // 4) cards
  const fullBins = bins.filter((b) => b.fillPercent >= thresholds.full).length;
  const overloadedBins = bins.filter(
    (b) => b.fillPercent >= thresholds.overloaded
  ).length;

  const avgFillPercent =
    total > 0
      ? Math.round(
          bins.reduce((acc, b) => acc + (b.fillPercent || 0), 0) / total
        )
      : 0;

  const lastSync =
    allBins.length > 0
      ? new Date(
          Math.max(
            ...allBins
              .filter((b) => b.lastUpdate)
              .map((b) => new Date(b.lastUpdate).getTime())
          )
        ).toISOString()
      : null;

  res.json({
    campus: "Campus Joinville",
    lastSync,
    summary: {
      fullBins: { count: fullBins, threshold: thresholds.full },
      overloadedBins: { count: overloadedBins, threshold: thresholds.overloaded },
      avgFillPercent
    },
    results: bins.map((b) => ({
      id: b._id,
      name: b.name,
      location: b.location,
      status: b.status,
      fillPercent: b.fillPercent,
      lastUpdate: b.lastUpdate,
      priority: b.priority
    })),
    totalResults: total
  });
});

export default router;

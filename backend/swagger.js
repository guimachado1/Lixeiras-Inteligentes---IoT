// src/swagger.js
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function setupSwagger(app) {
  const swaggerDocument = YAML.load(path.join(__dirname, "./", "openapi.yml"));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

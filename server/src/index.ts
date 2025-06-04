import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cidadeRouter from "./routes/cidade";
import pool from "./controllers/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/cidade", cidadeRouter);

async function criarViews(): Promise<void> {
  const dropView = `DROP VIEW IF EXISTS cidade_view;`;

  const createView = `
    CREATE VIEW cidade_view AS
    SELECT 
      c.id,
      c.nome,
      i.lat,
      i.lon
    FROM cidades c
    JOIN incidencias i ON c.id = i.id;
  `;

  try {
    await pool.query(dropView);
    await pool.query(createView);
    console.log("VIEW cidade_view criada ou atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao criar VIEW cidade_view:", (error as Error).message);
  }
}

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await criarViews();
});

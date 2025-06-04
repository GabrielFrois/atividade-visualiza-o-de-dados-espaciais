import express from "express";
import pool from "../controllers/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT id, nome, lat, lon FROM cidade_view ORDER BY id
    `);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    res.status(500).json({ erro: "Erro ao buscar cidades" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await pool.query(
      `
      SELECT
        id,
        lat,
        lon,
        anual,
        jan,
        fev,
        mar,
        abr,
        mai,
        jun,
        jul,
        ago,
        set,
        out,
        nov,
        dez,
        ST_AsText(ST_Transform(geom, 4326)) AS geom
      FROM incidencias
      WHERE id = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Cidade/incidência não encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar cidade/incidência:", error);
    res.status(500).json({ erro: "Erro ao buscar por ID" });
  }
});

export default router;

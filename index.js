const express = require("express");
const dbClient = require("./db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.port || 9000;

app.use(cors());

app.use(express.json());

app.get("/api/v1/rumahsakit", async (req, res) => {
  const result = await dbClient.query("SELECT * FROM rumah_sakit");
  res.status(200).json(result.rows);
});

app.get("/api/v1/rumahsakit/all", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama as label, smid as value  FROM rumah_sakit"
  );
  res.status(200).json({
    rumahsakit: result.rows,
  });
});

app.get("api/v1/spesialis/all", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama_spesialis as label, nama_spesialis as key FROM spesialis"
  );
  res.status(200).json({
    spesialisAll: result.rows,
  });
});
app.get("api/v1/spesialis/allvalue", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama_spesialis as label, nama_spesialis as value FROM spesialis"
  );
  res.status(200).json({
    spesialisAll: result.rows,
  });
});

app.listen(port, () => console.log(`listen on port ${port}`));

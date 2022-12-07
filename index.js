const express = require("express");
const dbClient = require("./db");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.port || 9000;
const a = 1;
app.use(cors());

app.use(express.json());

// app.get("/api/v1/rumahsakit", async (req, res) => {
//   const result = await dbClient.query("SELECT * FROM rumah_sakit");
//   res.status(200).json(result.rows);
// });

app.get("/rumahsakit", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama as label, smid as value  FROM rumah_sakit"
  );
  res.status(200).json({
    rumahsakit: result.rows,
  });
});
app.get("/spesialislabelkey", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama_spesialis as label, nama_spesialis as key FROM spesialis"
  );
  res.status(200).json({
    spesialislabelkey: result.rows,
  });
});
app.get("/spesialislabelvalue", async (req, res) => {
  const result = await dbClient.query(
    "SELECT nama_spesialis as label, nama_spesialis as value FROM spesialis"
  );
  res.status(200).json({
    spesialislabelvalue: result.rows,
  });
});

app.get("/spesialis/:namaSpesialis", async (req, res) => {
  const result = await dbClient.query(
    `SELECT DISTINCT rumah_sakit.smid
    FROM dokter, rumah_sakit, spesialis
    where dokter.rumah_sakit_smid = rumah_sakit.smid
    and dokter.spesialis_id = spesialis.id
    and nama_spesialis = $1`,
    [req.params.namaSpesialis]
  );
  res.status(200).json({
    data: result.rows,
  });
});

app.listen(port, () => console.log(`listen on port ${port}`));

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const db = require("./pg.js");
app.use(cors());
app.use(express.json());

app.get("/teams", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM esport.t_team");
    // console.log(result);c
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/players", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT tp.id_player, tp.date_de_naissance,tp.photo,tp.alias_player,tp.role_player,tp.pays_player,tt.lien_logo,tt.nom FROM esport.t_player tp JOIN esport.t_team tt ON tt.id_team = tp.id_team"
    );
    // console.log(result);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/games", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM esport.t_game"
    );
    console.log(result);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/games", async (req,res) => {
  const query = req.body.q;
  console.log(query);
  if (!query) {
    return res.status(400).send('Query parameter "q" is required.');
  }
  try{
    await db.query(`INSERT INTO esport.t_game (nom, lien_logo, description) VALUES (${query.value}, ${query.value}, ${query.value})`

  );

  }catch (err){
    console.error(err);

  }

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

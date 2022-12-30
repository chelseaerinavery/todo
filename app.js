const express = require("express");
const { pool } = require("./config");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://todofe.onrender.com",
      "https://todofe.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/todo", (req, res) => {
  pool.query("SELECT * from todos", function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/todo", (req, res) => {
  const newToDo = {
    name: req.body.name,
    description: req.body.description,
  };
  pool.query(
    "INSERT INTO todos (name, description) VALUES ($1, $2) ",
    [newToDo.name, newToDo.description],
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.put("/todo", (req, res) => {
  const { id, completed, name, description } = req.body;
  pool.query(
    "UPDATE todos SET name = $1, description =$2, completed = $3 WHERE id = $4",
    [name, description, completed, id],
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.delete("/todo", (req, res) => {
  pool.query(
    "DELETE FROM todos WHERE id = ($1)",
    [req.body.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`app listening on port${port}`));

module.exports = app;

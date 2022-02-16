const express = require("express");
// const mysql = require("mysql2");
const { pool } = require("./config");
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
// var pool = mysql.createpool({
//   host: "localhost",
//   user: "root",
//   password: "newslang",
//   database: "test_todo",
// });

// pool.connect();

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
  pool.query(
    "UPDATE todos SET completed = ($1) WHERE id = ($2)",
    [req.body.completed, req.body.id],
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

const express = require("express");
const mysql = require("mysql2");
var cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newslang",
  database: "test_todo",
});

connection.connect();

app.get("/todo", (req, res) => {
  connection.query("SELECT * from todos", function (err, rows, fields) {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/todo", (req, res) => {
  const newToDo = {
    name: req.body.name,
    description: req.body.description,
  };
  connection.query(
    "INSERT INTO todos (name, description) VALUES (?, ?) ",
    [newToDo.name, newToDo.description],
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.put("/todo", (req, res) => {
  connection.query(
    "UPDATE todos SET completed = (?) WHERE id = (?)",
    [req.body.completed, req.body.id],
    function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.delete("/todo", (req, res) => {
  connection.query(
    "DELETE FROM todos WHERE id = (?)",
    [req.body.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`app listening on port${port}`));

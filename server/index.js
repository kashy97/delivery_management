const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "deliverydb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const item = req.body.item;
  const qt = req.body.qt;
  const amt = req.body.amt;

  const sqlSelect = "SELECT * FROM product_task";
  db.query(sqlSelect, [item, qt, amt], (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const item = req.body.item;
  const qt = req.body.qt;
  const amt = req.body.amt;
  const sqlInsert = "INSERT INTO product_task (item, qt, amt) VALUES (?,?,?)";
  db.query(sqlInsert, [item, qt, amt], (err, result) => {
    console.log(err);
  });
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "INSERT INTO register(username,password) VALUES (?,?)";
  db.query(sqlInsert, [username, password], (err, result) => {
    console.log("err", err);
  });
});

app.get("/api/reg", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM register";
  db.query(sqlSelect, [username, password], (err, result) => {
    res.send(result);
  });
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "SELECT * FROM register WHERE username=? AND password =?";
  db.query(sqlInsert, [username, password], (err, result) => {
    if (err) {
      res.send({ message: "err" });
    }
    if (result.length > 0) {
      res.send(result);
      console.log(result);
    } else {
      res.send({ message: "wrong username/password combination" });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

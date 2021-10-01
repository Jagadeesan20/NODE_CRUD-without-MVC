const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Skein@123456",
  database: "userdetail",
});

app.post("/insert", (req, res) => {
  const username = req.body.username;
  db.query(
    "INSERT INTO details(username)VALUES(?)",
    username,
    (err, response) => {
      if (err) {
        res.send("Something went worng");
        console.log(err);
      } else {
        res.send("Activity added successfully");
        console.log("Success");
      }
    }
  );
});

app.get("/allusers", (req, res) => {
  db.query("SELECT * FROM details", (err, result) => {
    if (err) {
      res.send("Something went wrong");
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  console.log(username, id);
  db.query(
    "UPDATE details SET username=? where id=?",
    [username, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM details WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    } else {
      console.log("Successfully deleted");
      res.send(result);
    }
  });
});

app.get("/onlyone/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM details where id=?", id, (err, result) => {
    if (err) {
      res.send("NO DATA AVAILABLE");
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5000, () => {
  console.log("On the port 5000");
});

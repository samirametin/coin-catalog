const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "20192020ma",
  database: "coinList",
  multipleStatements: true,
}); /*  */

connection.connect((err) => {
  if (!err) {
    console.log("Connected to database!");
  } else {
    console.log(err);
  }
});

app.use("/images", express.static("imgs"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  connection.query(`SELECT * FROM coins LIMIT 3;`, (err, data) => {
    if (!err) return res.json(data);
    res.status(500).send();
  });
});

app.get("/coins/:category", (req, res) => {
  const { category } = req.params;
  connection.query(
    `Select * from coins WHERE category LIKE '%${category}%';`,
    (err, data) => {
      if (!err) return res.json(data);
      res.status(404).send();
    }
  );
});

app.get("/coin/:id", (req, res) => {
  const { id } = req.params;
  connection.query(`SELECT * FROM coins WHERE id=${id};`, (err, data) => {
    if (!err) return res.json(data);
    res.status(404).send();
  });
});

app.get("/search", (req, res) => {
  const { q, ...rest } = req.query;
  let query = `SELECT * FROM coins WHERE isRemoved=0 AND price BETWEEN ${rest.priceFrom} AND ${rest.priceTo} AND year BETWEEN ${rest.yearFrom} AND ${rest.yearTo}`;
  rest.category ? (query += ` AND category="${rest.category}"`) : null;
  rest.country ? (query += ` AND country="${rest.country}"`) : null;
  rest.metal ? (query += ` AND metal="${rest.metal}"`) : null;
  query += ";";
  if (Object.keys(rest).length === 0) {
    connection.query(
      `SELECT * FROM coins WHERE (coinName LIKE '%${q}%') OR (longDesc LIKE '%${q}%') AND isRemoved=0 ;`,
      (err, data) => {
        if (err) return res.status(500).send({ found: 0 });
        res.json(data);
      }
    );
  } else {
    connection.query(query, (err, data) => {
      if (err) return res.status(500).send({ found: 0 });
      res.json(data);
    });
  }
});

app.get("/countryList", (req, res) => {
  connection.query(
    "SELECT DISTINCT country FROM coins WHERE isRemoved=0 order by country;",
    (err, countryOptions) => {
      if (err)
        return res.status(500).send({ error: "Couldn't connect to Database" });
      connection.query(
        "SELECT DISTINCT category FROM coins WHERE isRemoved=0 order by category;",
        (err, categoryOptions) => {
          if (err)
            return res
              .status(500)
              .send({ error: "Couldn't connect to Database" });
          connection.query(
            "SELECT DISTINCT metal FROM coins WHERE isRemoved=0 order by metal;",
            (err, metalOptions) => {
              if (err)
                return res
                  .status(500)
                  .send({ error: "Couldn't connect to Database" });
              res.send({
                countryOptions: countryOptions,
                categoryOptions: categoryOptions,
                metalOptions: metalOptions,
              });
            }
          );
        }
      );
    }
  );
});

app.get("/admin-panel/editCoin", (req, res) => {
  connection.query(
    `SELECT * FROM coins WHERE isRemoved=0 ORDER BY id DESC;`,
    (err, data) => {
      if (err)
        return res.status(500).send({ error: "Couldn't connect to Database" });
      res.json(data);
    }
  );
});

app.post("/addCoin", (req, res) => {
  let newData = req.body;
  for (const key in req.body) {
    if (!req.body[key]) {
      return res.send({ error: "Value is null", errorcode: 999 });
    }
  }
  connection.query(`INSERT INTO coins SET ?;`, newData, (err, data) => {
    if (err) {
      res.send({ err, errorcode: 999 });
    } else {
      res.send({ successfull: true });
    }
  });
});

app.put("/editCoin/:id", (req, res) => {
  const { id } = req.params;
  let updatedData = req.body;
  let query = "UPDATE coins SET ? WHERE id=?";
  connection.query(query, [updatedData, id], (err, data) => {
    if (err) {
      res.send({ err });
    } else {
      res.send({ successfull: true });
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "UPDATE coins SET isRemoved=true WHERE id=? ",
    [id],
    (err, data) => {
      if (err) return res.status(500).send(err);
      res.send({ isRemoved: true });
    }
  );
});

app.listen(5000, () => console.log("Joined to the server on port 5000!"));

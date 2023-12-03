const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to the in-memory database");
});

const columns = [
  "CourseCode TEXT",
  "Title TEXT",
  "Units TEXT",
  "Description TEXT",
  "AverageGrade TEXT",
  "Prerequisites TEXT",
];
const departments = ["compsci", "physics", "eecs", "data", "math"];

app.post("/delete-tables", (req, res) => {
  departments.forEach((department) => {
    db.run(`DROP TABLE ${department}`, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    })
  })
  return res.status(200).json({ success: 'tables deleted' })
})

app.post("/populate-tables", (req, res) => {
  departments.forEach((department) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${department} (${columns.join(", ")})`,
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
      }
    );

    let file = "../class-scrapper/" + department + "_scraping_results.json";
    let jsonData = fs.readFileSync(file, "utf-8");
    let data = JSON.parse(jsonData);
    let insertQuery = `INSERT OR REPLACE INTO ${department} VALUES (?, ?, ?, ?, ?, ?)`;

    db.serialize(() => {
      const stmt = db.prepare(insertQuery);

      Object.entries(data).forEach(([courseCode, courseData]) => {
        const {
          Title,
          Units,
          Description,
          "Average Grade": AverageGrade,
          Prerequisites,
        } = courseData;
        stmt.run(
          courseCode,
          Title,
          Units,
          Description,
          AverageGrade,
          Prerequisites
        );
      });

      stmt.finalize((err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
      });
    });
  });
  return res.json({ success: "tables populated" });
});

app.get("/COMPSCI", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM compsci"
      : "SELECT * FROM compsci WHERE CourseCode = ?";
  db.get(sql, [code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid Class Code." });
    }
    return res.json({
      courseCode: row.CourseCode,
      title: row.Title,
      units: row.Units,
      description: row.Description,
      averageGrade: row.AverageGrade,
      prerequisites: row.Prerequisites,
    });
  });
});

app.get("/MATH", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM math"
      : "SELECT * FROM math WHERE CourseCode = ?";
  db.get(sql, [code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid Class Code." });
    }
    return res.json({
      courseCode: row.CourseCode,
      title: row.Title,
      units: row.Units,
      description: row.Description,
      averageGrade: row.AverageGrade,
      prerequisites: row.Prerequisites,
    });
  });
});

app.get("/EECS", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM eecs"
      : "SELECT * FROM eecs WHERE CourseCode = ?";
  db.get(sql, [code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid Class Code." });
    }
    return res.json({
      courseCode: row.CourseCode,
      title: row.Title,
      units: row.Units,
      description: row.Description,
      averageGrade: row.AverageGrade,
      prerequisites: row.Prerequisites,
    });
  });
});

app.get("/DATA", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM data"
      : "SELECT * FROM data WHERE CourseCode = ?";
  db.get(sql, [code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid Class Code." });
    }
    return res.json({
      courseCode: row.CourseCode,
      title: row.Title,
      units: row.Units,
      description: row.Description,
      averageGrade: row.AverageGrade,
      prerequisites: row.Prerequisites,
    });
  });
});

app.get("/PHYSICS", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM physics"
      : "SELECT * FROM physics WHERE CourseCode = ?";
  db.get(sql, [code], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid Class Code." });
    }
    return res.json({
      courseCode: row.CourseCode,
      title: row.Title,
      units: row.Units,
      description: row.Description,
      averageGrade: row.AverageGrade,
      prerequisites: row.Prerequisites,
    });
  });
});

app.get("/", (req, res) => {
  res.send("your request has been received");
});

app.listen(2000, () => {
  console.log("listening at http://localhost:2000");
});

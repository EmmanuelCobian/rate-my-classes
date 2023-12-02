const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());

const csClassInfo = "../class-scrapper/compsci_scraping_results.json";

const jsonData = fs.readFileSync(csClassInfo, "utf-8");
const data = JSON.parse(jsonData);
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("connected to the in-memory database for cs classes");
});

const tableName = "compsci";
const columns = [
  "CourseCode TEXT",
  "Title TEXT",
  "Units TEXT",
  "Description TEXT",
  "AverageGrade TEXT",
  "Prerequisites TEXT",
];

db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(
    ", "
  )})`, (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Created compsci table')
  });

app.post('/pop-compsci', (req, res) => {
    const insertQuery = `INSERT INTO ${tableName} VALUES (?, ?, ?, ?, ?, ?)`;
    const stmt = db.prepare(insertQuery);
    
    Object.entries(data).forEach(([courseCode, courseData]) => {
      const {
        Title,
        Units,
        Description,
        "Average Grade": AverageGrade,
        Prerequisites,
      } = courseData;
    
      stmt.run(courseCode, Title, Units, Description, AverageGrade, Prerequisites);
    });
    
    stmt.finalize((err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        return res.json({ success: 'compsci table populated'})
    });
})

app.get("/compsci", (req, res) => {
  const sql = "SELECT * FROM compsci";
  db.get(sql, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid token." });
    }
    return res.json({ id: row.id, name: row.name, email: row.email });
  });
});

app.get("/", (req, res) => {
  res.send("your request has been received");
});

app.listen(2000, () => {
  console.log("listening at http://localhost:2000");
});

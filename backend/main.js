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

// db.run(`DROP TABLE compsci`, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("deleted compsci table");
// });

// db.run(`DROP TABLE math`, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("deleted math table");
// });

// db.run(`DROP TABLE eecs`, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("deleted eecs table");
//   })

//   db.run(`DROP TABLE physics`, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("deleted physics table");
//   })

//   db.run(`DROP TABLE data`, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("deleted data table");
//   })

db.run(`CREATE TABLE IF NOT EXISTS compsci (${columns.join(", ")})`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Created compsci table");
});

db.run(`CREATE TABLE IF NOT EXISTS math (${columns.join(", ")})`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Created math table");
});

db.run(`CREATE TABLE IF NOT EXISTS eecs (${columns.join(", ")})`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Created eecs table");
});

db.run(`CREATE TABLE IF NOT EXISTS physics (${columns.join(", ")})`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Created physics table");
});

db.run(`CREATE TABLE IF NOT EXISTS data (${columns.join(", ")})`, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Created data table");
});

app.post("/populate-compsci", (req, res) => {
  const csClassInfo = "../class-scrapper/compsci_scraping_results.json";

  const jsonData = fs.readFileSync(csClassInfo, "utf-8");
  const data = JSON.parse(jsonData);
  const insertQuery = `INSERT INTO compsci VALUES (?, ?, ?, ?, ?, ?)`;

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
      return res.json({ success: "compsci table populated" });
    });
  });
});

app.post("/populate-data", (req, res) => {
  const dataClassInfo = "../class-scrapper/data_scraping_results.json";

  const jsonData = fs.readFileSync(dataClassInfo, "utf-8");
  const data = JSON.parse(jsonData);
  const insertQuery = `INSERT INTO data VALUES (?, ?, ?, ?, ?, ?)`;

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
      return res.json({ success: "data table populated" });
    });
  });
});

app.post("/populate-eecs", (req, res) => {
  const eecsClassInfo = "../class-scrapper/eecs_scraping_results.json";

  const jsonData = fs.readFileSync(eecsClassInfo, "utf-8");
  const data = JSON.parse(jsonData);
  const insertQuery = `INSERT INTO eecs VALUES (?, ?, ?, ?, ?, ?)`;

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
      return res.json({ success: "eecs table populated" });
    });
  });
});

app.post("/populate-physics", (req, res) => {
  const physicsClassInfo = "../class-scrapper/physics_scraping_results.json";

  const jsonData = fs.readFileSync(physicsClassInfo, "utf-8");
  const data = JSON.parse(jsonData);
  const insertQuery = `INSERT INTO physics VALUES (?, ?, ?, ?, ?, ?)`;

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
      return res.json({ success: "physics table populated" });
    });
  });
});

app.post("/populate-math", (req, res) => {
  const mathClassInfo = "../class-scrapper/math_scraping_results.json";

  const jsonData = fs.readFileSync(mathClassInfo, "utf-8");
  const data = JSON.parse(jsonData);
  const insertQuery = `INSERT INTO math VALUES (?, ?, ?, ?, ?, ?)`;

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
      return res.json({ success: "math table populated" });
    });
  });
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

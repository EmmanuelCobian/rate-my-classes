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
  console.log("connected to the database");
});

const classColumns = [
  "CourseCode TEXT PRIMARY KEY",
  "Title TEXT",
  "Units TEXT",
  "Description TEXT",
  "AverageGrade TEXT",
  "Prerequisites TEXT",
];

const reviewColumns = [
  "Attendance TEXT",
  "Author TEXT",
  "CourseCode TEXT",
  "Difficulty INT",
  "Grade TEXT",
  "Interest INT",
  "OverallRating INT",
  "Professor TEXT",
  "Review TEXT",
  "Term TEXT",
  "Textbook TEXT",
  "ThumbsDown INT",
  "ThumbsUp INT",
  "LikedBy TEXT",
  "DislikedBy TEXT"
];
const departments = ["compsci", "physics", "eecs", "data", "math"];

app.post("/delete-tables", (req, res) => {
  departments.forEach((department) => {
    db.run(`DROP TABLE ${department}`, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    });
  });
  db.run(`DROP TABLE reviews`, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  return res.status(200).json({ success: "tables deleted" });
});

app.post("/populate-tables", (req, res) => {
  db.run(
    `CREATE TABLE IF NOT EXISTS reviews (${reviewColumns.join(", ")})`,
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
    }
  );

  departments.forEach((department) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${department} (${classColumns.join(", ")})`,
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

app.post("/add-review", (req, res) => {
  const {
    Attendance,
    Author,
    CourseCode,
    Difficulty,
    Grade,
    Interest,
    OverallRating,
    Professor,
    Review,
    Term,
    Textbook,
    ThumbsDown,
    ThumbsUp,
  } = req.query;
  const sql = `
    INSERT INTO reviews (
    Attendance,
    Author,
    CourseCode,
    Difficulty,
    Grade,
    Interest,
    OverallRating,
    Professor,
    Review,
    Term,
    Textbook,
    ThumbsDown,
    ThumbsUp,
    LikedBy,
    DislikedBy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      Attendance,
      Author,
      CourseCode,
      Difficulty,
      Grade,
      Interest,
      OverallRating,
      Professor,
      Review,
      Term,
      Textbook,
      ThumbsDown,
      ThumbsUp,
      "",
      ""
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      return res.json({
        success: true,
        message: "Review added to reviews table successfully",
      });
    }
  );
});

app.post("/update-review-likes", (req, res) => {
  const {
    Author,
    CourseCode,
    ThumbsDown,
    ThumbsUp,
    LikedBy,
    DislikedBy,
  } = req.query;
  const sql = `
    UPDATE reviews SET 
    ThumbsDown = ?,
    ThumbsUp = ?,
    LikedBy = ?,
    DislikedBy = ?
    WHERE Author = ? AND CourseCode = ?
  `;
  db.run(sql, [ThumbsDown, ThumbsUp, LikedBy, DislikedBy, Author, CourseCode], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    return res.json({ success: true, message: `Review from ${Author} and for ${CourseCode} was updated successfully`})
  })
})

app.get("/COMPSCI", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM compsci"
      : "SELECT * FROM compsci WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});

app.get("/MATH", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM math"
      : "SELECT * FROM math WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});

app.get("/EECS", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM eecs"
      : "SELECT * FROM eecs WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});

app.get("/DATA", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM data"
      : "SELECT * FROM data WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});

app.get("/PHYSICS", (req, res) => {
  const code = req.query.code;
  const sql =
    code == undefined
      ? "SELECT * FROM physics"
      : "SELECT * FROM physics WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});

app.get("/get-author-reviews", (req, res) => {
  const author = req.query.author;
  const sql = "SELECT * FROM reviews WHERE Author = ?";
  db.all(sql, [author], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Author." });
    }
    return res.json(rows);
  });
});

app.get("/get-class-reviews", (req, res) => {
  const code = req.query.code;
  const sql = "SELECT * FROM reviews WHERE CourseCode = ?";
  db.all(sql, [code], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length == 0) {
      return res.status(400).json({ error: "Invalid Class Code." });
    }
    return res.json(rows);
  });
});


app.get("/", (req, res) => {
  res.send("your request has been received");
});

app.listen(2000, () => {
  console.log("listening at http://localhost:2000");
});

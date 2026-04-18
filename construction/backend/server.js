const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// ================= ENSURE UPLOADS FOLDER =================
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 uploads folder created");
}

// ================= DB CONNECTION =================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'construction_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

// ================= MULTER SETUP =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ FIXED PATH
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ================= SERVE IMAGES =================
app.use('/uploads', express.static(uploadDir));

// ================= GET PROJECTS =================
app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// ================= ADD PROJECT (WITHOUT IMAGE) =================
app.post('/api/projects', (req, res) => {
  const { name, location, status } = req.body;

  db.query(
    'INSERT INTO projects (name, location, status) VALUES (?, ?, ?)',
    [name, location, status],
    (err) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send(err);
      }
      res.send('✅ Project added');
    }
  );
});

// ================= UPLOAD PROJECT (WITH IMAGE + NEW FIELDS) =================
app.post('/api/projects/upload', upload.single('image'), (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).send("❌ No image uploaded");
    }

    const {
      name,
      location,
      status,
      description,
      area,
      budget,
      year
    } = req.body;

    const image = req.file.filename;

    db.query(
      `INSERT INTO projects 
      (name, location, status, description, area, budget, year, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, location, status, description, area, budget, year, image],
      (err) => {
        if (err) {
          console.error("DB ERROR:", err);
          return res.status(500).send(err);
        }
        res.send('✅ Project added with image');
      }
    );

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).send("Server error");
  }
});

// ================= SEARCH =================
app.get('/api/projects/search', (req, res) => {
  const q = req.query.q;

  db.query(
    'SELECT * FROM projects WHERE name LIKE ? OR location LIKE ?',
    [`%${q}%`, `%${q}%`],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send(err);
      }
      res.json(result);
    }
  );
});

// ================= BOOKING =================
app.post('/api/bookings', (req, res) => {
  console.log("📥 Incoming booking:", req.body);

  const { name, phone, project_type, date } = req.body;

  db.query(
    'INSERT INTO bookings (name, phone, project_type, date) VALUES (?, ?, ?, ?)',
    [name, phone, project_type, date],
    (err) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send(err);
      }
      console.log("✅ Booking inserted");
      res.send('Booking successful');
    }
  );
});

// ================= START SERVER =================
app.listen(5050, () => {
  console.log('🚀 Server running on port 5050');
});
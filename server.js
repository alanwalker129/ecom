const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vijayan129#', 
    database: 'contactdb' 
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

// Contact Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const sql = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, email, subject, message], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Message sent successfully!' });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

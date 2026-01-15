const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Endpoint to get all exams
app.get('/api/exams', (req, res) => {
  exec('python get_exam_data.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error fetching exam data');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error in Python script');
    }
    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (e) {
      console.error('Error parsing exam data:', e);
      res.status(500).send('Error parsing exam data');
    }
  });
});


app.get('/api/exams/:id', (req, res) => {
  parseInt(req.params.id, 10);
  console.log(`Received request for exam ID: ${req.params.id}`);
  exec('python get_exam_data.py', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error.message}`);
          console.error(`stderr: ${stderr}`);
          return res.status(500).send('Error fetching exam data');
      }
      if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).send('Error in Python script');
      }
      try {
          console.log("Raw stdout:", stdout);

          const data = JSON.parse(stdout);
          const exam = data.find(exam => exam.id === parseInt(req.params.id, 10));
          if (exam) {
              res.json(exam);
          } else {
              res.status(404).send('Exam not found');
          }
      } catch (e) {
          console.error('Error parsing exam data:', e);
          res.status(500).send('Error parsing exam data');
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

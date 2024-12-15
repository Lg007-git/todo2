const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
require('dotenv').config(); // Load environment variables

const app = express();
//app.use(cors({origin:'https://todo2frontend-7etyjtyc8-lg007s-projects.vercel.app/'})); // Replace with your frontend domain
app.use(cors({
  origin: ["https://todo2frontend-7etyjtyc8-lg007s-projects.vercel.app/","http://localhost:5173/"], // Allow both origins
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));
app.use(express.json());

// MongoDB Connection
const DB_URI = process.env.MONGO_URI ;
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate({ _id: id }, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

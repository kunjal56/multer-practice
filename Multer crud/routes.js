const express = require('express');
const router = express.Router();
const upload = require('./upload'); // Import multer configuration

// In-memory store for demonstration purposes
let items = [];

// Create - Upload a file and create an item
router.post('/items', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const newItem = {
    id: items.length + 1,
    title,
    description,
    filePath: file.path
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// Read - Get all items
router.get('/items', (req, res) => {
  res.json(items);
});

// Update - Update an item with a new file
router.put('/items/:id', upload.single('file'), (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  const file = req.file;

  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).send('Item not found.');
  }

  if (file) {
    item.filePath = file.path; // Update the file path
  }
  item.title = title || item.title;
  item.description = description || item.description;

  res.json(item);
});

// Delete - Delete an item
router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  items = items.filter(item => item.id !== id);

  res.status(204).send();
});

module.exports = router;

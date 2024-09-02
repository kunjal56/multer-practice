const multer = require('multer');
const path = require('path');

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Append a timestamp to avoid filename collisions
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;

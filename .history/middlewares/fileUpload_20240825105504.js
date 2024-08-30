import multer from 'multer';
import path from 'path';

// Define the directory to save uploaded files
const uploadDirectory = path.join(process.cwd(), 'uploads');

// Ensure the uploads directory exists
const ensureUploadsDirectory = () => {
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists
    ensureUploadsDirectory();
    cb(null, uploadDirectory); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Use original file name with timestamp to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Create multer instance
const upload = multer({ storage });

// Export the middleware
export default upload;

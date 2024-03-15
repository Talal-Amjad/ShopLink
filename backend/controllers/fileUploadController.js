// fileUploadController.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');
const PDFParser = require('pdf-parse');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads/cv';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer middleware
const upload = multer({ storage }).single('file');

// Function to upload file, parse PDF, and extract skills
exports.uploadFile = (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ message: 'Error uploading file' });
      }
      console.log("parsing startted")
      // Parse PDF to extract text
      const pdfPath = req.file.path;
      const pdfBuffer = fs.readFileSync(pdfPath);
      const pdfText = await getPdfText(pdfBuffer);

      // Extract skills using GPT-3.5 API
      const gptApiKey = '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';
      const gptUrl = 'https://api.openai.com/v1/completions';
      
      const response = await axios.post(gptUrl, {
        prompt: `Extract skills from the following CV:\n\n${pdfText}`,
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 100
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gptApiKey}`
        }
      });

      // Extract skills from the GPT-3.5 response
      const skills = response.data.choices[0].text;
      console.log(skills);
      // Send skills to frontend
      res.json({ skills });
    });
  } catch (error) {
    console.error('Error uploading file and extracting skills:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to extract text from PDF using pdf-parse
async function getPdfText(pdfBuffer) {
  return new Promise((resolve, reject) => {
    PDFParser(pdfBuffer).then(data => {
      resolve(data.text);
    }).catch(error => {
      reject(error);
    });
  });
}

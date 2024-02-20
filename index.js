import express from 'express'; // Import the Express.js framework
import bodyParser from 'body-parser'; // Import body-parser middleware
import qr from 'qr-image'; // Import qr-image library for generating QR codes
import fs from 'fs'; // Import file system module for file operations
import path from 'path'; // Import path module for working with file paths
import { fileURLToPath } from 'url'; // Import fileURLToPath function to convert file URL to file path
import { dirname } from 'path'; // Import dirname function to get directory name from file path

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application
const app = express();
const port = 3000; // Port number on which the server will listen

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Handle POST request to '/generate' endpoint
app.post("/generate", (req, res) => {
  // Extract URL from the request body
  const { url } = req.body;

  // Generate QR code image from the URL
  var qr_svg = qr.image(url);
  // Construct the file path for saving the QR code image
  var qrFilePath = path.join(__dirname, "qr_img.png");
  // Pipe the QR code image data to a writable stream and save it as a file
  qr_svg.pipe(fs.createWriteStream(qrFilePath));

  // Write the URL to a text file named 'URL.txt'
  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err; // Throw an error if file writing fails
    console.log("The file has been saved!"); // Log a message if file writing is successful
  });

  // Send the QR code image file as a response to the client
  res.sendFile(qrFilePath);
});

// Start the Express server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

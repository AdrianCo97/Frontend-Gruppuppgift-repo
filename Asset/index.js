
// path is a built in library to handle file paths in Node.js
const path = require('path');

const express = require('express');

// Create a new web server (based on express)

const app = express();

require('./index');
// We tell the web server to serve "static" files from the
// frontend folder (__dirname = the folder we are in)
app.use(express.static(path.join(__dirname, '../ASSET')));

// Start the webserver on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));
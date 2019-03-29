const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');

// MongoDB connection url
const mongoURL = 'mongodb://localhost:27017/directory';

const http = require('http');

// Connect to MongoDB
mongoose.connect( mongoURL, { useNewUrlParser: true }, (err, db) => {
    if(err) console.log( 'mongodb Error: ' + err );
});

app.use(express.static(path.join(__dirname, '../client/build')));

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Create a server
const server = http.createServer(app);

// Import routes
const routes = require('./routes/index')();
app.use('/', routes);

server.listen(port);

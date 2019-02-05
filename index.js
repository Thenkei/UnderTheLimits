const express = require('express');
const path = require('path');

const server = require('./server');

const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));
app.listen(80);

server(app);

const credentialRoute = require('../api/routes/credentialRoute');
const dataLoaderRoute = require('../api/routes/dataLoaderRoute');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin:"http://localhost:51747",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/', credentialRoute);
app.use('/', dataLoaderRoute);

app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
});
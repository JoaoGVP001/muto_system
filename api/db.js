const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
 host: process.env.DB_HOST,
 port: process.env.DB_PORT || 3306,
 user: process.env.DB_USER,
 password: process.env.DB_PASS,
 database: process.env.DB_NAME,
});
connection.connect((err) => {
 if (err) {
 console.error('Erro ao conectar ao MySQL:', err.message);
 } else {
 console.log('Conectado ao MySQL com sucesso!');
 }
});
module.exports = connection;
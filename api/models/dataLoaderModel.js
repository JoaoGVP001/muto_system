const db = require('../db');

async function basicDataModel(name, email) {
    new Promise((resolve, reject) => {
        const query = "SELECT * FROM user WHERE name = ? AND email= ?";
        db.query(query, [name, email], (error, result) => {
            if (error) {
                return reject(error);
            } if (result > 0) {
                return resolve(result);
            }
        })
    })
}

module.exports = {basicDataModel};
const db = require("../db");

async function UserSignUpModel(name, email, password) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
        db.query(query, [name,email,password], (error, result) => {
            if (error) {
                return reject(error);
            }
            else{
                return resolve(result);
            }

        });
    });
}

async function AdmSignUpModel(name, email, password) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO adm (name, email, password) VALUES (?,?,?)";
        db.query(query, [name,email,password], (error, result) => {
            if (error) {
                return reject(error);
            }
            else{
                return resolve(result);
            }

        });
    });
}

async function UserLoginModel(name, email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user WHERE name = ? AND email = ?";
    db.query(query, [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length > 0) {
        return resolve(result[0]);
      } else {
        return reject("Usuário não encontrado");
      }
    });
  });
}


async function AdmVerificationModel(cod) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM adm_code WHERE cod = ?";
        db.query(query, [cod], (error, result) => {
            if (error) {
                return reject(error);
            }

            if (result.length > 0) {
                return resolve(true); 
            } else {
                return resolve(false); 
            }
        });
    });
}

async function AdmLoginModel(name, email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM adm WHERE name = ? AND email = ?";
    db.query(query, [name, email], (error, result) => {
      if (error) {
        return reject(error);
      }
      if (result.length > 0) {
        return resolve(result[0]);
      } else {
        return reject("Administrador não encontrado");
      }
    });
  });
}



module.exports = {UserSignUpModel, AdmSignUpModel, AdmLoginModel, AdmVerificationModel, UserLoginModel};
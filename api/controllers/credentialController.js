const credentialModel = require("../models/credentialModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function UserSignUpController(req, res) {
    const {name, email, password} = req.body;
    const crypt_password = await bcrypt.hash(password, 10);
    try{
        await credentialModel.UserSignUpModel(name,email,crypt_password);
        res.status(200).json({message: "UserSignUpControllerSuccess"});
    }
    catch{
        res.status(500).json({message: "UserSignUpControllerError"});
    }
    
};

async function AdmSignUpController(req, res) {
    const {name, email, password, cod} = req.body;
    try{
        if(await credentialModel.AdmVerificationModel(cod)){
            const crypt_password = await bcrypt.hash(password, 10);
            await credentialModel.AdmSignUpModel(name,email,crypt_password);
            res.status(200).json({ message: "AdmSignUpControllerSuccess"});
        }
        else{
            res.status(500).json({message:"AdmSignUpControllerError"});
        }
    }
    catch{
        res.status(500).json({message:"AdmSignUpControllerError"});
    }
    
};

async function UserLoginController(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await credentialModel.UserLoginModel(name, email);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({'name':name, 'email':email}, process.env.JWT_SECRET, {expiresIn:'1h'});
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,   
        sameSite: 'Lax',     
        maxAge: 3600000
      });

      res.status(200).json({ message: "UserLoginControllerSuccess" });
    } else {
      res.status(500).json({ message: "UserLoginControllerError" });
    }
  } catch (err) {
    res.status(500).json({ message: "UserLoginControllerError" });
  }
}

async function AdmLoginController(req, res) {
  const { name, email, password } = req.body;
  try {
    const adm = await credentialModel.AdmLoginModel(name, email);
    const match = await bcrypt.compare(password, adm.password);
    if (match) {
      const token = jwt.sign({'name':name, 'email':email}, process.env.JWT_SECRET, {expiresIn:'1h'});
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,   
        sameSite: 'Lax',     
        maxAge: 3600000
      });
      res.status(200).json({ message: "AdmLoginControllerSuccess" });
    } else {
      res.status(500).json({ message: "AdmLoginControllerSuccessError" });
    }
  } catch (err) {
    res.status(500).json({ message: "AdmLoginControllerError" });
  }
}

async function JWTmiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token){return res.status(500).json({message:"JWTmiddlewareError"})};

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({message:"JWTmiddlewareError"})
  }
}


module.exports = {AdmSignUpController, UserSignUpController, UserLoginController, AdmLoginController, JWTmiddleware};
const dataLoaderModel = require("../models/dataLoaderModel");

async function basicDataController(req, res) {
    const {name, email} = req.user;
    try {
        res.status(200).json({name, email});
    } catch (error) {
        res.status(500).json({message:"basicDataControllerError"})
    }
}

module.exports = {basicDataController};
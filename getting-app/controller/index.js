const EmmissionsInfo = require('../models/EmmissionsInfo');

exports.find = async (req, res) => {
    try {
       console.log(req.query);
       const emmissions = await EmmissionsInfo.find({});
       res.json(emmissions);
    } catch(err){
       return res.status(500).send({
        message: err.message
      })
    }   
};
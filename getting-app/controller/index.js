const EmmissionsInfo = require('../models/EmmissionsInfo');
const { createDBQuery } = require('../lib/mongo-queries');

exports.find = async (req, res) => {
    try {
       const match = createDBQuery({ ...req.query });
       const emmissions = await EmmissionsInfo.aggregate(match);
       res.json(emmissions);
    } catch(err){
       return res.status(500).send({
        message: err.message
      })
    }   
};
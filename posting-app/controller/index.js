const mongoose = require('mongoose');
const EmmissionsInfo = require('../models/EmmissionsInfo');
const csv = require('fast-csv');
const { dataFormatter, dataValidator } = require('../lib/dataValidator')

exports.createCSV = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
  
    const emmissionsFile = req.file.buffer.toString();

    const emmissionsInfoArray = []
    
    csv.parseString(emmissionsFile, {
		headers: true,
		ignoreEmpty: true
	 })
	 .on('data', (data) => {
		data['_id'] = new mongoose.Types.ObjectId();

        const isCorrectCSVData = dataValidator(data);

        if (!isCorrectCSVData) {
           throw new Error('Some columns were missing from the CSV, are you sure you uploaded the correct one?');
        }

        const formattedData = dataFormatter(data);
		 
		emmissionsInfoArray.push(formattedData);
	 })
	 .on('end', () => {
		EmmissionsInfo.create(emmissionsInfoArray, function(err, _documents) {
		    if (err) throw err;
		});
		 
		res.send(emmissionsInfoArray.length + ' sectors per country have been successfully uploaded.');
	 });
};
const router = require('express').Router();
client = require('../db')

module.exports = router;

router.get('/', (req, res, next)=>{
	client.query('select * from mapping', (err, result)=>{
		var companies = result.rows
		res.json({companies})
	})	
})

//this gets me one object with {"companies": [{whole row of excel}, {whole row of excel}]}

//i can first pick a date
// "6/30/2014"
// if 'company name' has value in column '6/30/2014' in sp900
// find in mapping

//then?
//create nested structure
//then serve it up to component!


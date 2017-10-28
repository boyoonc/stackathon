const router = require('express').Router();
client = require('../db')

module.exports = router;

router.get('/', (req, res, next)=>{
	
	client.query('select * from mapping', (err, result)=>{
		console.log(result)
		var companies = result.rows
		res.json({companies})
	})
	
})
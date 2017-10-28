const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', api)
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send('Something broke!')
})


app.listen(process.env.PORT || 3000, ()=> {
	console.log('listening on port 3000')
});

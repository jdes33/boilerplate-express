require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

console.log("Hello world");

// second folder arg is actual folder on your local system, which you are mounting
app.use('/public', express.static(__dirname +  '/public'));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});


app.get('/hello', function (req, res) {
	res.send("Hello jason");
});

app.get('/', function (req, res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});

app.get('/json', function (req, res) {

	const message = 'Hello json';
	res.json({"message": process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message});
})

app.get('/now', function(req, res, next) {
	req.time = new Date().toString();
	next();
  }, function(req, res) {

	res.json({'time': req.time});
  });

app.get('/:word/echo', function(req, res) {
	res.json({'echo': req.params.word});
});

app.get('/name', (req, res) => {
	res.json({'name': `${req.query.first} ${req.query.last}`})
})

app.use(bodyParser.urlencoded({extended: false}))

app.post('/name', (req, res) => {
	res.json({'name': `${req.body.first} ${req.body.last}`})
})

































 module.exports = app;

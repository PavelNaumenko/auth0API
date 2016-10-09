import path from 'path';
import http from 'http';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import Router from './routing/Router';
import RouterConfig from './routing';

const mode = process.env.NODE_ENV;
const app = express();

// Connect to DB
// mongoose.connect('mongodb://xtryd:helloquant5@ds049476.mlab.com:49476/hancock', (err) => {
//
// 	(err) ? console.log(err) : console.log('//        Connected to API db        //');
//
// });

// Showing server view
app.use(express.static(path.join(__dirname, '../view')));

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, '../view'));

});

// Adding limits
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Allow access
app.all('/*', (request, response, next) => {

	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');

	next();

});

new Router(app, RouterConfig);

/**
 * Node error handler
 */

process.on('uncaughtException', (err) => {

	console.log(`CAUGHT EXCEPTION: ${err.message}`);

});

// Server start
http.createServer(app).listen(config[ mode ].PORT, () => {

	console.log(`// ${config[ mode ].APP_NAME} API running at :${config[ mode ].PORT} port //`);

});

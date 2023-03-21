const express = require('express');
const configureDI = require('./config/di');
const nunjucks = require('nunjucks');
const { initialize: initializeCarModule } = require('./module/car/module');
require('dotenv').config();

const app = express();
app.use(express.urlencoded());

app.set('view engine', 'njk');
nunjucks.configure('./src/module', {
  autoescape: true,
  express: app,
});

const container = configureDI();
initializeCarModule(app, container);

const carController = container.get('CarController');
app.get('/', carController.index.bind(carController));

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});

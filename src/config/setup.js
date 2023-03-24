const express = require('express');
const configureDI = require('./di');
require('dotenv').config();

const app = express();
const container = configureDI(app);

const database = container.get('Sequelize');
container.get('CarModel');

database.sync({ force: true });

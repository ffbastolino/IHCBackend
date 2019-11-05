const express = require('express');
const wineRoutes = require('./wine');
const alimentos = require('./alimentos');
const docsRoutes = require('./docs');
const offerRoutes = require('./offeredWines');
const userRoutes = require('./user');
const usuario = require('./usuario');

const app = express();

app.use('/docs', docsRoutes);
app.use('/wine', wineRoutes);
app.use('/alimentos', alimentos);
app.use('/usuario',usuario);
app.use('/user', userRoutes);

module.exports = app;

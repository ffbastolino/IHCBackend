require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const logger = require('./config/logger');
const { initDB } = require('./config/database');
const { handlW2MError } = require('./middleware/handleError');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use('/api', routes);
app.use(handlW2MError);

async function initServer() {
  try {
    await initDB();
    const port = process.env.W2M_API_PORT || 3001;
    app.listen(port, () => logger.info(`MinhaAdega listening on port ${port}!`));
  } catch (error) {
    logger.error('initServer.error: ', error);
    process.exit(1);
  }
}

initServer();

module.exports = app;

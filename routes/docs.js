const express = require('express');
const swagger = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDoc = YAML.load('./docs/swagger.yaml');

const router = express.Router();

router.use('/', swagger.serve);
router.get('/', swagger.setup(swaggerDoc));

module.exports = router;

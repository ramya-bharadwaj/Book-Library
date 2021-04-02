const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./helpers/swagger.json');

const app = express();

app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/book', bookRoutes);

app.use((err, req, res, next) => {
    res.json(err).status(err.status)
})

module.exports = app;
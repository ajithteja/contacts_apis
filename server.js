const express = require('express');
const contactRoute = require('./routers/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const dbConnection = require('./db');
const userRoute = require('./routers/userRouters');

const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

dbConnection();

const port = process.env.PORT || 5000;

app.use('/api/contacts', contactRoute);
app.use('/api/user', userRoute);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'api is Working' });
});

app.listen(port, () => {
  console.log(`Server running at: ${port}`);
});

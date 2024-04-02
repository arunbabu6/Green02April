const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./Db.js');
require('dotenv').config();
const cors = require('cors');
const clientRequestRoutes = require('./routes/clientRequestRoutes.js');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 6969;

// init server
const app = express()

// middlewares
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' http://localhost:5173");
    next();
  });
app.use(bodyParser.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//  routes
app.use('/api', clientRequestRoutes)
app.use('/auth', authRoutes)

// database
connectDB();

// server
// const PORT = process.env.PORT || 6969;

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})

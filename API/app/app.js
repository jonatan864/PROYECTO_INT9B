const express = require('express')
const app = express()
const router = require('./routes/Router')
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', router)

module.exports = app;
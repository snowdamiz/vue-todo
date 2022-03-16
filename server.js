const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const todoRouter = require('./routes/api/todoItems')
require('dotenv').config()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.use('/api/todoItems', todoRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
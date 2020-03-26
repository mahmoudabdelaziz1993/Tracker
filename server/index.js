/**
 *  Setup Express Application
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user');
const passport = require('passport');
require('./config/passport');
const User = require('./models/User');



/**
 * Mongo  Database connection
 */
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.on("open", () => console.log(" Database connected"))
/**
 * Parse body in request  req.body
 */
app.use(bodyParser.urlencoded({ 
      extended: true, 
    })); 
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(cors());

app.use(morgan('dev'));

// app.use(passport.initialize())

app.get('/',async  (req, res) => res.send(await User.find()));

app.use('/auth', userRouter);


app
    .listen(process.env.PORT)
    .on('listening', () => console.log(` server is up on http://localhost:${process.env.PORT}`))

/**
 *  Setup Express Application
 */
const express =require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose  = require('mongoose');
require('dotenv').config();


/**
 * Mongo  Database connection
 */
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.on("open",()=> console.log(" Database connected"))
/**
 * Parse body in request  req.body
 */
app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.get('/',(req,res)=>res.send('It Works Ninja '));


app
.listen(process.env.PORT)
.on( 'listening',()=>console.log(` server is up on http://localhost:${process.env.PORT}`))

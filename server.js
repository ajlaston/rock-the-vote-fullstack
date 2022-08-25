const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(
    'mongodb://localhost:27017/userAuth',
    ()=>{
        console.log('connected to db');
    }
)

app.use('/auth', require('./routes/authRouter.js')); 
app.use('/api', expressjwt({secret : process.env.SECRET, algorithms : ['HS256']}) );
app.use('/api/issue', require('./routes/issueRouter.js'));
app.use('/api/comment', require('./routes/commentRouter.js'));

app.use((err, req, res, next)=>{
    console.log(err);
    if(err.name === 'UnauthorizedError'){
        res.status(err.status);
    }
    return res.send({errMsg : err.message}); 
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})


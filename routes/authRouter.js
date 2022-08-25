const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const authRouter = express.Router();

//sign up for app
authRouter.post('/signup', (req, res, next)=>{
  User.findOne({email : req.body.email.toLowerCase()}, (err, user)=>{

    //check for general errors
    if(err){
        res.status(500);
        return next(err);
    }

    //check if email is registered
    if(user){
        res.status(403);
        return next(new Error('email is already registered'));
    }

    //create new user with form data from client
    const newUser = new User(req.body);

    newUser.save((err, newUser)=>{
        if(err){
            res.status(500);
            return next(err)
        }

        const token = jwt.sign(newUser.withoutPassword(), process.env.SECRET);
        res.status(201).send({token, user : newUser.withoutPassword()});
    })


  })
})

//login
authRouter.post('/login', (req, res, next)=>{
    console.log(req.body)
    User.findOne({email : req.body.email.toLowerCase()}, (err, user)=>{
        
        if(err){
            res.status(500);
            return next(err); 
        }

        if(!user){
            res.status(500);
            return next(new Error("Email is not registered"));
        }

        user.checkPassword(req.body.password, (err, isMatch)=>{
            if(err){
                res.status(403);
                return next(new Error("Email or password are incorrect"));
            }
            if(!isMatch){
                res.status(403);
                return next(new Error('Email or Password are incorrect'));
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
            return res.status(200).send({token, user : user.withoutPassword()});
        })
    })
})

module.exports = authRouter;
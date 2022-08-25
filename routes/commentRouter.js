const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');

//post comment
commentRouter.post('/', (req, res, next)=>{
    req.body.user = req.auth._id;
    req.body.created = new Date().toLocaleString();
    const newComment = new Comment(req.body);

    newComment.save((err, savedComment)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(201).send(savedComment);
    })
})

//get all comments for a specific issue
commentRouter.get('/:issueId', (req, res, next)=>{

    Comment.find({issue : req.params.issueId}, (err, comments)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(200).send(comments);
    })
})

//delete specific comment 
commentRouter.delete('/:commentId', (req, res, next)=>{
    Comment.findByIdAndDelete({_id : req.params.commentId}, (err, comment)=>{
        if(err){
            res.status(500);
            return next(err)
        }

        return res.status(201).send(comment);
    })
})


module.exports = commentRouter;

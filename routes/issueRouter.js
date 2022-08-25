const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue');
const Comment = require('../models/comment');

//get all issues 
issueRouter.get('/', (req, res, next)=>{
    Issue.find({}, (err, allIssues)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(200).send(allIssues);
    })
})

//get issues for logged in user
issueRouter.get('/user', (req, res, next)=>{

    //sets user to auth id
    req.body.user = req.auth._id;

    Issue.find({user : req.body.user}, (err, issues)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        return res.status(200).send(issues);
    })
})

//create issue
issueRouter.post('/', (req, res, next)=>{
    req.body.user = req.auth._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        res.status(201).send(savedIssue);
    })
})

//update issue 
issueRouter.put('/:issueId', (req, res, next)=>{
    req.body.user = req.auth._id;
    Issue.findOneAndUpdate(
        {_id : req.params.issueId}, 
        req.body,
        {new : true},
        (err, updatedIssue)=>{

            if(err){
                res.status(500);
                return next(err);
            }

            res.status(201).send(updatedIssue);
    })
})

//upvotes
issueRouter.put('/upvote/:issueId', (req, res, next)=>{
    
    Issue.findOne({_id : req.params.issueId}, (err, issue)=>{
        if(err){
            res.status(500);
            return res.send(issue);
        }

        const hasVoted = issue.voted.includes(req.body.email);

        // if(hasVoted){
        //     res.status(401)
        //     return res.send('user has already voted on issue');
        // }

        const updatedVoted = [...issue.voted, req.body.email]; 

        Issue.findOneAndUpdate(
            {_id : req.params.issueId},
            {$inc : {upvotes : 1}, voted : [...updatedVoted] },
            {new : true},
            (err, updatedIssue) => {
                if(err){
                    res.status(500);
                    return next(err);
                }
                
                res.status(200).send(updatedIssue);
            }
        )
        
    })
})

//downvotes
issueRouter.put('/downvote/:issueId', (req, res, next)=>{
    Issue.findOne({_id : req.params.issueId}, (err, issue)=>{
        if(err){
            res.status(500);
            return res.send(issue);
        }

        const hasVoted = issue.voted.includes(req.body.email);

        // if(hasVoted){
        //     res.status(401)
        //     return res.send('user has already voted on issue');
        // }

        const updatedVoted = [...issue.voted, req.body.email]; 

        Issue.findOneAndUpdate(
            {_id : req.params.issueId},
            {$inc : {downvotes : -1}, voted : [...updatedVoted] },
            {new : true},
            (err, updatedIssue) => {
                if(err){
                    res.status(500);
                    return next(err);
                }
                
                res.status(200).send(updatedIssue);
            }
        )
        
    })
})

//deletes post and all comments
issueRouter.delete('/:issueId', (req, res, next)=>{
    Issue.findOneAndDelete({_id : req.params.issueId}, (err, issue)=>{
        if(err){
            res.status(500);
            return next(err);
        }

        if(!issue){
            res.status(500);
            return next(new Error('Post doesnt exist'));
        }

        Comment.deleteMany({issue : req.params.issueId}, (err, comments)=>{
            if(err){
                res.status(500);
                return next(err);
            }

            return res.status(201).send(issue);
        })
    })
})

module.exports = issueRouter;
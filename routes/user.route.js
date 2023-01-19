const express = require('express');
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User.model');


userRouter.get('/', async(req,res)=>
{
    res.send('Welcome to Signup Page')
})



// Signup Routes
userRouter.post('/signup',async(req,res)=>
{
    const {email,password}= req.body
    const userPresent = await UserModel.findOne({email: email})
    if(userPresent?.email)
    {
        res.send({"msg":"Already exist, Please loggin"})
    }else{
        try{
            bcrypt.hash(password,5, async(err, hash)=>
            {
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send({'msg':"Signup Successfully", user})
            })
            

        }
        catch(err)
        {
            console.log(err)
            res.send({"msg":"Something went wrong, Please try again later!"})
        }
    }

})



// Login Route
userRouter.post('/login',async(req,res)=>
{
    const {email, password} = req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0)
        {
            const hash_password = user[0].password
            bcrypt.compare(password,hash_password, function(err,result)
            {
                if(result)
                {
                    const token = jwt.sign({"userID":user[0]._id}, 'hush')
                    res.send({"msg":"Login successful", "token":token})
                }
                else{
                    res.send({"msg":"Login Failed, Please try again later"})
                }
            })
        }
        else{
            res.send({"msg":"Login Failed"})
        }
    }
    catch(err)
    {
        console.log('error in your login',err)
        res.send({'msg':"Something went wrong, Please try again later"})
    }
})







module.exports ={userRouter}
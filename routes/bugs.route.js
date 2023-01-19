const express = require('express');
const { BugModel } = require('../models/Bug.model');
const bugRouter = express.Router()




bugRouter.get('/', async(req,res)=>
{
    const bugs = await BugModel.find()
    res.send(bugs)
})

bugRouter.post('/create', async(req,res)=>
{
        const payload = req.body
        //get token from header
        //verify token using jwt
        try{
            const new_bug = new BugModel(payload)
            await new_bug.save()
            res.send({"msg" : "Note created successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"err" : "Something went wrong"})
        }
})


bugRouter.delete("/delete/:bugID", async (req, res) => {
    const bugID = req.params.bugID
    const bug = await BugModel.findOne({_id:bugID})
  
    
        await BugModel.findByIdAndDelete({_id : bugID})
        res.send({"msg" : "Note deleted successfully"})
    
})



module.exports ={bugRouter}
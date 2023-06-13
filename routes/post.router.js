const express = require("express");
const { PostModel } = require("../model/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PostRouter = express.Router();
const {auth} =require("../middleware/auth.middleware");

PostRouter.post("/add",auth, async(req,res)=>{
    try{
        const note=new PostModel(req.body);
        await note.save();
        res.json({msg:"New note has been added", note:req.body})
      }catch(err){
          res.json({error:err.message})
      }




})

PostRouter.get("/",auth,async(req,res)=>{
    try{
        const notes=await PostModel.find({userID:req.body.userID});
        
        res.json(notes);
      }catch(err){
          res.json({error:err.message})
      }
})


//http://localhost:3000/posts/update/6486e80d2847c7897401f823
PostRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} =req.params;
    try{
        const notes=await PostModel.findOne({_id:noteID})
        const userIDinNoteDoc=notes.userID
       if(userIDinUserDoc===userIDinNoteDoc){
            await PostModel.findByIdAndUpdate({_id:noteID}, req.body)
            res.json({msg:`{note.title} has been updated`})
       }else{
        res.json({msg:"Not Authorized"})
       }
    }catch(err){
        res.json({error:err.message})
    }
    
})
//http://localhost:3000/posts/delete/6486e80d2847c7897401f823
PostRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} =req.params;
    try{
        const notes=await PostModel.findOne({_id:noteID})
        const userIDinNoteDoc=notes.userID
       if(userIDinUserDoc===userIDinNoteDoc){
            await PostModel.findByIdAndDelete({_id:noteID})
            res.json({msg:`{note.title} has been deleted`})
       }else{
        res.json({msg:"Not Authorized"})
       }
    }catch(err){
        res.json({error:err.message})
    }
})
// http://localhost:3000/posts/filter?device=Laptop
PostRouter.get("/filter", auth, async (req, res) => {
    try {
      const { device } = req.query;
      const notes = await PostModel.find({ userID: req.body.userID, device });
      res.json(notes);
    } catch (err) {
      res.json({ error: err.message });
    }
  });
 // http://localhost:3000/posts/filter/comments?minComments=5&maxComments=7
  PostRouter.get("/filter/comments", auth, async (req, res) => {
    try {
      const { minComments, maxComments } = req.query;
      const notes = await PostModel.find({
        userID: req.body.userID,
        no_of_comments: { $gte: minComments, $lte: maxComments },
      });
      res.json(notes);
    } catch (err) {
      res.json({ error: err.message });
    }
  });
  // http://localhost:3000/posts/top
  PostRouter.get("/top", auth, async (req, res) => {
    try {
      const notes = await PostModel.find({ userID: req.body.userID })
        .sort({ no_of_comments: -1 })
        .limit(3);
      res.json(notes);
    } catch (err) {
      res.json({ error: err.message });
    }
  });


module.exports = { PostRouter };
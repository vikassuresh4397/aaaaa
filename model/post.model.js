const mongoose=require('mongoose');
const deviceEnum = ["Laptop", "Tablet", "Mobile"];

const PostSchema=mongoose.Schema({
   title:String,
   body:String,
   device: {
    type: String,
    enum: deviceEnum,
  },
   no_of_comments:Number,
   user:String,
   userID:String,
},{
    versionKey:false
})

const PostModel=mongoose.model("post",PostSchema);
module.exports={
    PostModel
}

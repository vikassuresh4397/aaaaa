const mongoose=require('mongoose');





const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age: Number,
    gender:String,
    city:String,
    is_married:Boolean
   

},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema);
module.exports={
    UserModel
}

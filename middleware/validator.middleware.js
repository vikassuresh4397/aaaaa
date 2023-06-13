const jwt = require('jsonwebtoken');
require("dotenv").config();

const validator=(req,res,next)=>{
//   Ru8@ length8
const {email,pass} =req.body;
if(!(email || pass)){
res.send({msg:"please fill the details"})
}else{
   let capAlpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let specialChar="@#$%^&*+-";
   let num="0123456789";
  let capAlphaArray=capAlpha.split("");
  let specialCharArray=capAlpha.split("");
  let numArray=capAlpha.split("");
let count=0,mount=0,rount=0,bount=0;
  for(let a=0;a<=capAlpha.length-1;a++){
   if(pass.includes(capAlpha[a])){
    count++;
    break;
   }
  }
 
  for(let a=0;a<=specialChar.length-1;a++){
    if(pass.includes(specialChar[a])){
        count++
       }
  }
  for(let a=0;a<=num.length-1;a++){
    if(pass.includes(num[a])){
        count++
       }
  }

  if(count==3){
    next();
  }else{

  }
 

}

}
module.exports = {validator};
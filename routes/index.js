var express = require('express');
var router = express.Router();
const Users = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

/* GET home page. */

router.post("/login", async function(req, res, next){
  try{
      let {password, username} = req.body;
      let user = await Users.findOne({
        username: username,
      });
      if(!user){
         return res.status(500).send({
          message: "login fail",
          success:false,
         });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if(!checkPassword){
        return res.status(500).send({          
          message: "Password incorrect",
          success: false,
      });
    }
const {_id, firstname, lastname, email} = user;   
const token = jwt.sign({_id, firstname, lastname, email} , process.env.JWT_KEY)
return res.status(201).send({  
  data: {_id, firstname, lastname, email,token},        
  message: "Login success",
  success: true,
  }); 
  }catch(error){
      return res.status(500).send({
          message:"fail to login",
          success:false,
      });
  }  
});
module.exports = router;

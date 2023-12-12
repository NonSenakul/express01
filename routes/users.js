var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")
const mongoose = require('mongoose');
const Users = require('../models/user.js');

/* GET users listing. */

router.get("/", async function(req, res, next){
  try{
      let users = await Users.find();
      return res.status(200).send({
          data: users,
          message: "success",
          success:true,
      });
  } catch(error){
      return res.status(500).send({
          message: "Server error",
          success: false,
      });
  }
});

router.get("/:id", async function(req, res, next){
    try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                message: "id Invalid",
                success: false,
                error: ["id is not a ObjectId"],
            });
        }

        let users = await Users.findById(id);
        return res.status(200).send({
            data: users,
            message: "success",
            success: true,
        });
    } catch(error){
        return res.status(500).send({
            message: "Server error",
            success: false,
        });
    }
});

router.post("/", async function(req, res, next){
  try{
      let {password, username, firstname, lastname, email} = req.body;
      let hashPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
          username,
          password: hashPassword,
          firstname,
          lastname,
          email,
      });

      const user = await newUser.save();
      return res.status(200).send({
          data: {_id: user._id, username, firstname, lastname, email},
          message: "create success",
          success: true,
      });
  }catch(error){
      return res.status(500).send({
          message:"Fail to create a user",
          success:false,
      });
  }
  
});

router.put("/:id", async function(req, res, next){
    try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                message: "id Invalid",
                success: false,
                error: ["id is not a ObjectId"],
            });
        }
        const {username, firstname, lastname, email} = req.body;
        let newUser = new Users({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
        });
        let user = await newUser.save();
        await Users.deleteOne({_id:id});
        let UpdatedUser = await Users.find();
        return res.status(201).send({
            data: UpdatedUser,
            message: "update success",
            success: true,
        });
    } catch(error){
        return res.status(500).send({
            message: "update user fail",
            success: false,
        });
    }
});


router.delete("/:id", async function(req, res, next){
    try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                message: "id Invalid",
                success: false,
                error: ["id is not a ObjectId"],
            });
        }
        await Users.deleteOne({_id:id});
        let DeletedUser = await Users.find();
        return res.status(200).send({
            data: DeletedUser,
            message: "delete user success",
            success: true,
        });
    } catch(error){
        return res.status(500).send({
            message: "delete fail",
            success: false,
        });
    }
});

module.exports = router;

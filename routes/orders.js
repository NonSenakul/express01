var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const orderModel = require('../models/order.js');
const productModel = require('../models/product.js');


router.get("/", async function(req, res, next){
    try{
        let orders = await orderModel.find();
        return res.status(200).send({
            data: orders,
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

router.get("/products/:id", async function(req, res, next){
    try{
        let orders = await orderModel.find();
        return res.status(200).send({
            data: orders,
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

router.post("/", async function(req, res, next){
    try{
        const {order_name, order_amount} = req.body;
        let newOrder = new orderModel({
            order_name: order_name,            
            order_amount: order_amount,
        });
        let order = await newOrder.save();
        return res.status(201).send({
            data: order,
            message: "create order success",
            success: true,
        });
    }catch(error){
        return res.status(500).send({
            message:"create fail",
            success:false,
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
        await orderModel.deleteOne({_id:id});
        let Deletedorder = await orderModel.find();
        return res.status(200).send({
            data: Deletedorder,
            message: "delete order success",
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
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const  productModel = require('../models/product.js');
const orderModel = require('../models/order.js');

/*Get users listing. */

router.get("/", async function(req, res, next){
    try{
        let products = await productModel.find();
        return res.status(200).send({
            data: products,
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
        
        let products = await productModel.findById(id);
        return res.status(200).send({
            data: products,
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
        const {product_name, price, amount} = req.body;
        let newProduct = new productModel({
            product_name: product_name,
            price: price,
            amount: amount,
        });
        let product = await newProduct.save();
        return res.status(201).send({
            data: product,
            message: "create success",
            success: true,
        });
    }catch(error){
        return res.status(500).send({
            message:"create fail",
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
        const {product_name, price, amount} = req.body;
        await productModel.updateOne({_id:id},{$set: req.body});
        let Updatedproduct = await productModel.find();
         return res.status(201).send({
            data: Updatedproduct,
            message: "update success",
            success: true,
        });
    } catch(error){
        return res.status(500).send({
            message: "update fail",
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
        await productModel.deleteOne({_id:id});
        let Deletedproduct = await productModel.find();
        return res.status(200).send({
            data: Deletedproduct,
            message: "delete success",
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
var express = require('express');
var router = express.Router();

let productModel = require('../schemas/product')

function buildQuery(obj){
  console.log(obj);
  let result = {};
  if(obj.name){
    result.name=new RegExp(obj.name,'i');
  }
  
  if(obj.price){
    result.price = {};
    if(obj.price.$gte){
      result.price.$gte = obj.price.$gte;
    }else{
      result.price.$gte = 0
    }
    if(obj.price.$lte){
      result.price.$lte = obj.price.$lte;
    }else{
      result.price.$lte = 10000;
    }
    
  }
  return result;
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  

  let products = await productModel.find(
    buildQuery(req.query)
);

  res.status(200).send({
    success:true,
    data:products
  });
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let product = await productModel.findById(id);
  try {
    if(product) {
      res.status(200).send({
        success:true,
        data:product
      });
    } else {
      res.status(404).send({
        success:false,
        message:"Product not found"
      });
    } 
  }
  catch (error) {
    res.status(404).send({
      success:false,
      message:"Product not found"
    });
  }
});


router.post('/', async function(req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price:req.body.price,
      quantity: req.body.quantity,
      category:req.body.category
    })
    await newProduct.save();
    res.status(200).send({
      success:true,
      data:newProduct
    });
  } catch (error) {
    res.status(404).send({
      success:false,
      message:error.message
    });
  }
});
module.exports = router;

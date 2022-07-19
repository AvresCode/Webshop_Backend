const { Router } = require("express");
const Product = require("../models").product;
const Category = require("../models").category

const router = new Router()

//http :4000/products
router.get("/", async (req, res, next) => {
    try {
      const products = await Products.findAll({raw:true, include:Category});
      res.send(products);
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  });

// specific product with it's category
//http :4000/products/id
 router.get("/:id", async(req, res, next) => {
  try{

 const productId = req.params.id

const specificProduct = await Product.findByPk(productId, {include:Category})

if (!specificProduct) {
  res.status(404).send("Product not found");
} else {
  res.send(specificProduct);}
 } catch(e){
    console.log(e.message);
    next(e);
  }
 })


module.exports = router
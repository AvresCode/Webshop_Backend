const { Router } = require("express");
const Products = require("../models").product;

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


 


module.exports = router
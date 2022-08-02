const { Router } = require("express");
const Product = require("../models").product;
const Category = require("../models").category;
const Review = require("../models").review;

const router = new Router();

//http :4000/products

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.send(products);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

// specific product with it's category
//http :4000/products/id
router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;

    const specificProduct = await Product.findByPk(productId, {
      include: [Category, Review],
    });

    if (!specificProduct) {
      res.status(404).send("Product not found");
    } else {
      res.send(specificProduct);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//post endpoint to create a review
// http POST :4000/products/3/review userId=1 rating=4 text='high quality'
router.post("/:id/review", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { rating, text } = req.body;
    const userId = 1;
    // const userId = req.body.userId
    //when you create, productId: productId
    // userId: 1
    if (!rating || !text) {
      res.status(400).send("missing parameters");
    } else {
      const newReview = await Review.create({
        userId,
        productId,
        rating,
        text,
      });
      res.json(newReview);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
/*
// get review for specific product
//http :4000/products/id/review
router.get("/:id/review", async (req, res, next) => {
  try {
    const productId = req.params.id;

    const specificProduct = await Product.findByPk(productId);
    const reviewForProduct = await Review.findAll({ include: specificProduct });

    if (!reviewForProduct) {
      res.status(404).send("There is no review yet");
    } else {
      res.send(reviewForProduct);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
}); */

module.exports = router;

const { Router } = require("express");
const Product = require("../models").product;
const Review = require("../models").review;

const router = new Router();

//get all reviews
//http GET :4000/reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: Product });
    res.send(reviews);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//post endpoint to create a review is inside products.js

module.exports = router;

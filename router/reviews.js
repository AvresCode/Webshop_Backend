const { Router } = require("express");
const Product = require("../models").product;
const Review = require("../models").review;

const router = new Router();

//get all reviews
//http :4000/reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: Product });
    res.send(reviews);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//post endpoint to create a review
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

module.exports = router;

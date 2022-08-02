const Category = require("./models").category;
const Product = require("./models").product;
const Review = require("./models").review;

/*const getProductsWithCategory = async() => {
    try{
const getProducts = await Product.findAll({raw:true, include:Category})
console.log(getProducts)
    }catch(e){
        console.log(e.message)
    }
}

getProductsWithCategory(); */

const getReviewWithProducts = async () => {
  try {
    const Reviews = await Review.findAll({ raw: true, include: Product });
    console.log(Reviews);
  } catch (e) {
    console.log(e.message);
  }
};
getReviewWithProducts();

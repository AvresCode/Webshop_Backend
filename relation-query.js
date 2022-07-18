const Category = require ("./models").category
const Product = require ("./models").product

const getProductsWithCategory = async() => {
    try{
const getProducts = await Product.findAll({raw:true, include:Category})
console.log(getProducts)
    }catch(e){
        console.log(e.message)
    }
}

getProductsWithCategory();
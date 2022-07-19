
const express = require("express");
const cors = require("cors");
const productRouter = require ("./router/products")
const app = express();
app.use(cors())
const PORT = 4000;

//test the server
//http POST :4000/echo hello=world
app.post("/echo", (req, res) => {
    res.json(req.body);
  });

 app.use(express.json());
 

  app.use("/products", productRouter);


app.listen(PORT, () => {console.log('Listening on port 4000')});
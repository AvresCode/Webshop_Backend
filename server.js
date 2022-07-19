
const express = require("express");
const productRouter = require ("./router/products")
const app = express();
const PORT = 4000;


//test the server
//http POST :4000/echo hello=world
app.post("/echo", (req, res) => {
    res.json(req.body);
  });

//http://localhost:4000
app.get("/", (req, res) => res.send("Hello"));
app.use(express.json())

 // app.use(cors())

  app.use("/products", productRouter);


app.listen(PORT, () => {console.log('Listening on port 4000')});
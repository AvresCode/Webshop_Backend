mkdir <directory name>
cd <directory name>
npm init -y 
git init
touch .gitingnore
inside git ignore: node_modules/


//express part
npm i express
touch index.js
inside index.js:
const express = require("express");
const app = express();
const PORT = 4000
app.listen(PORT, () => {
    console.log('listening on port 4000')
})


// Start the server:
npx nodemon <name>
http://localhost:4000


//sequelize
npm install sequelize sequelize-cli
npm install pg
npx sequelize-cli init

//Create a new ElephantSQL instance

//Connect database 
 Inside config.json : development => "url": "copy the URL from ElephantSQL", "dialect": "postgres"

 //check: 
 npx sequelize-cli db:migrate

 ////Dbeaver: 
make new database connection Choose postgreSQL Copy the details of elephantsql.com to Dbeaver
** copy server to host without (), user & default database to database and username,  password to password 

//check: 
 npx sequelize-cli db:migrate


 //modify
Inside models/index.js change line 15 to:
sequelize = new Sequelize(config.url, config);


//generate models 
npx sequelize-cli model:generate --name <user> --attributes <name>:string,<email>:string,<phone>:integer,<password>:string



//modify the models manually , adding constraints:
//both in models and migrations files

** model/modelName => inside model.init put the value of the attributes inside an object
email: {type: DataTypes.STRING, allowNull: false, unique: true },

** migration/modelName:
Add the constraints you added to the models


// Generate table by running the migration:
 npx sequelize-cli db:migrate 

 //check on dbeaver : 
 <dataName> : databases : < dataName>: schemas : public : tables  
 use refresh button to see the updates


 //***REST:

 create a router folder and inside it make js files (users.js)
 //Import the Router class from express : 
 const { Router } = require("express");

 //Import the corresponding model:
  const User = require("../models").user;

 //Instantiate a router:
 const router = new Router()

//Export the router:
module.exports = router

//Import the router inside top level index.js (where we have express):
const userRouter = require ("./routers/users")

// Register the router with corresponding root path (/users)
inside index.js: app.use(userRouter);

//Register a GET / route that responds with all the <users>:
router.get("/users", async() => {...}) 

//*** if we define the route inside app.use("/users",userRouter), we should change the route inside router.get("/")

//check :
 http :4000/users
 http://localhost:4000/users

 

//Setup parser middleware:
//Inside index.js, register the jsonParser from express
const jsonParser = express.json();
app.use(jsonParser);

//create a new user
    app.post("/", async (req, res, next) => {
        try {
        const user = await User.create(req.body);
        res.json(user);
        } catch (e) {
        next(e);
        }
    }); 
 //check if the user is created:  
  http POST :4000/users
  http://localhost:4000/users
  Refresh users table in DBeaver 


  //Hashing password
  npm install bcrypt

  inside users.js:
  const bcrypt = require("bcrypt");

inside users.js router.post before const newUser
  const encrypted = bcrypt.hashSync(password, 10);

add encrypted as a value to newUser password
  const newUser = await User.create({ name, email, password: encrypted });

  //check:
  http 4000:users email=jjh@gg.com name=serva password=tr54r

  check the Dbeaver to see encrypted password/ remember password when creating!





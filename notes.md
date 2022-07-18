 Dbeaver: make new database connection 
 Choose postgreSQL
Copy the details of elephantsql.com to Dbeaver (copy server to host without (), user & default database to user, password)
//SQL types (like VARCHAR, TEXT or INTEGER)
//ORM object relational mapping
npm init -y
git init
touch .gitignore
Add node_modules/ to gitignore

//Sequelize is a popular ORM library for JavaScript
npm install sequelize sequelize-cli
npm install pg
**//sequelize sequelize-cli pg
Initialization: npx sequelize-cli init 

//Connect our database by modifying config.json
In config.json : development => 
"url": "copy the URL from ElephantSQL"   // This is called connection string.

//Try it
npx sequelize-cli db:migrate

//we tell sequelize to use our url config when querying the data through the models.
change line 15 in models/index.js to :
sequelize = new Sequelize(config.url, config) 

//Define a model === table
npx sequelize-cli model:generate --name user --attributes name:string,email:string,phone:integer,password:string

//run the migration to generate the table.
npx sequelize-cli db:migrate 
//to check the data if created: 
DBeaver : postgres : databases : < name>: schemas : public : refresh / : tables



//Seeding a database : providing initial set of data to a database. 
//generate the skeleton of a seed file
npx sequelize-cli seed:generate --name some-users
 

//Add data to the file inside seeder using  await queryInterface.bulkInsert(....
// Check if the data is created

npx sequelize-cli db:seed:all
//to undo the seeds
npm sequelize-cli db:seed:undo:all

//ponit to a specific seed file to run instead of all using the --seed flag

npx sequelize-cli db:seed --seed 202212344444-some-users

//when getting error while running seed it's better to start from scratch:
//1. npx sequelize-cli db:migrate:undo:all
//2.npx sequelize-cli db:migrate 
//3. npx sequelize-cli db:seed:all

//to add some new attributes to the data:
//1. add attribute to the model manually
//2. generate migration skeleton:

npx sequelize-cli migration:generate --name first-migration  

//this creates a file inside migrations folder
//use queryInterface.addColumn() for up and  queryInterface.removeColumn() down. inside () => "table name", "new column name", {config like type, unique}, {}

then try:
npx sequelize-cli db:migrate


//Getting data out of table
Before starting express we create query.js file just to try if we can get some data back 

const User = require('./models').user;

Write below codes inside async function with try catch: 

const user = await User.findAll() // get all rows
const user = await User.findByPk(id) // get user by id
const specificUser = await User.findOne({ where: { name: "Dave" } });

User.findAll({where: {admin:true}})

we can create or delete a user in query.js

const newUser = await User.create({})

const theUser = await User.findByPk(id);
await theUser.destroy()

run node query.js in the terminal to check the changes and then check Dbeaver

npm i express
create server.js 

const express = require("express");
const User = require('./models').user;
const PORT = 4000;
const app = express()

app.get("/users", async (request, response, next) => {
    try{
        const users = await User.findAll();
        response.send(users)
    }catch(e){
        console.log(e.message);
        next(e)
    }
})

app.listen(PORT, () => console.log('Listening on port 4000') )

terminal: node server.js  / npx nodemon server.js

http://localhost:4000/users
from terminal to check the data: http -v GET 4000/users

app.get('users/:id')
User.findByPk(req.params.id)

to add unique to email, we add it to the model and migration files both. 
in the user.js we make the value of email as an object as it has two properties 







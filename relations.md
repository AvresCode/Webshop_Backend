//Undo all your migrations

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all --to <name of migration >

generate a new migration:
npx sequelize-cli migration:generate --name set-up-relations

//inside user model: 
static associate(models) {
  user.hasMany(models.toDoList, { foreignKey: 'userId' });
};

//inside toDoList model:
static associate(models) {
  toDoList.belongsTo(models.user, { foreignKey: 'userId' }));
};

//inside relations migration: add a new column userId to toDoList table
await queryInterface.addColumn("toDoLists", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("toDoLists", "userId");
  }

  //run the migration: 

  npx sequelize-cli db:migrate => check on dbeaver
   undo the last migration before making the next relation:
  npx sequelize-cli db:migrate:undo 

  inside relations migration: add a new column listId to toDoItems table

  //Add id to to the seeder
  npx sequelize-cli db:migrate:undo:all
  in the seeder file of todoLists add userId to all lists
  ...userId: 2,

  //seed all 
  npx sequelize-cli db:seed:all



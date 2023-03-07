const mongoose = require("mongoose");

const app = require("./app");

// const DB_HOST =
//   "mongodb+srv://Anastasiia:z8JKHA9zwZ8IvoZq@cluster0.hpmkvs5.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// Anastasiia z8JKHA9zwZ8IvoZq

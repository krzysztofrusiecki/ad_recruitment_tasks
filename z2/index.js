require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const todosRouter = require("./rotues/todos");
const authRouter = require("./rotues/users");
const verifyToken = require("./middlewares/verifyToken");

// Test DB
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));
// db.sequelize.sync({ force: true });
db.sequelize.sync();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(verifyToken);
app.use("/todos", todosRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`App running on http://localhost:4000`);
});

const userRouter = require("express").Router();
const { getAllUsers, addUser } = require("../../controllers/userController");
// const { userData } = require("../../models/data");

userRouter.get("/getallusers", getAllUsers);
userRouter.post("/adduser", addUser);

module.exports = userRouter;

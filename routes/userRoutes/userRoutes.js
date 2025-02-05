const userRouter = require("express").Router();
const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserbyId,
  findUserByName,
} = require("../../controllers/userController");
// const { userData } = require("../../models/data");

userRouter.get("/getallusers", getAllUsers);
userRouter.get("/getuserbyid/:userid", getUserbyId);
userRouter.get("/getbyname/search", findUserByName);
userRouter.post("/adduser", addUser);
userRouter.delete("/deleteuser/:userid", deleteUser);
userRouter.put("/updateuser/:userid", updateUser);

module.exports = userRouter;

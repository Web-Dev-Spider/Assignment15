const express = require("express");

const userRouter = require("./routes/userRoutes/userRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "You are at the home page" });
});

app.listen(3000, (req, res) => {
  console.log("App is listening to port 3000");
});

const dataStore = require("../models/data");
let userData = dataStore.userData;

const getAllUsers = (req, res) => {
  //Fetching all users
  const allUsers = userData;
  //   console.log("Total users", allUsers.length);
  if (!allUsers) return res.status(404).json({ message: "Couldn't fetch users." });
  //else
  return res.status(200).json({ message: "List of all users", allUsers });
};

const addUser = (req, res) => {
  console.log(req.body);
  const { name, email, age } = req.body;
  let { id } = req.body;
  const allUsers = userData;
  console.log("Id received from body", typeof id);
  //   console.log(userData);
  // console.log("User id", userData[userData.length - 1].id);
  if (!id) {
    id = allUsers[allUsers.length - 1].id + 1;
  }

  if (allUsers.some((user) => user.id === parseInt(id))) {
    console.log(`A user with this id ${id} already exists`);
    return res.status(400).json({ message: "A user with this id already exists" });
  }

  //   console.log(name);
  if (!name || !email || !age) return res.status(400).json({ message: "All fields are required" });
  const newUser = { id: id, name, email, age };
  console.log(newUser);
  userData.push(newUser);
  console.log("Updated user data \n", userData);
  //   console.log(userData);

  res.status(201).json({ message: "New user added", newUser }); //201 new record created
};

// Delete user
const deleteUser = (req, res) => {
  const id = parseInt(req.params.userid);
  console.log(id);
  //Checks for if  NOT(any user has an id equal to the user.id)
  if (!userData.some((user) => user.id === id)) {
    console.log("The user does not exist");
    return res.status(404).json({ message: "The user does not exist", user: id });
  }
  userData = userData.filter((user) => user.id !== parseInt(id));

  return res.status(200).json({ message: `The user with id ${id} deleted successfully`, newUserData: userData });
};

//Get user by id
const getUserbyId = (req, res) => {
  const userid = parseInt(req.params.userid);
  //   const { userid } = req.params;
  const user = userData.find((user) => user.id === userid);
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "The user does not exist", userid });
  }
  console.log(user);
  return res.status(200).json({ message: "User found", user });
};

//Update user data
const updateUser = (req, res) => {
  const userId = parseInt(req.params.userid);
  const userIndex = userData.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: `The user with id ${userId} does not exist` });
  }
  const { name, email, age } = req.body;
  if (name) userData[userIndex].name = name;
  if (email) userData[userIndex].email = email;
  if (age) userData[userIndex].age = age;
  return res
    .status(200)
    .json({ message: `The details of the user ${userId} updated successfully`, updatedUserData: userData });
};

const findUserByName = (req, res) => {
  const searchTerm = req.query.name.toLowerCase();
  console.log(searchTerm);
  const searchRetult = userData.filter((user) => user.name.toLowerCase().includes(searchTerm));
  if (searchRetult.length > 0) {
    console.log("Exists", typeof searchRetult);
    console.log(searchRetult);
    return res.status(200).json({ message: "Found users with name ${searchTerm}", searchRetult });
  } else return res.status(404).json({ message: `User with name ${searchTerm} has not found` });
};
module.exports = { getAllUsers, addUser, deleteUser, updateUser, getUserbyId, findUserByName };

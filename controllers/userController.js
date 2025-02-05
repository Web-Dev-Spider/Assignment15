const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 34,
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 22,
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    age: 45,
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    age: 30,
  },
  {
    id: 6,
    name: "Eva Green",
    email: "eva.green@example.com",
    age: 29,
  },
  {
    id: 7,
    name: "Frank Wilson",
    email: "frank.wilson@example.com",
    age: 50,
  },
  {
    id: 8,
    name: "Grace Hall",
    email: "grace.hall@example.com",
    age: 27,
  },
  {
    id: 9,
    name: "Henry Lee",
    email: "henry.lee@example.com",
    age: 33,
  },
  {
    id: 10,
    name: "Ivy Clark",
    email: "ivy.clark@example.com",
    age: 26,
  },
];

const getAllUsers = (req, res) => {
  const allUsers = userData;
  //   console.log("Total users", allUsers.length);
  !allUsers && res.status(404).json({ message: "Couldn't fetch users." });
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
    console.log("A user with this id already exists");
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

module.exports = { getAllUsers, addUser };

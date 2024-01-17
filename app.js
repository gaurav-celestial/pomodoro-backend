const express = require("express");
const cors = require("cors");

const app = express();
let { taskGroups, users } = require("./content/data.js");

app.use(cors());
app.use(express.json());

app.get("/api/taskGroups/:userId", (req, res) => {
  const { userId } = req.params;

  const filteredTaskGroups = taskGroups.filter(
    (taskGroup) => userId === taskGroup.userId
  );

  console.log("request in get");
  res.status(200).json(filteredTaskGroups);
});

app.post("/api/taskGroups", (req, res) => {
  console.log("request in post");
  taskGroups.push(req.body.allTasks);
  res.status(200).json(taskGroups);
});

app.put("/api/taskGroups", (req, res) => {
  console.log("request in put");
  const newTaskGroup = taskGroups.filter((taskGroup) => {
    return taskGroup.id !== req.body.currentTaskState.taskGroup.id;
  });
  newTaskGroup.push(req.body.currentTaskState.taskGroup);
  taskGroups = [...newTaskGroup];
  res.status(200).json(taskGroups);
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  console.log(users);

  const loggedUser = users.find((user) => {
    const reqUser = req.body.user;
    const reqPass = req.body.password;

    console.log(reqUser, "--", user.user);
    console.log(reqPass, "--", user.password);

    return user.user === reqUser && user.password === reqPass;
  });

  if (loggedUser) {
    res.status(200).json({ success: true, user: loggedUser });
  } else {
    res.status(404).json({ message: "user does not exists" });
  }
});

app.post("/api/signup", (req, res) => {
  users.push(req.body);
  res.status(200).json({ success: true });
});

app.listen(5000, () => {
  console.log("server is running on ", 5000);
});

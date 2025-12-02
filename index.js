const express = require("express");
const app = express();
const connect = require("./dbConnection");
app.use(express.json());
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { User, Game } = require("./models");
const UserInputSchema = require("./types");
const userAuthMiddleware = require("./authMiddlewares");

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const { success, data } = UserInputSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ msg: "invalid inputs" });
  }
  await User.create({
    username,
    password,
  });
  res.json({ msg: "user created" });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const { success, data } = UserInputSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ msg: "invalid inputs" });
  }
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const token = jwt.sign(
    { username: user.username, userId: user._id },
    secret,
    { expiresIn: "30d" }
  );

  res.json({ token: token });
});

app.post("/createGame", userAuthMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "please provide the room name" });
  }

  await Game.create({
    name: name,
    player1: req.userId,
  });

  res.json({ msg: "game created" });
});

app.post("/joingame/:gameId", userAuthMiddleware, async (req, res) => {
  const gameId = req.params;
  if (!gameId) {
    return res.status(400).json({ msg: "gameId required" });
  }

  const room = await Game.findById({ gameId });

  if (!room) {
    return res.status(404).json({ msg: "room not found" });
  }

  room.player2 = req.userId;

  await room.save();
  res.json({ msg: "joined room" });
});
connect();
const server = app.listen(3060, () => {
  console.log("HTTP server running on port 3060");
});

// IMPORT YOUR WEBSOCKET SERVER
const initWebSocket = require("./websocketServer");

// START WEBSOCKET SERVER + ATTACH TO HTTP SERVER
initWebSocket(server);

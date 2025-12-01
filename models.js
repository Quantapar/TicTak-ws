const mongoose = require("mongoose");
const { number } = require("zod");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const GameSchema = new mongoose.Schema({
  name: String,
  player1: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  player2: { type: mongoose.Types.ObjectId, ref: "users" },
  moves: [
    {
      x: number,
      y: number,
    },
  ],
});

const User = mongoose.model("users", UserSchema);
const Game = mongoose.model("games", GameSchema);
module.exports = { User, Game };

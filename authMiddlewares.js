const express = require("express");
const app = express();
require("dotenv").config();
const secret = process.env.SECRET;

const jwt = require("jsonwebtoken");

function userAuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ msg: "token not provided" });
  }
  const words = token.split(" ");
  const jwtToken = words[1];

  try {
    const decoded = jwt.verify(jwtToken, secret);

    req.username = decoded.username;
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({ msg: "invalid or expired token" });
  }
}
module.exports = userAuthMiddleware;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  dbHost: process.env.HOST,
  dbUser: process.env.USER,
  dbPassword: process.env.PASSWORD,
  dbDatabase: process.env.DATABASE
};
exports["default"] = _default;
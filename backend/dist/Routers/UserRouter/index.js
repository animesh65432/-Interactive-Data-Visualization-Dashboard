"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = __importDefault(require("../../Controllers"));
const { CreateUser, logintheuser } = Controllers_1.default.UserControllers;
const userrouter = (0, express_1.Router)();
userrouter.post("/create", CreateUser);
userrouter.post("/login", logintheuser);
exports.default = userrouter;

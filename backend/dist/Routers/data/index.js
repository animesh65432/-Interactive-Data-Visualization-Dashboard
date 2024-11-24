"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controllers_1 = __importDefault(require("../../Controllers"));
const middleware_1 = __importDefault(require("../../middleware"));
const { RetrieveFilteredData } = Controllers_1.default.datavislation;
const dataRouter = (0, express_1.Router)();
dataRouter.get("/GetData", middleware_1.default, RetrieveFilteredData);
exports.default = dataRouter;

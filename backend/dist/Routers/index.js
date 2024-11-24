"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRouter = exports.userrouter = void 0;
const UserRouter_1 = __importDefault(require("./UserRouter"));
exports.userrouter = UserRouter_1.default;
const data_1 = __importDefault(require("./data"));
exports.dataRouter = data_1.default;

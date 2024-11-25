"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Routers_1 = require("./Routers");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/user", Routers_1.userrouter);
app.use("/data", Routers_1.dataRouter);
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "just started"
    });
});
app.listen(process.env.PORT || 4000, () => {
    console.log(`server start at the port ${process.env.PORT}`);
});

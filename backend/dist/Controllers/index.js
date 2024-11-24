"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Datavislation_1 = require("./Datavislation");
const Controllers = {
    UserControllers: { CreateUser: User_1.CreateUser, logintheuser: User_1.logintheuser },
    datavislation: { RetrieveFilteredData: Datavislation_1.RetrieveFilteredData }
};
exports.default = Controllers;

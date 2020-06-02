"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/users', function (req, res) {
    res.status(200).json({ list: 'user' });
});
var port = process.env.PORT || 3333;
app.listen(port);

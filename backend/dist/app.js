"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const morgan_1 = __importDefault(require("morgan"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const errorHandler_1 = require("./middlewares/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
require('dotenv').config();
const app = express();
app.use((0, morgan_1.default)('combined'));
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter_1.default);
app.use("/auth", authRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawler_1 = __importDefault(require("./crawler"));
const firstAnalyzer_1 = __importDefault(require("./firstAnalyzer"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Spyder start crawling!!!");
});
router.get("/getData", (req, res) => {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = firstAnalyzer_1.default.getInstance();
    new crawler_1.default(url, analyzer);
    res.send("Success");
});
exports.default = router;

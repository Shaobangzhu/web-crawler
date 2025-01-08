"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const util_1 = require("./utils/util");
const crawler_1 = __importDefault(require("./utils/crawler"));
const firstAnalyzer_1 = __importDefault(require("./utils/firstAnalyzer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Middleware to check if the user is logged in or not
const checkLogin = (req, res, next) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    }
    else {
        res.json((0, util_1.getResponseData)(null, "Please Log In with Your Credential First!"));
    }
};
const router = (0, express_1.Router)();
router.get("/", () => { });
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("Already logged in");
    }
    else {
        if (password === "extron" && req.session) {
            req.session.login = true;
            res.json((0, util_1.getResponseData)(true));
        }
        else {
            res.json((0, util_1.getResponseData)(false, "Log In Failure!"));
        }
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.json((0, util_1.getResponseData)(true));
});
router.get("/crawl", checkLogin, (req, res) => {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = firstAnalyzer_1.default.getInstance();
    new crawler_1.default(url, analyzer);
    res.json((0, util_1.getResponseData)(true, "Crawling Succeed!"));
});
router.get("/showData", checkLogin, (req, res) => {
    try {
        const dir = path_1.default.resolve(__dirname, "C:/Projects/learn-js/web-crawler/data/course.json");
        const result = fs_1.default.readFileSync(dir, "utf8");
        res.json((0, util_1.getResponseData)(JSON.parse(result)));
    }
    catch (error) {
        res.json((0, util_1.getResponseData)(false, "Data does not exist!"));
    }
});
exports.default = router;

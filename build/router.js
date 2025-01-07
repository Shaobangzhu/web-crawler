"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawler_1 = __importDefault(require("./crawler"));
const firstAnalyzer_1 = __importDefault(require("./firstAnalyzer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send(`
      <html>
        <body>
          <a href='/crawl'>Get Data</a><br />
          <a href='/showData'>Show Data</a><br />
          <a href='/logout'>Log Out</a>
        </body>
      </html>
    `);
    }
    else {
        res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>Log In</button>
          </form>
        </body>
      </html>
    `);
    }
});
router.post("/login", (req, res) => {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("Already logged in");
    }
    else {
        if (password === "extron" && req.session) {
            req.session.login = true;
            res.send("Log In Succeed!");
        }
        else {
            res.send("Log In Failure!");
        }
    }
});
router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect("/");
});
router.get("/crawl", (req, res) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        const secret = "x3b174jsx";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = firstAnalyzer_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        res.send("Crawling Succeed!");
    }
    else {
        res.send("Please Log In with Your Credential First!");
    }
});
router.get("/showData", (req, res) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        try {
            const dir = path_1.default.resolve(__dirname, "C:/Projects/learn-js/web-crawler/data/course.json");
            const result = fs_1.default.readFileSync(dir, "utf8");
            res.json(JSON.parse(result));
        }
        catch (error) {
            res.send("Data has not been crawlled yet");
        }
    }
    else {
        res.send("Please Log In with Your Credential First!");
    }
});
exports.default = router;

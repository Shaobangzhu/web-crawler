"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Decorator_1 = require("./Decorator");
const util_1 = require("../utils/util");
const crawler_1 = __importDefault(require("../utils/crawler"));
const firstAnalyzer_1 = __importDefault(require("../utils/firstAnalyzer"));
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
let Crawl = class Crawl {
    crawl(req, res) {
        const secret = "x3b174jsx";
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyzer = firstAnalyzer_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        res.json((0, util_1.getResponseData)(true));
    }
    showData(req, res) {
        try {
            const dir = path_1.default.resolve(__dirname, "C:/Projects/learn-js/web-crawler/data/course.json");
            const result = fs_1.default.readFileSync(dir, "utf8");
            res.json((0, util_1.getResponseData)(JSON.parse(result)));
        }
        catch (error) {
            res.json((0, util_1.getResponseData)(false, "Data does not exist!"));
        }
    }
};
__decorate([
    (0, Decorator_1.get)("/crawl"),
    (0, Decorator_1.use)(checkLogin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Crawl.prototype, "crawl", null);
__decorate([
    (0, Decorator_1.get)("/showData"),
    (0, Decorator_1.use)(checkLogin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Crawl.prototype, "showData", null);
Crawl = __decorate([
    Decorator_1.controller
], Crawl);

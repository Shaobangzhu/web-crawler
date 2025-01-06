"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawler = void 0;
const superagent_1 = __importDefault(require("superagent"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const firstAnalyzer_1 = __importDefault(require("./firstAnalyzer"));
class Crawler {
    /**
     * Fetches the raw HTML content from a given URL
     * @param url
     * @returns html content in string format
     */
    htmlFetcher(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield superagent_1.default.get(url);
                if (result.status !== 200) {
                    throw new Error(`Failed to fetch URL: ${url}, Status: ${result.status}`);
                }
                return result.text;
            }
            catch (error) {
                console.error("Error fetching HTML:", error);
            }
        });
    }
    /**
     * Saves the structured data (extracted by HtmlParser) into a JSON file for future use.
     * @param content json format which is stringified
     */
    dataSaver(content) {
        fs_1.default.writeFileSync(this._filePath, content);
    }
    initSpyderProcess(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.htmlFetcher(url);
            const fileContent = this.analyzer.analyze(html, this._filePath);
            this.dataSaver(fileContent);
        });
    }
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        this._filePath = path_1.default.resolve(__dirname, '../data/course.json');
        this.initSpyderProcess(url);
    }
}
exports.Crawler = Crawler;
const secret = "x3b174jsx";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = firstAnalyzer_1.default.getInstance();
const crawler = new Crawler(url, analyzer);

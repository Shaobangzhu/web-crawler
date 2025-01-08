"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decorator_1 = require("./controller/decorator");
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/Login");
const app = (0, express_1.default)();
const port = 7001;
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['clu'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(decorator_1.router);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

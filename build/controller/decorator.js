"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
exports.controller = controller;
exports.use = use;
const router_1 = __importDefault(require("../router"));
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
})(Methods || (Methods = {}));
function controller(target) {
    Object.getOwnPropertyNames(target.prototype).forEach((item) => {
        // skip constructor by default
        if (item !== "constructor") {
            const path = Reflect.getMetadata("path", target.prototype, item);
            const method = Reflect.getMetadata("method", target.prototype, item);
            const handler = target.prototype[item];
            const middleware = Reflect.getMetadata("middleware", target.prototype, item);
            if (path && method && handler) {
                if (middleware) {
                    router_1.default[method](path, middleware, handler);
                }
                else {
                    router_1.default[method](path, handler);
                }
            }
        }
    });
}
function use(middleware) {
    return (target, key) => {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}
function getRequestDecorator(type) {
    return (path) => {
        return (target, key) => {
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator(Methods.get);
exports.post = getRequestDecorator(Methods.post);

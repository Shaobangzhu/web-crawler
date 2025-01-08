"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.router = void 0;
exports.controller = controller;
exports.use = use;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
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
                    exports.router[method](path, middleware, handler);
                }
                else {
                    exports.router[method](path, handler);
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
exports.get = getRequestDecorator("get");
exports.post = getRequestDecorator("post");

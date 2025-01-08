"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
exports.controller = controller;
exports.get = get;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
function controller(target) {
    Object.getOwnPropertyNames(target.prototype).forEach((item) => {
        // skip constructor by default
        if (item !== "constructor") {
            const path = Reflect.getMetadata("path", target.prototype, item);
            const handler = target.prototype[item];
            if (path) {
                exports.router.get(path, handler);
            }
        }
    });
}
function get(path) {
    return (target, key) => {
        Reflect.defineMetadata("path", path, target, key);
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = use;
require("reflect-metadata");
function use(middleware) {
    return (target, key) => {
        Reflect.defineMetadata("middleware", middleware, target, key);
    };
}

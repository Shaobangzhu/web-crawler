"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
exports.get = get;
function controller(target) {
    Object.getOwnPropertyNames(target.prototype).forEach((item) => {
        // 排除默认的constructor属性
        if (item !== "constructor") {
            const data = Reflect.getMetadata("path", target.prototype, item);
            console.log(data);
        }
    });
}
function get(path) {
    return (target, key) => {
        Reflect.defineMetadata("path", path, target, key);
    };
}

import { Router } from "express";
export const router = Router();

enum Method {
  get = "get",
  post = "post",
}

export function controller(target: any) {
  Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
    // skip constructor by default
    if (item !== "constructor") {
      const path = Reflect.getMetadata("path", target.prototype, item);
      const method: Method = Reflect.getMetadata(
        "method",
        target.prototype,
        item
      );
      const handler = target.prototype[item];
      if (path && method && handler) {
        router[method](path, handler);
      }
    }
  });
}

function getRequestDecorator(type: string) {
  return (path: string) => {
    return (target: any, key: string) => {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
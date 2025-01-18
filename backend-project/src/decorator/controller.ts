import { RequestHandler } from 'express';
import router from '../router';

enum Methods {
  get = "get",
  post = "post",
}

export function controller(root: string) {
  return (target: new (...args: any[]) => any) => {
    Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
      // skip constructor by default
      if (item !== "constructor") {
        const path = Reflect.getMetadata("path", target.prototype, item);
        const method: Methods = Reflect.getMetadata(
          "method",
          target.prototype,
          item
        );
        const middleware: RequestHandler = Reflect.getMetadata(
          "middleware",
          target.prototype,
          item
        );
        const handler = target.prototype[item];
        
        if (path && method) {
          const fullPath = root === '/' ? path : `${root}${path}`;
          if (middleware) {
            router[method](fullPath, middleware, handler);
          } else {
            router[method](fullPath, handler);
          }
        }
      }
    });
  }
}
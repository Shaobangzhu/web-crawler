import router from '../router';

enum Methods {
  get = "get",
  post = "post",
}

export function controller(target: any) {
  Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
    // skip constructor by default
    if (item !== "constructor") {
      const path = Reflect.getMetadata("path", target.prototype, item);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        item
      );
      const handler = target.prototype[item];
      const middleware = Reflect.getMetadata(
        "middleware",
        target.prototype,
        item
      );
      if (path && method && handler) {
        if (middleware) {
          router[method](path, middleware, handler);
        } else {
          router[method](path, handler);
        }
      }
    }
  });
}
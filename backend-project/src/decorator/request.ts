import { Crawl, Login } from '../controller';

enum Methods {
  get = "get",
  post = "post",
}

function getRequestDecorator(type: Methods) {
  return (path: string) => {
    return (target: Crawl | Login, key: string) => {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
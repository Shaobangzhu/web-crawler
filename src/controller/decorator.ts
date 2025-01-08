import { Router } from "express";
export const router = Router();

export function controller(target: any) {
  Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
    // skip constructor by default
    if (item !== "constructor") {
      const path = Reflect.getMetadata("path", target.prototype, item);
      const handler = target.prototype[item];
      if (path) {
        router.get(path, handler);
      }
    }
  });
}

export function get(path: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata("path", path, target, key);
  };
}

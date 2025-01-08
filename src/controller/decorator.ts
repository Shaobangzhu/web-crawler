export function controller(target: any) {
  Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
    // 排除默认的constructor属性
    if (item !== "constructor") {
      const data = Reflect.getMetadata("path", target.prototype, item);
      console.log(data);
    }
  });
}

export function get(path: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata("path", path, target, key);
  };
}

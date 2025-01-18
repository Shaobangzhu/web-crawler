import 'reflect-metadata';
import { RequestHandler } from "express";
import { Crawl, Login } from '../controller';

export function use(middleware: RequestHandler) {
  return (target: Crawl | Login, key: string) => {
    Reflect.defineMetadata("middleware", middleware, target, key);
  };
}
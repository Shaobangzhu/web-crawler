"use strict";
// import { Router, Request, Response, NextFunction } from "express";
// import { getResponseData } from "./utils/util";
// import fs from "fs";
// import path from "path";
// interface BodyRequest extends Request {
//   body: { [key: string]: string | undefined };
// }
// const router = Router();
// router.get("/crawl", checkLogin, (req: BodyRequest, res: Response) => {
//   const secret = "x3b174jsx";
//   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
//   const analyzer = FirstAnalyzer.getInstance();
//   new Crawler(url, analyzer);
//   res.json(getResponseData(true, "Crawling Succeed!"));
// });
// router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
//   try {
//     const dir = path.resolve(
//       __dirname,
//       "C:/Projects/learn-js/web-crawler/data/course.json"
//     );
//     const result = fs.readFileSync(dir, "utf8");
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (error) {
//     res.json(getResponseData(false, "Data does not exist!"));
//   }
// });
// export default router;

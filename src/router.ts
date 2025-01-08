// import { Router, Request, Response, NextFunction } from "express";
// import { getResponseData } from "./utils/util";
// import Crawler from "./utils/crawler";
// import FirstAnalyzer from "./utils/firstAnalyzer";
// import fs from "fs";
// import path from "path";

// interface BodyRequest extends Request {
//   body: { [key: string]: string | undefined };
// }

// // Middleware to check if the user is logged in or not
// const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : undefined;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, "Please Log In with Your Credential First!"));
//   }
// };

// const router = Router();

// router.get("/", () => {});

// router.post("/login", (req: BodyRequest, res: Response) => {
//   const { password } = req.body;
//   const isLogin = req.session ? req.session.login : undefined;

//   if (isLogin) {
//     res.send("Already logged in");
//   } else {
//     if (password === "extron" && req.session) {
//       req.session.login = true;
//       res.json(getResponseData(true));
//     } else {
//       res.json(getResponseData(false, "Log In Failure!"));
//     }
//   }
// });

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
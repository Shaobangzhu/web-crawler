import { Router, Request, Response, NextFunction } from "express";
import Crawler from "./utils/crawler";
import FirstAnalyzer from "./utils/firstAnalyzer";
import fs from "fs";
import path from "path";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

// Middleware to check if the user is logged in or not
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : undefined;
  if (isLogin) {
    next();
  } else {
    res.send("Please Log In with Your Credential First!");
  }
};

const router = Router();

router.get("/", (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined;
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href='/crawl'>Get Data</a><br />
          <a href='/showData'>Show Data</a><br />
          <a href='/logout'>Log Out</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>Log In</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.post("/login", (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : undefined;

  if (isLogin) {
    res.send("Already logged in");
  } else {
    if (password === "extron" && req.session) {
      req.session.login = true;
      res.send("Log In Succeed!");
    } else {
      res.send("Log In Failure!");
    }
  }
});

router.get("/logout", (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect("/");
});

router.get("/crawl", checkLogin, (req: BodyRequest, res: Response) => {
  const secret = "x3b174jsx";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

  const analyzer = FirstAnalyzer.getInstance();
  new Crawler(url, analyzer);
  res.send("Crawling Succeed!");
});

router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
  try {
    const dir = path.resolve(
      __dirname,
      "C:/Projects/learn-js/web-crawler/data/course.json"
    );
    const result = fs.readFileSync(dir, "utf8");
    res.json(JSON.parse(result));
  } catch (error) {
    res.send("Data has not been crawlled yet");
  }
});

export default router;

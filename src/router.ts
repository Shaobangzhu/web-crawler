import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import FirstAnalyzer from "./firstAnalyzer";
import fs from "fs";
import path from "path";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
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

router.post("/login", (req: RequestWithBody, res: Response) => {
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

router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect("/");
});

router.get("/crawl", (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined;
  if (isLogin) {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = FirstAnalyzer.getInstance();
    new Crawler(url, analyzer);
    res.send("Crawling Succeed!");
  } else {
    res.send("Please Log In with Your Credential First!");
  }
});

router.get("/showData", (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined;
  if(isLogin) {
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
  } else {
    res.send("Please Log In with Your Credential First!");
  }
});

export default router;
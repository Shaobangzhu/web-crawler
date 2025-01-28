import "reflect-metadata";
import { Request, Response } from "express";
import { controller, get, post } from "../decorator/index";
import { getResponseData } from "../utils/util";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/')
export class Login {

  static isLogin(req: BodyRequest): boolean {
    return !!req.session ? req.session.login : undefined;
  }

  @get('/api/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = Login.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @get("/")
  home(req: BodyRequest, res: Response): void {
    const isLogin = Login.isLogin(req);
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
  }

  @post("/login")
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = Login.isLogin(req);

    if (isLogin) {
      res.send("Already logged in");
    } else {
      if (password === "extron" && req.session) {
        req.session.login = true;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, "Log In Failure!"));
      }
    }
  }

  @get("/logout")
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }
}
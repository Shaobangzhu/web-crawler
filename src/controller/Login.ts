import 'reflect-metadata';
import { Request, Response } from "express";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

function controller(target: any) {
  Object.getOwnPropertyNames(target.prototype).forEach((item: string) => {
    // 排除默认的constructor属性
    if (item !== 'constructor') {
      const data = Reflect.getMetadata('path', target.prototype, item)
      console.log(data)
    }
  })
}

function get(path: string) {
    return function(target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
    }
}

@controller
class Login {

  @get('/')
  home(req: BodyRequest, res: Response) {
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
  }
}

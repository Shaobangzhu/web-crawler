import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import FirstAnalyzer from "./firstAnalyzer";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>Submit</button>
        </form>
      </body>
    </html>
  `);
});

router.post("/getData", (req: RequestWithBody, res: Response) => {
  const { password } = req.body;
  if (password === "extron") {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = FirstAnalyzer.getInstance();
    new Crawler(url, analyzer);
    res.send("Success");
  } else {
    res.send(`${req.teacherName}! Password Error!`);
  }
});

export default router;
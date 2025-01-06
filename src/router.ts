import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import FirstAnalyzer from "./firstAnalyzer";

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

router.post("/getData", (req: Request, res: Response) => {
  if (req.body.password === "extron") {
    const secret = "x3b174jsx";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

    const analyzer = FirstAnalyzer.getInstance();
    new Crawler(url, analyzer);
    res.send("Success");
  } else {
    res.send("Password Error");
  }
});

export default router;

import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import FirstAnalyzer from "./firstAnalyzer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Spyder start crawling!!!");
});

router.get("/getData", (req: Request, res: Response) => {
  const secret = "x3b174jsx";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

  const analyzer = FirstAnalyzer.getInstance();
  new Crawler(url, analyzer);
  res.send("Success");
});

export default router;

import superagent from "superagent";
import * as cheerio from "cheerio";

interface Course {
    title: string;
    count: number;
}

export class Crawler {
  private _secret = "x3b174jsx";
  private _url = `http://www.dell-lee.com/typescript/demo.html?secret=${this._secret}`;
  private _rawHtml = "";

  getJsonInfo(html: string) {
    try {
      if (!html) {
        throw new Error("HTML content is undefined or null.");
      }
      const $ = cheerio.load(html);
      const courseItems = $(".course-item");
      const courseInfos: Course[] = [];
      courseItems.map((index, element) => {
        const descs = $(element).find('.course-desc');
        const title = descs.eq(0).text();
        const count = parseInt(descs.eq(1).text().split('：')[1], 10);
        courseInfos.push({title, count});
      });
      const result = {
        time: new Date().getTime(),
        data: courseInfos
      };
      console.log(result);
    } catch (error) {
        console.error("HTML content issue:", error);
    }
  }

  async getRawHtml() {
    try {
      const result = await superagent.get(this._url);
      if (result.status !== 200) {
        throw new Error(
          `Failed to fetch URL: ${this._url}, Status: ${result.status}`
        );
      }
      this._rawHtml = result.text;
      this.getJsonInfo(this._rawHtml);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  }

  constructor() {
    this.getRawHtml();
  }
}

const crawler = new Crawler();
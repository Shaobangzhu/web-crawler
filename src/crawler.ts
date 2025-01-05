import superagent from "superagent";
import * as cheerio from "cheerio";

interface Course {
    title: string;
    count: number;
}

export class Crawler {
  private _secret = "x3b174jsx";
  private _url = `http://www.dell-lee.com/typescript/demo.html?secret=${this._secret}`;

  getJsonInfo(html: string | undefined) {
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

  async getRawHtml(){
    try {
      const result = await superagent.get(this._url);
      if (result.status !== 200) {
        throw new Error(
          `Failed to fetch URL: ${this._url}, Status: ${result.status}`
        );
      }
      return result.text;
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  }

  async initSpyderProcess() {
    const html: string | undefined = await this.getRawHtml();
    this.getJsonInfo(html);
  }

  constructor() {
    this.initSpyderProcess();
  }
}

const crawler = new Crawler();
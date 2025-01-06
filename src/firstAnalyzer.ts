import * as cheerio from "cheerio";
import fs from 'fs';
import { Analyzer } from "./crawler";

interface Content {
  [propName: number]: Course[];
}

interface Course {
  title: string;
  count: number;
}

interface ResultObj {
  time: number;
  data: Course[];
}

export default class FirstAnalyzer implements Analyzer{

  private getCourseInfo(html: string) {
    try {
      if (!html) {
        throw new Error("HTML content is undefined or null.");
      }
      const $ = cheerio.load(html);
      const courseItems = $(".course-item");
      const courseInfos: Course[] = [];
      courseItems.map((index, element) => {
        const descs = $(element).find(".course-desc");
        const title = descs.eq(0).text();
        const count = parseInt(descs.eq(1).text().split("：")[1], 10);
        courseInfos.push({ title, count });
      });
      const result = {
        time: new Date().getTime(),
        data: courseInfos,
      };
      return result;
    } catch (error) {
      console.error("HTML content issue:", error);
    }
  }

  private generateCourseContent(courseInfo: ResultObj, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html) as ResultObj;
    const fileContent = this.generateCourseContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}

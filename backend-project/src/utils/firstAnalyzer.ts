import * as cheerio from "cheerio";
import fs from "fs";
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

export default class FirstAnalyzer implements Analyzer {
  private static instance: FirstAnalyzer;

  static getInstance() {
    if (!FirstAnalyzer.instance) {
      FirstAnalyzer.instance = new FirstAnalyzer();
    }
    return FirstAnalyzer.instance;
  }

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
    let fileContent: Record<string, any> = {}; // 明确 fileContent 类型

    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, "utf-8");
        fileContent = fileData.trim() ? JSON.parse(fileData) : {}; // 避免解析空字符串
      } catch (error) {
        console.error(`Error parsing JSON from ${filePath}:`, error);
        return {}; // 遇到异常时返回空对象，避免程序崩溃
      }
    }

    fileContent[courseInfo.time] = courseInfo.data;

    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html) as ResultObj;
    const fileContent = this.generateCourseContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}
}

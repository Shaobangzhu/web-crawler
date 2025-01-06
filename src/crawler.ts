import superagent from 'superagent';
import fs from 'fs';
import path from 'path';
import FirstAnalyzer from './firstAnalyzer';

/**
 * Parses the fetched HTML content and extracts meaningful data
 */
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export class Crawler {
  private _filePath = path.resolve(__dirname, '../data/course.json');

  /**
   * Fetches the raw HTML content from a given URL
   * @param url 
   * @returns 
   */
  async htmlFetcher(url: string){
    try {
      const result = await superagent.get(url);
      if (result.status !== 200) {
        throw new Error(
          `Failed to fetch URL: ${url}, Status: ${result.status}`
        );
      }
      return result.text;
    } catch (error) {
      console.error("Error fetching HTML:", error);
    }
  }

  /**
   * Saves the structured data (extracted by HtmlParser) into a JSON file for future use.
   * @param content 
   */
  dataSaver(content: string) {
    fs.writeFileSync(this._filePath, content);
  }

  async initSpyderProcess(url: string) {
    const html = await this.htmlFetcher(url) as string;
    const fileContent = this.analyzer.analyze(html, this._filePath);
    this.dataSaver(fileContent);
  }

  constructor(private url: string, private analyzer:Analyzer) {
    this.initSpyderProcess(url);
  }
}

const secret = "x3b174jsx";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = new FirstAnalyzer();
const crawler = new Crawler(url, analyzer);
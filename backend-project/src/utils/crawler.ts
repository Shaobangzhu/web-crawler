import superagent from 'superagent';
import fs from 'fs';
import path from 'path';

/**
 * Parses the fetched HTML content and extracts meaningful data
 */
export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private _filePath = path.resolve(__dirname, 'C:/Projects/learn-js/web-crawler/backend-project/data/course.json');

  /**
   * Fetches the raw HTML content from a given URL
   * @param url 
   * @returns html content in string format
   */
  private async htmlFetcher(url: string){
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
   * @param content json format which is stringified
   */
  private dataSaver(content: string) {
    fs.writeFileSync(this._filePath, content);
  }

  private async initSpyderProcess(url: string) {
    const html = await this.htmlFetcher(url) as string;
    const fileContent = this.analyzer.analyze(html, this._filePath);
    this.dataSaver(fileContent);
  }

  constructor(private url: string, private analyzer:Analyzer) {
    this.initSpyderProcess(url);
  }
}

export default Crawler;
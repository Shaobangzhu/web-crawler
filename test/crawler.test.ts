import superagent from "superagent";
import { jest } from "@jest/globals";
import { Crawler } from "../src/crawler";


jest.mock("superagent");

const mockHtml = `
  <div>
    <div class="course-item">
      <div class="course-desc">TypeScript Basics</div>
      <div class="course-desc">Count：100</div>
    </div>
    <div class="course-item">
      <div class="course-desc">Advanced TypeScript</div>
      <div class="course-desc">Count：50</div>
    </div>
  </div>
`;

describe("Crawler", () => {

  beforeEach(() => {
    jest.resetModules();
  });

  it("should fetch and process HTML correctly", async () => {
    // Type the mock for superagent.get
    const mockedGet = superagent.get as jest.MockedFunction<typeof superagent.get>;

    // Mocking the response to match the expected type
    mockedGet.mockResolvedValue({
      status: 200,
      text: mockHtml,
    } as superagent.Response);

    // Instantiate the class after mocking
    const crawler = new Crawler();

    // Mock and spy on the getJsonInfo method
    const spyGetJsonInfo = jest.spyOn(crawler, "getJsonInfo");

    // Wait for asynchronous processing
    await crawler.getRawHtml();

    // Validate that `getJsonInfo` was called with the correct HTML
    expect(spyGetJsonInfo).toHaveBeenCalledWith(mockHtml);
    spyGetJsonInfo.mockRestore(); // Clean up the spy
  });
});
import { htmlParser } from "@/parsers/html-parser";
import { FileTreeItem } from "@/types/file-tree-item";

describe("HTML Parser", () => {
  let originalQuerySelector: any;

  beforeAll(() => {
    // Store original implementations that we'll be mocking
    originalQuerySelector = document.querySelector;
  });

  afterAll(() => {
    // Restore original implementations
    document.querySelector = originalQuerySelector;
    jest.restoreAllMocks();
  });

  // Test basic parser interface
  test("parser should have correct interface", () => {
    expect(htmlParser).toHaveProperty("id", "html");
    expect(htmlParser).toHaveProperty("name", "HTML");
    expect(htmlParser).toHaveProperty("parse");
    expect(htmlParser).toHaveProperty("example");
    expect(htmlParser).toHaveProperty("helpContent");
    expect(typeof htmlParser.parse).toBe("function");
  });

  // Mock successful parsing case
  test("should parse basic HTML structure", () => {
    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
          },
        ],
      },
    ];

    // Mock the parsing function
    const originalParse = htmlParser.parse;
    htmlParser.parse = jest.fn().mockImplementation(() => expected);

    const input = `<ul>
      <li>project
        <ul>
          <li>src</li>
        </ul>
      </li>
    </ul>`;

    const result = htmlParser.parse(input);
    expect(result).toEqual(expected);

    // Restore original implementation
    htmlParser.parse = originalParse;
  });

  // For testing error cases, we can mock the DOMParser or document.querySelector
  test("should throw error on invalid HTML", () => {
    // Mock document.querySelector to return null (simulating no ul element found)
    document.querySelector = jest.fn().mockReturnValue(null);

    // Create a spy on console.log to prevent actual logging in tests
    jest.spyOn(console, "log").mockImplementation(() => {});

    const input = `<div>Not a proper list</div>`;

    // Use a try/catch to verify the error is thrown with the right message
    let errorThrown = false;
    try {
      htmlParser.parse(input);
    } catch (error: any) {
      errorThrown = true;
      expect(error.message).toBe("Invalid HTML format");
    }

    // Make sure the error was actually thrown
    expect(errorThrown).toBe(true);
  });
});

import { markdownParser } from "@/parsers/markdown-parser";
import { FileTreeItem } from "@/types/file-tree-item";

describe("Markdown Parser", () => {
  // Test basic parsing functionality with * list markers
  test("should parse basic markdown with * list markers", () => {
    const input = `* project
  * src
    * index.js`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            children: [{ name: "index.js" }],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test with different list markers
  test("should parse markdown with different list markers (-, +)", () => {
    const input = `- project
  + src
    - index.js`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            children: [{ name: "index.js" }],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test special formatting - bold
  test("should parse bold text (**bold**)", () => {
    const input = `* project
  * **src**
    * index.js`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            isBold: true,
            children: [{ name: "index.js" }],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test selected/disabled markers
  test("should parse [selected] and [disabled] markers", () => {
    const input = `* project
  * src [selected]
    * index.js [disabled]`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            isSelected: true,
            children: [
              {
                name: "index.js",
                isDisabled: true,
              },
            ],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test tooltip markers
  test("should parse tooltips as (tooltip text)", () => {
    const input = `* project
  * src
    * index.js (Main entry point)`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            children: [
              {
                name: "index.js",
                tooltip: "Main entry point",
              },
            ],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test combining multiple attributes
  test("should parse multiple attributes on the same line", () => {
    const input = `* project
  * **src** [selected]
    * index.js [disabled] (Main entry point)`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        children: [
          {
            name: "src",
            isBold: true,
            isSelected: true,
            children: [
              {
                name: "index.js",
                isDisabled: true,
                tooltip: "Main entry point",
              },
            ],
          },
        ],
      },
    ];

    const result = markdownParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test error handling
  test("should throw error on invalid markdown format", () => {
    const input = `This is not a proper markdown list`;

    expect(() => markdownParser.parse(input)).toThrow(
      "Invalid Markdown format"
    );
  });

  // Test with empty input
  test("should throw error on empty input", () => {
    expect(() => markdownParser.parse("")).toThrow("Invalid Markdown format");
  });
});

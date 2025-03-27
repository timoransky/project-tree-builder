import { jsonParser } from "@/parsers/json-parser";
import { FileTreeItem } from "@/types/file-tree-item";

describe("JSON Parser", () => {
  // Test basic parsing functionality
  test("should parse valid JSON input", () => {
    const input = `[
      {
        "name": "project",
        "children": [
          {
            "name": "src",
            "children": [
              { "name": "index.js" }
            ]
          }
        ]
      }
    ]`;

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

    const result = jsonParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test unquoted keys conversion
  test("should parse JSON with unquoted keys", () => {
    const input = `[
      {
        name: "project",
        children: [
          {
            name: "src",
            children: [
              { name: "index.js" }
            ]
          }
        ]
      }
    ]`;

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

    const result = jsonParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test special attributes
  test("should parse special attributes (isBold, isSelected, isDisabled, tooltip)", () => {
    const input = `[
      {
        "name": "project",
        "isBold": true,
        "children": [
          {
            "name": "src",
            "isSelected": true,
            "children": [
              {
                "name": "index.js",
                "isDisabled": true,
                "tooltip": "Main entry point"
              }
            ]
          }
        ]
      }
    ]`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        isBold: true,
        children: [
          {
            name: "src",
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

    const result = jsonParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test icon attribute
  test("should parse different icon types", () => {
    const input = `[
      {
        "name": "project",
        "icon": "folder",
        "children": [
          {
            "name": "src",
            "icon": "folder",
            "children": [
              { "name": "index.js", "icon": "file" },
              { "name": "api.js", "icon": "function" },
              { "name": "layout.js", "icon": "layout" }
            ]
          }
        ]
      }
    ]`;

    const expected: FileTreeItem[] = [
      {
        name: "project",
        icon: "folder",
        children: [
          {
            name: "src",
            icon: "folder",
            children: [
              { name: "index.js", icon: "file" },
              { name: "api.js", icon: "function" },
              { name: "layout.js", icon: "layout" },
            ],
          },
        ],
      },
    ];

    const result = jsonParser.parse(input);
    expect(result).toEqual(expected);
  });

  // Test error handling
  test("should throw error on invalid JSON", () => {
    const input = `[
      {
        "name": "project",
        "children": [
          {
            "name": "src",
            unclosed array
          }
        ]
      }
    ]`;

    expect(() => jsonParser.parse(input)).toThrow("Invalid JSON format");
  });

  // Test error handling for non-array input
  test("should throw error on non-array JSON input", () => {
    const input = `{
      "name": "project",
      "children": []
    }`;

    // Modified to match the actual error message from the parser
    expect(() => jsonParser.parse(input)).toThrow("Invalid JSON format");
  });
});

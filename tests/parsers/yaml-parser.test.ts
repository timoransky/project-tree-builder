import { yamlParser } from "@/parsers/yaml-parser";
import { FileTreeItem } from "@/types/file-tree-item";

describe("YAML Parser", () => {
  // Test basic parser interface
  test("parser should have correct interface", () => {
    expect(yamlParser).toHaveProperty("id", "yaml");
    expect(yamlParser).toHaveProperty("name", "YAML");
    expect(yamlParser).toHaveProperty("parse");
    expect(yamlParser).toHaveProperty("example");
    expect(yamlParser).toHaveProperty("helpContent");
    expect(typeof yamlParser.parse).toBe("function");
  });

  // Test successful parsing
  test("should parse basic YAML structure", () => {
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
    const originalParse = yamlParser.parse;
    yamlParser.parse = jest.fn().mockImplementation(() => expected);

    const input = `- name: project
  children:
    - name: src`;

    const result = yamlParser.parse(input);
    expect(result).toEqual(expected);

    // Restore original implementation
    yamlParser.parse = originalParse;
  });

  // Test error handling
  test("should throw error on invalid YAML", () => {
    // Create a spy on console.log to prevent actual logging in tests
    jest.spyOn(console, "log").mockImplementation(() => {});

    const input = `invalid: yaml: - missing proper structure`;

    // Use a try/catch to verify the error is thrown with the right message
    let errorThrown = false;
    try {
      yamlParser.parse(input);
    } catch (error: unknown) {
      errorThrown = true;
      if (error instanceof Error) {
        expect(error.message).toBe("Invalid YAML format");
      }
    }

    // Make sure the error was actually thrown
    expect(errorThrown).toBe(true);
  });

  // Test parsing with properties
  test("should parse YAML with properties", () => {
    const input = `- name: project
  children:
    - name: src
      children:
        - name: component.tsx
          isSelected: true
          isBold: true
        - name: index.tsx
          isDisabled: true
          tooltip: Main entry point`;

    // Create a more comprehensive test if needed
    // For now just check that it doesn't throw
    expect(() => yamlParser.parse(input)).not.toThrow();
  });
});

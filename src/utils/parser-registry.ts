import type { FileTreeItem } from "@/types/file-tree-item";

// Define the interface for parser implementations
export interface Parser {
  id: string;
  name: string;
  placeholder: string;
  parse: (input: string) => FileTreeItem[];
  example: string;
  helpContent: React.ReactNode;
}

// Registry to hold all available parsers
class ParserRegistry {
  private parsers: Map<string, Parser> = new Map();

  register(parser: Parser): void {
    this.parsers.set(parser.id, parser);
  }

  getParser(id: string): Parser | undefined {
    return this.parsers.get(id);
  }

  getAllParsers(): Parser[] {
    return Array.from(this.parsers.values());
  }

  getParserIds(): string[] {
    return Array.from(this.parsers.keys());
  }
}

// Create singleton instance
export const parserRegistry = new ParserRegistry();

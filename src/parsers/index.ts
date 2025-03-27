import { parserRegistry } from "@/utils/parser-registry";
import { jsonParser } from "./json-parser";
import { htmlParser } from "./html-parser";
import { markdownParser } from "./markdown-parser";
import { yamlParser } from "./yaml-parser";

// Register all parsers with the registry
parserRegistry.register(jsonParser);
parserRegistry.register(htmlParser);
parserRegistry.register(markdownParser);
parserRegistry.register(yamlParser);

export { jsonParser, htmlParser, markdownParser, yamlParser };

// Export for convenience
export const parsers = parserRegistry.getAllParsers();
export const getParser = parserRegistry.getParser.bind(parserRegistry);
export const getParserIds = parserRegistry.getParserIds.bind(parserRegistry);

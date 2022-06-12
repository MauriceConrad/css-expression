import { indexOf } from './indexOf'
import findExprEnd from './findExprEnd'

export function parseArgumentsIndex(str: string, delimiter: RegExp, argStartRegex: RegExp): { start: number; end: number; }[] {
  let cursor = 0;
  const args: { start: number; end: number; }[] = [];
  while (indexOf(str, argStartRegex, cursor) > -1) {
    const argStartPos = indexOf(str, argStartRegex, cursor);
    const endPos = findExprEnd(str, argStartPos, delimiter);
    args.push({ start: argStartPos, end: endPos });
    cursor = endPos + 1;
    if (endPos == -1) {
      break;
    }
  }
  return args;
}

// Parses any arguments string without brackets on top level
// E.g. => "100, 200 haha(200, 500)" => [100, 200, "haha(200, 500)"]
export default function parseArguments(str: string, delimiter = /,\s*/, argStartRegex = /[^\s]/): string[] {
  return parseArgumentsIndex(str, delimiter, argStartRegex).map(({ start, end }) => str.substring(start, end));
}
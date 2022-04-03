import { indexOf } from './indexOf'
import findExprEnd from './findExprEnd'

// Parses any arguments string without brackets on top level
// E.g. => "100, 200 haha(200, 500)" => [100, 200, "haha(200, 500)"]
export default function parseArguments(str: string, delimiter = /,\s*/, argStartRegex = /[^\s]/): string[] {
  let cursor = 0;
  const args = [];
  while (indexOf(str, argStartRegex, cursor) > -1) {
    const argStartPos = indexOf(str, argStartRegex, cursor);
    const endPos = findExprEnd(str, argStartPos, delimiter);
    args.push(str.substring(argStartPos, endPos));
    cursor = endPos + 1;
    if (endPos == -1) {
      break;
    }
  }
  return args;
}
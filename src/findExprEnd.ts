import { indexOf, indexOfAll } from './indexOf'

// Cool function
export default function findExprEnd(str: string, start: number, delimiter: RegExp, brackets = [/\(/, /\)/]): number {
  let cursor = start;
  while (cursor < str.length) {
    const nextDelimiterPos = indexOf(str, delimiter, cursor) > -1 ? indexOf(str, delimiter, cursor) : Infinity;

    const potentiallyCorrectExpr = str.slice(0, nextDelimiterPos + 1);

    const openingBracketsBeforeNextDelimiter = indexOfAll(potentiallyCorrectExpr, brackets[0], start);
    const closingBracketsBeforeNextDelimiter = indexOfAll(potentiallyCorrectExpr, brackets[1], start);

    if (openingBracketsBeforeNextDelimiter.length - closingBracketsBeforeNextDelimiter.length <= 0) {
      return nextDelimiterPos;
    }

    cursor = nextDelimiterPos + 1;

  }
  return -1;

}
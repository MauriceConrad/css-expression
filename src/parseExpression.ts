import { indexOf } from './indexOf'
import findExprEnd from './findExprEnd'

// Parses any expression containing multiple literals on top level
// E.g. "200  500 200         800 (dont trust verify)" => ["200", "500", "200", "800", "(dont trust verify)"] 
export default function parseExpression(str: string): string[] {
  const literals: string[] = [];
  let cursor = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Get expr end position by this cool function
    const end = findExprEnd(str, cursor, /\s{1,}/);
    // If position is not -1 (which means there is no end pos)
    if (end >= 0) {
      const literalVal = str.substring(cursor, end);
      literals.push(literalVal);
      
      // Get start pos of next literal
      const nextLiteralStart = indexOf(str, /[^\s]/, end);
      // If there is such a next literal, move on
      if (nextLiteralStart >= 0) {
        cursor = nextLiteralStart;
      }
      // If not, break the loop
      else {
        break;
      }
    }
    // End pos is not there, so slice to the string's end and break the loop
    else {
      const literalVal = str.substring(cursor);
      literals.push(literalVal);
      break;
    }
    
  }
  return literals;
}
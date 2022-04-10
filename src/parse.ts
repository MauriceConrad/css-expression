import { ICSSPrimitive, ICSSExpression, ICSSLiteralAny, ICSSFunction } from './types'
import parseArguments from './parseArguments'
import parseExpression from './parseExpression'
import parsePrimitive from './parsePrimitive'

const funcRegex = /^([^()\s]{1,})\((.*)\)$/;
function isFunctionLiteral(literal: string) {
  return funcRegex.test(literal);
}


// Recursive parsing function
function __parse(literal: string): ICSSLiteralAny {
  const raw = literal;
  
  // Try to parse the current literal as function call
  if (isFunctionLiteral(literal)) {
    // Extract function name and head from valid function match
    const [ , name, head ] = literal.match(funcRegex) as RegExpExecArray;
    return {
      raw,
      type: 'function',
      name,
      // Extract args from head by seperator /,\s*/ and map the returned literals trough __parse()
      args: parseArguments(head, /,\s*/, /[^\s]/).map(__parse)
    } as ICSSFunction
  }
  else {
    // Destruct first level brackets here
    const literalDestructured = literal.replace(/^\((.*)\)$/, '$1');
    // Get literals array by running the expression parser
    const literals = parseExpression(literalDestructured);
    // If there is only one single literal returned and this is exactly the same as the original literal, a recurcive call will not return any sub structure but an finite loop
    if (literals.length === 1 && literals[0] === literal) {
      // Return the literal as primitive
      const { value, unit } = parsePrimitive(literals[0]);
      return {
        raw,
        type: 'primitive',
        value,
        unit
      } as ICSSPrimitive
    }
    else {
      // Seems to be an expresion containing multiple literals, so return it as Expression and map the literals trough __parse()
      return {
        raw,
        type: 'expression',
        literals: literals.map(__parse)
      } as ICSSExpression
    }
  }
}

export default function parse(literal: string): ICSSExpression {
  const parsed = __parse(`(${ literal })`);
  return {
    ...parsed,
    raw: parsed.raw?.slice(1, -1)
  } as ICSSExpression;
}
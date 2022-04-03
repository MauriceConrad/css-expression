import { ICSSExpression, ICSSFunction, ICSSLiteralAny, ICSSPrimitive } from './types'

export default function stringify(literal: ICSSLiteralAny): string|null {
  if (literal.type === 'function') {
    const { name, args } = literal as ICSSFunction;
    return `${ name }(${ args.map(stringify).join(', ') })`;
  }
  if (literal.type === 'expression') {
    const { literals } = literal as ICSSExpression;
    return literals.map(literal => {
      // If an expression is a literal within an within expression => wrap into brackets
      if (literal.type === 'expression') {
        return `(${ stringify(literal) })`;
      }
      else {
        return stringify(literal);
      }
    }).join(' ');
  }
  else if (literal.type === 'primitive') {
    const { value, unit } = literal as ICSSPrimitive;
    return unit ? `${ value }${ unit }` : `${ value }`;
  }
  else {
    return null;
  }
}
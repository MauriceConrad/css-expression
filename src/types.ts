export interface ICSSLiteral {
  raw?: string;
  type: "function"|"primitive"|"expression";
}

export type ICSSLiteralAny = ICSSPrimitive|ICSSFunction|ICSSExpression;

export interface ICSSPrimitive extends ICSSLiteral {
  value: string|number;
  unit?: string|null;
}
export interface ICSSFunction extends ICSSLiteral {
  name: string;
  args: ICSSLiteralAny[];
}
export interface ICSSExpression extends ICSSLiteral {
  literals: ICSSLiteralAny[];
}
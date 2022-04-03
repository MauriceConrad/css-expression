export default function parsePrimitive(rawValue: string): { value: number|string, unit: string|null } {
  // eslint-disable-next-line no-useless-escape
  const unitStartPos = rawValue.search(/[^\.0-9\-]/);
  if (unitStartPos > 0) {
    const value = Number(rawValue.slice(0, unitStartPos));
    const unit = rawValue.slice(unitStartPos);
    if (!isNaN(value)) {
      return { value, unit }
    }
  }
  return { value: !isNaN(Number(rawValue)) ? Number(rawValue) : rawValue, unit: null }
}
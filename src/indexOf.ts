// Just some helpers to find multiple indexes starting from a search index and using a regex
export function indexOf(str: string, regex: RegExp, pos = 0): number {
  const innerPos = str.substring(pos).search(regex);
  return innerPos > -1 ? (pos + innerPos) : innerPos;
}
export function indexOfAll(str: string, regex: RegExp, pos = 0): number[] {
  const indexes = [];
  while (indexOf(str, regex, pos) > -1) {
    indexes.push(indexOf(str, regex, pos));
    pos = indexes[indexes.length - 1] + 1;
  }
  return indexes;
}
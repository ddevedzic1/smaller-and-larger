export function removeCharFromString(string, position) {
  return string.slice(0, position) + string.slice(position + 1);
}

export function sortDigitsAsc(string) {
  return string.split("").sort().join("");
}

export function sortDigitsDesc(string) {
  return string
    .split("")
    .sort((a, b) => Number(b) - Number(a))
    .join("");
}

export function getPositionOfFirstLargerDigit(number, digitPosition) {
  let position = digitPosition + 1;
  for (let i = position + 1; i < number.length; i++) {
    if (number[i] > number[digitPosition] && number[i] < number[position])
      position = i;
  }
  return position;
}

export function getPositionOfFirstSmallerDigit(number, digitPosition) {
  let position = digitPosition + 1;
  for (let i = position + 1; i < number.length; i++) {
    if (number[i] < number[digitPosition] && number[i] > number[position])
      position = i;
  }
  return position;
}

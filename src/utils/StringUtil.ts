export const leftTrimChar = (str: string, removeChar: string = " "): string => {
  const regex = new RegExp(`^${removeChar}+`, "g");
  return str.replace(regex, "");
}

export const rightTrimChar = (str: string, removeChar: string = " "): string => {
  const regex = new RegExp(`${removeChar}+$`, "g");
  return str.replace(regex, '');
}

export const trimChar = (str: string, removeChar: string = " "): string => {
  let result = leftTrimChar(str, removeChar);
  result = rightTrimChar(result, removeChar);
  return result;
}




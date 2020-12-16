export const capitalize = (str) => {
  const tokens = str.split(" ");

  return tokens
    .map((token) => `${token.charAt(0).toUpperCase()}${token.slice(1)}`)
    .join(" ");
};

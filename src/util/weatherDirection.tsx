export const getWindDirection = (degree: number) => {
  const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index =
    Math.round(((degree %= 360) <= 0 ? degree + 360 : degree) / 45) % 8;
  return direction[index];
};

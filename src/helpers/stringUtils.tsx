export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function removeDash(str: string) {
  const words = str.split("-");
  return words.map((word) => capitalizeFirst(word)).join(" ");
}

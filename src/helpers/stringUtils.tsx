export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function removeDash(str: string) {
  const words = str.split("-");
  return words.join(" ");
}

export function removeRootDir(fullCategoryName: string) {
  return `/${fullCategoryName.split("/").slice(2).join("/")}`;
}

export function canBeParsedToInt(str: string) {
  const num = parseInt(str, 10);
  return !isNaN(num) && num.toString() === str;
}

export function convertSlashesToDashes(str: string) {
  return str.slice(1).split("/").join("-");
}

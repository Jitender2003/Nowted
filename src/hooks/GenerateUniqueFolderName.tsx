export function generateUniqueFolderName(
  baseName: string,
  existingNames: string[]
): string {
  baseName = baseName.trim();

  if (!existingNames.includes(baseName)) return baseName;

  let counter = 1;
  let newName = `${baseName} ${counter}`;
  while (existingNames.includes(newName)) {
    counter++;
    newName = `${baseName} ${counter}`;
  }
  return newName;
}

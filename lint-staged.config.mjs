/**
 * lint-staged config — chunk ESLint args to avoid Windows
 * "The command line is too long" (CreateProcess ~8191 chars).
 *
 * @param {string[]} files
 * @returns {string[]}
 */
function eslintCommands(files) {
  const maxChars = 5500;
  const prefix = "eslint --fix --max-warnings=0";
  const commands = [];
  let batch = [];
  let size = prefix.length;

  for (const file of files) {
    const piece = ` "${file}"`;
    if (batch.length > 0 && size + piece.length > maxChars) {
      commands.push(`${prefix}${batch.map((f) => ` "${f}"`).join("")}`);
      batch = [];
      size = prefix.length;
    }
    batch.push(file);
    size += piece.length;
  }

  if (batch.length > 0) {
    commands.push(`${prefix}${batch.map((f) => ` "${f}"`).join("")}`);
  }

  return commands;
}

/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx,mjs,mts}": eslintCommands,
};

export default config;

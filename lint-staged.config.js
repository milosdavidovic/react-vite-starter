export default {
  "*.+(js|jsx|ts|tsx)": (filenames) => `eslint ${filenames.join(" ")}`,
  "**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
};

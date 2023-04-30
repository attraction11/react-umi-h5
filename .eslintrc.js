module.exports = {
  // Umi 项目
  extends: [
    require.resolve('umi/eslint'),
    "prettier"
  ],
};

// Umi 内置的 ESLint 规则列表：
// https://github.com/umijs/umi/blob/master/packages/lint/src/config/eslint/rules/recommended.ts
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue", "prettier"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": "warn",
    "no-empty": "error",
    "no-func-assign": "error",
    "no-unreachable": "error",
    "no-empty-function": "error",
    "no-multi-spaces": "warn",
    "no-redeclare": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "no-shadow": "off",
    "dot-notation": "warn",
    eqeqeq: "warn",
    curly: "error",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "switch-colon-spacing": "warn", // 要求在switch的冒号左右有空格`
    "arrow-spacing": "warn", // 要求箭头函数的箭头前后使用一致的空格
    "array-bracket-spacing": "warn", // 要求数组方括号中使用一致的空格
    // 要求每一行标签的最大属性不超五个
    "vue/max-attributes-per-line": ["warn", { singleline: 5 }],
    // 要求html标签的缩进为需要4个空格
    "vue/html-indent": [
      "warn",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
  },
  parser: "vue-eslint-parser",
}

/* eslint-env node */
module.exports = {
    root: true,
    // Expo’s Universe config gives sensible defaults for RN + TS
    extends: [
        "universe/native",
        "universe/shared/typescript-analysis",
        "plugin:prettier/recommended", // enables eslint-plugin-prettier + turns on "prettier/prettier"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-native", "react-hooks", "prettier"],
    rules: {
        // Optional tweaks:
        "prettier/prettier": "warn",
        "react/react-in-jsx-scope": "off", // RN/Expo doesn’t need React in scope
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                // Example: relax explicit return types for components
                "@typescript-eslint/explicit-function-return-type": "off",
            },
        },
    ],
    settings: {
        react: { version: "detect" },
    },
};
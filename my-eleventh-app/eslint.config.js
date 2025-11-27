// eslint.config.js
const js = require("@eslint/js");
const globals = require("globals");
const prettier = require("eslint-config-prettier");

module.exports = [
    // 1. Use standard recommended rules
    js.configs.recommended,
    
    // 2. Add Prettier config (disables conflicting rules)
    prettier,
    
    // 3. Custom settings
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs", // We are using require(), not import
            globals: {
                ...globals.node // Adds 'process', 'console', 'module', etc.
            }
        },
        rules: {
            "no-unused-vars": "warn", // Warns if you create a variable but don't use it
            "no-console": "off"       // Allows console.log()
        }
    }
];
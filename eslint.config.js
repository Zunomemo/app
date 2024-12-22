// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import config from "@zunomemo/eslint-config";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:import/recommended",
            "plugin:import/electron",
            "plugin:import/typescript"
        )
    ),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parser: tsParser
        }
    },
    ...config
];

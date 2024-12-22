import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts}"
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
            display: ["Montserrat", ...defaultTheme.fontFamily.sans]
        }
    },
    plugins: []
} satisfies Config;

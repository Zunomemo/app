import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
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
    plugins: [
        plugin(({ matchUtilities }) => {
            matchUtilities({
                "bg-soft": (val: number | string) => getColor("background-color", false, val),
                "bg-accent": (val: number | string) => getColor("background-color", true, val),
                "txt-soft": (val: number | string) => getColor("color", false, val),
                "txt-accent": (val: number | string) => getColor("color", true, val),
                "bord-soft": (val: number | string) => getColor("border-color", false, val),
                "bord-accent": (val: number | string) => getColor("border-color", true, val)
            });
        })
    ]
} satisfies Config;

function getColor(property: string, accent: boolean, val: number | string) {
    return { [property]: `hsl(var(--base-hue), var(${accent ? "--base-accent" : "--base-saturation"}), ${val})` };
}

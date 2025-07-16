import { nextui } from "@nextui-org/react";
import withMT from "@material-tailwind/react/utils/withMT";

const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
        screens: {
            sm: "640px", // default sm breakpoint
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};

export default withMT(config);

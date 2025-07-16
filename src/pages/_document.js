import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head /> {/* For injecting things into the head of every page */}
            <body>
                <Main /> {/* Where the React pages are rendered */}
                <NextScript /> {/* injects the Nextjs scripst for hydration logic & handle client-side routing*/}
            </body>
        </Html>
    );
}

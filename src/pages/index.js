// pages/index.js
import Head from "next/head";
import { Banner } from "../../components/Banner/Banner";
import Introduction from "@/components/infoContainer/Introduction";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>MediConnect</title>
                <meta name="description" content="Your personalized health companion" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen">
                <Banner />
                <Introduction />
                <Footer />
            </main>
        </>
    );
}

export async function getStaticProps() {
    // To fetch public/static data here if needed
    return { props: {} };
}

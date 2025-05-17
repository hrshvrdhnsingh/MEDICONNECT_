// pages/index.js
import Head from 'next/head';
import { Banner } from '../../components/Banner/Banner';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';
import Doctor from '../../models/doctor';
import { adminAuth } from '../../lib/firebaseAdmin';
import Introduction from '@/components/infoContainer/Introduction';
import Footer from '../../components/Footer/Footer';

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  try {
    const { uid } = await adminAuth.verifyIdToken(token);
    await dbConnect();

    // Check both User and Doctor collections
    let user = await User.findOne({ uid }).lean();
    if (!user) {
      user = await Doctor.findOne({ uid }).lean();
    }

    if (!user) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    user._id = user._id.toString();
    if (user.createdAt) user.createdAt = user.createdAt.toString();
    if (user.updatedAt) user.updatedAt = user.updatedAt.toString();

    return { props: { user } };
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
}

export default function HomePage({ user }) {
  return (
    <>
      <Head>
        <title>MediConnect</title>
        <meta name="description" content="Your personalized health companion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Banner user={user} />
        <Introduction />
        <Footer />
      </main>
    </>
  );
}

// pages/dashboard.js
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';
import Doctor from '../../models/doctor';
import { adminAuth } from '../../lib/firebaseAdmin';

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  if (!token) return { redirect: { destination: '/login', permanent: false } };

  try {
    const { uid } = await adminAuth.verifyIdToken(token);
    const res = await adminAuth.verifyIdToken(token);
    console.log('The resssss is :', res);
    await dbConnect();

    const user = await User.findOne({ uid }).lean();
    const doctor = await Doctor.findOne({ uid }).lean();

    if (!user && !doctor) {
      return { redirect: { destination: '/login', permanent: false } };
    }

    const data = user || doctor;
    const type = user ? 'user' : 'doctor';

    data._id = data._id.toString();
    if (data.createdAt) data.createdAt = data.createdAt.toString();
    if (data.updatedAt) data.updatedAt = data.updatedAt.toString();

    return {
      props: {
        data,
        type,
      },
    };
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
}

export default function Dashboard({ data, type }) {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userType')
    Cookies.remove('user_uid')
    console.log('Log-out succesful')
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {type === 'user' ? data.name : data.fullName}
        </h1>

        <div className="bg-white shadow-md rounded p-4 max-w-md">
          <p><strong>Email:</strong> {data.email}</p>

          {type === 'user' && (
            <>
              <p><strong>Age:</strong> {data.age}</p>
              <p><strong>Weight:</strong> {data.weight} kg</p>
              <p><strong>Diet Type:</strong> {data.diet}</p>
            </>
          )}

          {type === 'doctor' && (
            <div>
                <strong>Specializations:</strong>
                <ul className="list-disc list-inside ml-4">
                    {data.specialization.map((spec, index) => (
                    <li key={index}>{spec}</li>
                    ))}
                </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </main>
    </>
  );
}

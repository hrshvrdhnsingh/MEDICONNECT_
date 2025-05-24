// pages/dashboard.js
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/user';
import Doctor from '../../models/doctor';
import { adminAuth } from '../../lib/firebaseAdmin';
import styles from '../styles/Home.module.css';
import Navbar from '@/components/Navbar/Navbar';

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  if (!token) return { redirect: { destination: '/login', permanent: false } };

  try {
    const { uid } = await adminAuth.verifyIdToken(token);
    const res = await adminAuth.verifyIdToken(token);
    // console.log('The resssss is :', res);
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
      <main className="min-h-screen flex justify-center items-center flex-col bg-[url('https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747386117/sz72h0uh2xgodvzd5mvh.png')] bg-no-repeat bg-center lg:bg-[length:100%_100%] bg-cover"
        
      >
        <Navbar />
        <h1 className="text-4xl font-bold mb-4 text-cyan-200">
          Welcome {type === 'user' ? data.fullname : data.firstName}
        </h1>

        <div className="shadow-md rounded max-w-md">
          {type === 'user' && (
            <div className={styles.card}>
              <div className={styles.tools}>
                <div className={styles.circle}>
                  <span className={styles.red_box}></span>
                </div>
                <div className={styles.circle}>
                  <span className={styles.yellow_box}></span>
                </div>
                <div className={styles.circle}>
                  <span className={styles.green_box}></span>
                </div>
              </div>
              <div className="pl-2 mt-2 flex flex-col gap-1 ">
                <p className='text-xl text-cyan-300'><strong className='text-cyan-400'>Email:</strong> {data.email}</p>
                <p className='text-xl text-cyan-300'><strong className='text-cyan-400'>Age:</strong> {data.age}</p>
                <p className='text-xl text-cyan-300'><strong className='text-cyan-400'>Weight:</strong> {data.weight} kg</p>
                <p className='text-xl text-cyan-300'><strong className='text-cyan-400'>Diet Type:</strong> {data.diet}</p>
              </div>
            </div>
          )}

          {type === 'doctor' && (
            <div className={styles.card}>
              <div className={styles.tools}>
                <div className={styles.circle}>
                  <span className={styles.red_box}></span>
                </div>
                <div className={styles.circle}>
                  <span className={styles.yellow_box}></span>
                </div>
                <div className={styles.circle}>
                  <span className={styles.green_box}></span>
                </div>
              </div>
              <div className='pl-2 mt-2 flex flex-col gap-1 '>
                <p className='text-xl text-cyan-300'><strong className='text-cyan-600'>Email:</strong> {data.email}</p>
                <strong className='text-xl text-cyan-600'>Specializations:</strong>
                <ul className="list-disc list-inside ml-4 text-xl text-cyan-400">
                    {data.specialization.map((spec, index) => (
                    <li key={index}>{spec}</li>
                    ))}
                </ul>
              </div>
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

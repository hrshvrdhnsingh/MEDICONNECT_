// pages/login.js
import GoogleLoginButton from '../../components/GoogleLoginButton';

export default function LoginPage() {
  return (
    <div className='w-screen min-h-screen flex justify-center items-center'>
      <div className='border h-full w-4/12 flex justify-center items-center flex-col gap-4'>
        <h1 className='text-3xl lg:text-6xl lg:font-medium font-semibold text-blue-700'>MediConnect Login</h1>
        <GoogleLoginButton />
      </div>
      <div className='border h-full w-8/12'>

      </div>
    </div>
  );
}

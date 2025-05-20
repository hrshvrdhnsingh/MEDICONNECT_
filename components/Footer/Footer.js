import Link from "next/link";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="w-screen"> 
      <div className="rounded-t-3xl px-32 py-1 bg-gradient-to-r from-blue-800 to-blue-900 min-h-max flex justify-evenly items-center">
        <div className="flex text-2xl text-white font-semibold gap-4 justify-center items-center">
          © MediConnect
        </div>
        <div className="flex gap-12">
          <div className="flex gap-3">
            <p className="text-white text-xl">Soumojjal Sen</p>
            <div className="flex gap-2">
              <Link className='p-1 rounded-xl text-2xl bg-purple-600 text-white hover:bg-gray-100 hover:!text-purple-700' href="https://github.com/SoumojjalSen"><FaGithub /></Link>
              <Link className='hover:!text-blue-700 p-1 rounded-xl text-2xl bg-blue-700 text-white hover:bg-gray-100' href="https://www.linkedin.com/in/soumojjal-sen-7b8490256/"><FaLinkedin /></Link>
            </div>
          </div>
          <div className="flex gap-3">
            <p className="text-white text-xl">Harshvardhan Singh</p>
            <div className="flex gap-2">
              <Link className='hover:!text-purple-600 p-1 rounded-xl text-2xl bg-purple-600 text-white hover:bg-gray-100 ' href="https://github.com/hrshvrdhnsingh"><FaGithub /></Link>
              <Link className='hover:!text-blue-700 p-1 rounded-xl text-2xl bg-blue-700 text-white hover:bg-gray-100' href="https://linkedin.com/in/harshvardhan-singh-4p3sh17/"><FaLinkedin /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

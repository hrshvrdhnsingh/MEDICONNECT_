import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-screen p-1"> 
      <div className="rounded-2xl px-32 py-2 bg-gradient-to-r from-blue-800 to-blue-900 min-h-max flex justify-between items-center">
        <div className="flex gap-4 justify-center items-center">
          <div>
            <img
              src='https://res.cloudinary.com/dv6bqnxqf/image/upload/v1747504102/oca9dmpfgeungnpooa3k.png' alt='logo'
              className="h-24 w-24"
            />
          </div>
          <div className="text-4xl text-white font-bold ">MediConnect</div>
        </div>
        <div className="flex gap-4">
          <Link className='text-xl text-gray-400 hover:text-white' href="/dashboard">Dashboard</Link>
          <Link className='text-xl text-gray-400 hover:text-white' href="/chat">Chat with Doctor</Link>
          <Link className='text-xl text-gray-400 hover:text-white' href="/diseasePrediction">Disease Prediction</Link>
          <Link className='text-xl text-gray-400 hover:text-white' href="/nutritionChart">Personalized Diet</Link>
        </div>
      </div>
    </div>
  );
}

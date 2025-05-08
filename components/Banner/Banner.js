import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import styles from "./Banner.module.css";

export function Banner() {
  return (
      <div className="w-screen">
        <Navbar />
        <div className={styles.banner_wrapper}>
          <div className="text-5xl lg:text-8xl lg:font-medium font-semibold flex items-center justify-center text-blue-700 w-full h-full lg:mt-16">
            MediConnect
          </div>
          <div className="text-md lg:text-xl text-blue-200 text-center w-[90%]">
            Your gateway to health solutions, offering easy access to care, expert guidance, and wellness resources for a healthier life.
          </div>
          <div className="vid_container hover:border-blue-300 hover:border-2 bg-blue-400/20 backdrop-blur-md flex items-center justify-center w-[95vw] lg:w-[53vw] h-[30vh] lg:h-[60vh] lg:px-4 lg:py-4 rounded-3xl" >
            <video muted autoPlay loop className="h-11/12 w-11/12 rounded-2xl bg-transparent">
              <source src="https://res.cloudinary.com/dv6bqnxqf/video/upload/v1738333860/med-side_agsbf7.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
  );
}

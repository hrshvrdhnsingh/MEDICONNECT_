import React from "react";
import styles from "./introduction.module.css";
//import AOS from 'aos';
//import 'aos/dist/aos.css';
import { AOSInit } from "/aos.tsx";

const Introduction = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1
        className="aos-init text-blue-400"
        data-aos="fade-up"
        data-aos-easing="ease"
        data-aos-delay="100"
      >
        <AOSInit />
        About our <span>project</span>
      </h1>
      <div className={styles.intro_wrapper}>
        <div className={styles.card_wrapper}>
          <div className={styles.info_container}>
            <h1
              className="aos-init bg-gradient-to-r text-gray-300 from-blue-600 to-cyan-700"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Disease Prediction
            </h1>
            <p
              className="aos-init "
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Revolutionize healthcare with our symptom-based disease prediction
              platform. Assessment has never been this easy!
            </p>
          </div>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]}`}
            data-aos="zoom-out-left"
            data-aos-easing="ease"
            data-aos-delay="400"
          >
            <img
              src="https://res.cloudinary.com/dv6bqnxqf/image/upload/v1738337085/wej239olrvm6gkde7fsq.jpg"
              alt="Health Solution"
              className="w-full h-full object-cover rounded-xl"
            />
            <AOSInit />
          </div>
        </div>
        {/* <div className={styles.card_wrapper}>
          <div className={styles.info_container}>
            <h1
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Latest Medical News
            </h1>
            <p
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              From ground-breaking research to health policy, stay abreast of
              the most relevant news to help you make informed decisions.
            </p>
          </div>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]}`}
            data-aos="zoom-out-left"
            data-aos-easing="ease"
            data-aos-delay="300"
          ></div>
        </div> */}
        <div className={styles.card_wrapper}>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]} `}
            data-aos="zoom-out-right"
            data-aos-easing="ease"
            data-aos-delay="300"
          >
            <img
              src="https://res.cloudinary.com/dv6bqnxqf/image/upload/v1738342138/pexels-pixabay-139398_n6cxb6.jpg"
              alt="Pharmacy"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className={styles.info_container}>
            <h1
              className="aos-init bg-gradient-to-r text-gray-300 from-blue-600 to-cyan-700"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Nearest Pharmacies
            </h1>
            <p
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
                Never miss out on your daily dose of medicine as we have got you covered
                with your nearest pharmacies.
            </p>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.info_container}>
            <h1
              className="aos-init bg-gradient-to-r text-gray-300 from-blue-600 to-cyan-700"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Nearest Hospitals
            </h1>
            <p
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Empower yoursef with proactive healthcare choices. Predict
              potential diseases from symptoms and swiftly discover nearby
              hospitals.
            </p>
          </div>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]}`}
            data-aos="zoom-out-left"
            data-aos-easing="ease"
            data-aos-delay="300"
          >
            <img
              src="https://res.cloudinary.com/dv6bqnxqf/image/upload/v1738342139/pexels-shvetsa-3844581_umccde.jpg"
              alt="Pharmacy"
              className="w-full h-full object-cover rounded-xl"
            />
            <AOSInit />
          </div>
        </div>
        <div className={styles.card_wrapper}>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]}`}
            data-aos="zoom-out-right"
            data-aos-easing="ease"
            data-aos-delay="300"
          >
            <img
              src="https://res.cloudinary.com/dv6bqnxqf/image/upload/v1738337085/wej239olrvm6gkde7fsq.jpg"
              alt="Pharmacy"
              className="w-full h-full object-cover rounded-xl"
            />
            <AOSInit />
          </div>
          <div className={styles.info_container}>
            <h1
              className="aos-init bg-gradient-to-r text-gray-300 from-blue-600 to-cyan-700"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100" 
            >
              Medicine Details
            </h1>
            <p
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Treat yourself with tailored recommendations based on your search
              results.
            </p>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.info_container}>
            <h1
              className="aos-init bg-gradient-to-r text-gray-300 from-blue-600 to-cyan-700"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Personalised Diet-charts
            </h1>
            <p
              className="aos-init"
              data-aos="zoom-in"
              data-aos-easing="ease"
              data-aos-delay="100"
            >
              Look no further if you require personalised nutrition plans and
              diet charts tailored to every individual.
            </p>
          </div>
          <div
            className={`${styles.image_container} ${styles["data-aos"]} ${styles["data-aos-easing"]} ${styles["data-aos-delay"]}`}
            data-aos="zoom-out-left"
            data-aos-easing="ease"
            data-aos-delay="300"
          >
            <img
              src="https://res.cloudinary.com/dv6bqnxqf/image/upload/v1738342139/pexels-pavel-danilyuk-7653089_bdzw3j.jpg"
              alt="Pharmacy"
              className="w-full h-full object-cover rounded-xl"
            />
            <AOSInit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;

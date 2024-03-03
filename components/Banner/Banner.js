import { Carousel, Typography, Button } from "@material-tailwind/react";
import Navbar from "../Navbar/Navbar";
import styles from "./Banner.module.css";

export function Banner() {
  return (
    <>
      <Navbar />
      <div className={styles.banner_wrapper}>
        <Carousel className="w-full h-full">
          <div
            className={`${styles.carousel_page} "relative h-full w-full hidden"`}
          >
            <video
              className="h-full w-full object-cover z-50"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="/data/demo.webm"
                type="video/mp4"
              />
            </video>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full "`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>Predict Diseases</h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full"`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>Latest Medical News</h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvbkxackj;vbas;ovjkasldbnvk;jasdfbvadsfk;jvbasfvaskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full"`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>Nearest Pharamcies</h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvbkxackj;vbas;ovjkasldbnvk;jasdfbvadsfk;jvbasfvaskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full"`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>Nearest Hospitals</h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvbkxackj;vbas;ovjkasldbnvk;jasdfbvadsfk;jvbasfvaskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full"`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>Medicine Details</h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvbkxackj;vbas;ovjkasldbnvk;jasdfbvadsfk;jvbasfvaskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
          <div className={`${styles.carousel_page} "relative h-full w-full"`}>
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div
                className={`${styles.caro_div} "w-3/4 text-center md:w-2/4 p-8 flex justify-center align-center flex-col" `}
              >
                <h1 className={styles.carousel_title}>
                  Personalized Diet-Chart
                </h1>
                <p className={styles.carousel_desc}>
                  xcojvlbaxnckjlvbkxackj;vbas;ovjkasldbnvk;jasdfbvadsfk;jvbasfvaskjdbvaskljvbadsklvjafs,bvhadsklvj,basdf
                  kvhjasdb vkhasdjbvas dkjv,bmasdkvjadsbvkj
                </p>
                <button className={styles.carousel_btn}>Explore</button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}

import React from 'react'
import styles from './introduction.module.css'
const Introduction = () => {
  return (
    <div className={styles.page_wrapper}>
      <h1>About</h1>
      <div className={styles.intro_wrapper}>
        <div className={styles.card_wrapper}>
          <div className={styles.image_container}></div>
          <div className={styles.info_container}></div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.image_container}></div>
          <div className={styles.info_container}></div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.image_container}></div>
          <div className={styles.info_container}></div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.image_container}></div>
          <div className={styles.info_container}></div>
        </div>
        <div className={styles.card_wrapper}>
          <div className={styles.image_container}></div>
          <div className={styles.info_container}></div>
        </div>
      </div>
    </div>
  );
}

export default Introduction
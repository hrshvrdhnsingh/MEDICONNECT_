import React from 'react';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <div className={styles.content}>
      <div className={styles.pill}>
        <div className={styles.medicine}>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className={styles.side}></div>
        <div className={styles.side}></div>
      </div>
    </div>
  );
}

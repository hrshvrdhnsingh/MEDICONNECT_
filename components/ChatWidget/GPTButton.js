import styles from "./ChatWidget.module.css";

export default function GPTButton({ onClick }) {
    return (
        <div className={styles.button_container}>
            <button className={styles.btn} onClick={onClick}>
                <svg
                    height="28"
                    width="28"
                    fill="#FFFFFF"
                    viewBox="0 0 24 24"
                    data-name="Layer 1"
                    id="Layer_1"
                    className={styles.sparkle}
                >
                    <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className={styles.text}>Ask MediAid</span>
            </button>
        </div>
    );
}

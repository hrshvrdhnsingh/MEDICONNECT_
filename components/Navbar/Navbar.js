import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // State for toggling the menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={styles.nav_bar}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          MediConnect
        </Link>
        {/* Show FaBars icon only on small screens */}
        <FaBars
          className={`${styles.menu_icon} ${menuOpen ? styles.hidden : ""}`}
          onClick={toggleMenu}
        />
        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <Link
            href="/diseasePrediction"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Predict Disease
          </Link>
          <Link
            href="/nearestPharmacies"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Nearest Pharmacies
          </Link>
          <Link
            href="/nearestHospitals"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Nearest Hospitals
          </Link>
          <Link
            href="/medicineDetails"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Seach Medicine
          </Link>
          <Link
            href="/nutritionChart"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Nutrition Chart
          </Link>
        </nav>
      </header>

      <div
        className={`${styles.nav_bg} ${menuOpen ? styles.active : ""}`}
      ></div>
    </div>
  );
};

export default Navbar;

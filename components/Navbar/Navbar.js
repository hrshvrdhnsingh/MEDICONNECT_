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
        <nav className={`rounded-xl px-4 bg-transparent navbar w-[65%] text-blue-300 text-xl font-medium ${menuOpen ? "active" : ""}`}>
          <Link href="/diseasePrediction" onClick={closeMenu} className={styles.navbar_link}> Predict Disease</Link>
          <Link href="/nearestPharmacies" onClick={closeMenu} className={styles.navbar_link}> Pharmacies</Link>
          <Link href="/nearestHospitals" onClick={closeMenu} className={styles.navbar_link}> Hospitals</Link>
          <Link href="/medicineDetails" onClick={closeMenu} className={styles.navbar_link}> Search Medicine</Link>
          <Link href="/nutritionChart" onClick={closeMenu} className={styles.navbar_link}> Nutrition Chart</Link>
        </nav>
      </header>
      <div
        className={`${styles.nav_bg} ${menuOpen ? styles.active : ""}`}
      ></div>
    </div>
  );
};

export default Navbar;

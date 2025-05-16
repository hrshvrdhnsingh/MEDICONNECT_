import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.nav_bar}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          MediConnect
        </Link>

        {/* Menu Icon */}
        <FaBars className={styles.menu_icon} onClick={toggleMenu} />

        {/* Navigation Menu */}
        <nav className={`${styles.navbar} ${menuOpen ? styles.active : ""}`}>
          <Link href="/diseasePrediction" className={styles.navbar_link} onClick={closeMenu}>
            Predict Disease
          </Link>
          <Link href="/nearestPharmacies" className={styles.navbar_link} onClick={closeMenu}>
            Pharmacies
          </Link>
          <Link href="/nearestHospitals" className={styles.navbar_link} onClick={closeMenu}>
            Hospitals
          </Link>
          <Link href="/medicineDetails" className={styles.navbar_link} onClick={closeMenu}>
            Search Medicine
          </Link>
          <Link href="/nutritionChart" className={styles.navbar_link} onClick={closeMenu}>
            Nutrition Chart
          </Link>
          <Link href='/dashboard' type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center">Dashboard</Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

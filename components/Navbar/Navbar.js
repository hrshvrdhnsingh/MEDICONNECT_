import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // State for toggling the menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleCheckboxChange = () => {
    // Handle checkbox change if needed
  };

  return (
    <div className={styles.nav_bar}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          MediConnect
        </Link>
        {/* Show FaBars icon only on small screens */}
        <FaBars className={styles.menu_icon} onClick={toggleMenu} />
        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <Link
            href="/nearestHospitals"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Health
          </Link>
          <Link
            href="/science"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Science
          </Link>
          <Link
            href="/technology"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            Technology
          </Link>
          <Link
            href="/india"
            onClick={closeMenu}
            className={styles.navbar_link}
          >
            India News
          </Link>
        </nav>
        {/* <input
          type="checkbox"
          className={styles.theme_checkbox}
          onChange={handleCheckboxChange}
        /> */}
      </header>

      <div
        className={`${styles.nav_bg} ${menuOpen ? styles.active : ""}`}
      ></div>
    </div>
  );
};

export default Navbar;

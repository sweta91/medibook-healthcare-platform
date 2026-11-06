"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.scss";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Specialties", href: "/doctors" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "About Us", href: "/#about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header} ref={menuRef}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="MediBook home"
          onClick={() => setIsMenuOpen(false)}
        >
          Medi<span>Book.</span>
        </Link>

        <nav
          className={`${styles.desktopNav} ${
            isMenuOpen ? styles.navOpen : ""
          }`}
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.activeLink : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className={styles.loginLink}>
            Log In
          </Link>

            <Link href="/signup" className={styles.signupButton}>
            Sign Up
            </Link>

          <Link
            href="/doctors"
            className={styles.bookButton}
            onClick={() => setIsMenuOpen(false)}
          >
            Book Appointment
          </Link>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          isMenuOpen ? styles.mobileNavOpen : ""
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink} ${
              pathname === link.href ? styles.activeLink : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/doctors"
          className={styles.mobileBookButton}
          onClick={() => setIsMenuOpen(false)}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          Book Appointment
        </Link>
      </nav>
    </header>
  );
}
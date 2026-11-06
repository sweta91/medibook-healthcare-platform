"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";
import styles from "./page.module.scss";

type SortOption = "rating" | "experience" | "fee-low" | "fee-high";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const specialties = [
    "All Specialties",
    ...Array.from(new Set(doctors.map((doctor) => doctor.specialty))),
  ];

  const filteredDoctors = useMemo(() => {
    const term = search.trim().toLowerCase();

    return doctors
      .filter((doctor) => {
        const matchesSearch =
          doctor.name.toLowerCase().includes(term) ||
          doctor.specialty.toLowerCase().includes(term) ||
          doctor.qualification.toLowerCase().includes(term);

        const matchesSpecialty =
          specialty === "All Specialties" ||
          doctor.specialty === specialty;

        return matchesSearch && matchesSpecialty;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "experience":
            return b.experience - a.experience;
          case "fee-low":
            return a.consultationFee - b.consultationFee;
          case "fee-high":
            return b.consultationFee - a.consultationFee;
          default:
            return 0;
        }
      });
  }, [search, specialty, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSpecialty("All Specialties");
    setSortBy("rating");
  };

  return (
    <main className={styles.page}>
     {/* <header/> */}

      <section className={styles.hero}>
        <span className={styles.eyebrow}>FIND YOUR SPECIALIST</span>
        <h1>Find the right doctor for your health</h1>
        <p>
          Browse trusted healthcare professionals and find
          the right specialist for your needs.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search doctor, specialty or qualification..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search doctors"
            />
          </div>

          <div className={styles.sortBox}>
            <label htmlFor="sortDoctors">Sort by</label>
            <select
              id="sortDoctors"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.filters}>
            <div className={styles.filterHeading}>
              <h2>Filters</h2>
              <button type="button" onClick={clearFilters}>
                Clear all
              </button>
            </div>

            <div className={styles.filterGroup}>
              <h3>Specialty</h3>

              {specialties.map((item) => (
                <label className={styles.filterOption} key={item}>
                  <input
                    type="radio"
                    name="specialty"
                    value={item}
                    checked={specialty === item}
                    onChange={() => setSpecialty(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeading}>
              <div>
                <h2>Available Doctors</h2>
                <p>
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                </p>
              </div>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className={styles.doctorGrid}>
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span>🔍</span>
                <h3>No doctors found</h3>
                <p>Try changing your search or specialty filter.</p>
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
    
  );
}

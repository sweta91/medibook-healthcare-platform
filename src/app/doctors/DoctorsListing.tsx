
"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";
import styles from "./page.module.scss";

type SortOption = "rating" | "experience" | "fee-low" | "fee-high";

const specialties = Array.from(
  new Set(doctors.map((doctor) => doctor.specialty))
);

const specialtyAliases: Record<string, string[]> = {
  cardiology: ["cardiologist"],
  "dental care": ["dentist"],
};

function normalizeTerm(value: string) {
  return value.trim().toLowerCase();
}

function DoctorsListingContent() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [experience, setExperience] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount =
    selectedSpecialties.length +
    Number(minFee !== "") +
    Number(maxFee !== "") +
    Number(minRating !== "0") +
    Number(experience !== "all") +
    Number(availability !== "all");

  const filteredDoctors = useMemo(() => {
    const term = normalizeTerm(search);

    return doctors
      .filter((doctor) => {
        const searchableText = [
          doctor.name,
          doctor.specialty,
          doctor.qualification,
        ]
          .join(" ")
          .toLowerCase();

        const aliases = specialtyAliases[term] ?? [];
        const matchesSearch =
          !term ||
          searchableText.includes(term) ||
          aliases.some((alias) => searchableText.includes(alias));

        const matchesSpecialty =
          selectedSpecialties.length === 0 ||
          selectedSpecialties.includes(doctor.specialty);

        const matchesMinFee =
          minFee === "" || doctor.consultationFee >= Number(minFee);

        const matchesMaxFee =
          maxFee === "" || doctor.consultationFee <= Number(maxFee);

        const matchesRating =
          doctor.rating >= Number(minRating);

        const matchesExperience =
          experience === "all" ||
          (experience === "0-5" && doctor.experience <= 5) ||
          (experience === "5-10" &&
            doctor.experience > 5 &&
            doctor.experience <= 10) ||
          (experience === "10+" && doctor.experience > 10);

        const matchesAvailability =
          availability === "all" ||
          (availability === "today" &&
            doctor.availability.toLowerCase().includes("today")) ||
          (availability === "tomorrow" &&
            doctor.availability.toLowerCase().includes("tomorrow"));

        return (
          matchesSearch &&
          matchesSpecialty &&
          matchesMinFee &&
          matchesMaxFee &&
          matchesRating &&
          matchesExperience &&
          matchesAvailability
        );
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
  }, [
    search,
    selectedSpecialties,
    minFee,
    maxFee,
    minRating,
    experience,
    availability,
    sortBy,
  ]);

  const toggleSpecialty = (item: string) => {
    setSelectedSpecialties((previous) =>
      previous.includes(item)
        ? previous.filter((specialty) => specialty !== item)
        : [...previous, item]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedSpecialties([]);
    setMinFee("");
    setMaxFee("");
    setMinRating("0");
    setExperience("all");
    setAvailability("all");
    setSortBy("rating");
  };

  return (
    <main className={styles.page}>
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

          <button
            type="button"
            className={styles.mobileFilterButton}
            onClick={() => setMobileFiltersOpen((previous) => !previous)}
            aria-expanded={mobileFiltersOpen}
          >
            Filters ({activeFilterCount})
          </button>
        </div>

        <div className={styles.layout}>
          <aside
            className={`${styles.filters} ${
              mobileFiltersOpen ? styles.filtersOpen : ""
            }`}
          >
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
                    type="checkbox"
                    checked={selectedSpecialties.includes(item)}
                    onChange={() => toggleSpecialty(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <h3>Consultation Fee</h3>

              <div className={styles.feeInputs}>
                <label>
                  <span>Min (₹)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="500"
                    value={minFee}
                    onChange={(event) => setMinFee(event.target.value)}
                  />
                </label>

                <label>
                  <span>Max (₹)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="1500"
                    value={maxFee}
                    onChange={(event) => setMaxFee(event.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h3>Minimum Rating</h3>
              <select
                className={styles.filterSelect}
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
              >
                <option value="0">All Ratings</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="4">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <h3>Experience</h3>
              <select
                className={styles.filterSelect}
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
              >
                <option value="all">Any Experience</option>
                <option value="0-5">0–5 Years</option>
                <option value="5-10">5–10 Years</option>
                <option value="10+">10+ Years</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <h3>Availability</h3>
              <select
                className={styles.filterSelect}
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
              >
                <option value="all">Any Availability</option>
                <option value="today">Available Today</option>
                <option value="tomorrow">Available Tomorrow</option>
              </select>
            </div>

            <button
              type="button"
              className={styles.mobileApplyButton}
              onClick={() => setMobileFiltersOpen(false)}
            >
              Show {filteredDoctors.length} Doctors
            </button>
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
                <p>Try changing your search or filters.</p>
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

export default function DoctorsListing() {
  return (
    <Suspense fallback={<main className={styles.page}>Loading doctors...</main>}>
      <DoctorsListingContent />
    </Suspense>
  );
}

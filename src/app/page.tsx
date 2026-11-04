import styles from "./page.module.scss";

import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";

const specialties = [
  { icon: "❤️", name: "Cardiology", doctors: "12 Doctors" },
  { icon: "🧠", name: "Neurology", doctors: "8 Doctors" },
  { icon: "🦷", name: "Dental Care", doctors: "15 Doctors" },
  { icon: "👁️", name: "Ophthalmology", doctors: "10 Doctors" },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <header className={styles.header}>
        <a className={styles.logo} href="/">
          Medi<span>Book.</span>
        </a>

        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#specialties">Specialties</a>
          <a href="#doctors">Find Doctors</a>
          <a href="#about">About Us</a>
        </nav>

        <div className={styles.actions}>
          <button className={styles.login}>Log In</button>
          <button className={styles.signup}>Sign Up</button>
        </div>
      </header>

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>
            Find the right doctor,
            <span> at the right time.</span>
          </h1>

          <p>
            Book appointments with trusted healthcare
            professionals. Quality care is just a click away.
          </p>

          <div className={styles.search}>
            <input placeholder="Search doctors, specialties..." />
            <button>Find a Doctor</button>
          </div>

          <div className={styles.trust}>
            <strong>500+</strong> Trusted Doctors
            <span>·</span>
            <strong>10k+</strong> Happy Patients
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.doctorCard}>
            <div className={styles.doctorIcon}>＋</div>
            <h3>Your health matters.</h3>
            <p>Expert care, whenever you need it.</p>
            <div className={styles.availability}>
              <span />
              Doctors available today
            </div>
          </div>
        </div>
      </section>

      <section className={styles.specialties} id="specialties">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>OUR SPECIALTIES</span>
            <h2>Explore medical specialties</h2>
          </div>
          <a href="#doctors">View all specialties →</a>
        </div>

        <div className={styles.specialtyGrid}>
          {specialties.map((item) => (
            <article className={styles.specialtyCard} key={item.name}>
              <div className={styles.specialtyIcon}>{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.doctors}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.featuredDoctors} id="doctors">
  <div className={styles.sectionHeading}>
    <div>
      <span className={styles.eyebrow}>MEET OUR EXPERTS</span>
      <h2>Our featured doctors</h2>
    </div>

    <a href="#doctors">View all doctors →</a>
  </div>

  <div className={styles.doctorGrid}>
    {doctors.map((doctor) => (
      <DoctorCard key={doctor.id} doctor={doctor} />
    ))}
  </div>
</section>
    </main>
  );
}




import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { doctors } from "@/data/doctors";
import styles from "./page.module.scss";
import AppointmentBooking from "@/components/appointments/AppointmentBooking";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function DoctorProfileContent({ params }: PageProps) {
  const { id } = await params;

  const doctor = doctors.find(
    (item) => item.id === Number(id)
  );

  if (!doctor) {
    return (
      <main className={styles.notFound}>
        <h1>Doctor not found</h1>
        <p>The doctor profile doesn't exist.</p>
        <Link href="/doctors">Back to doctors</Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Medi<span>Book.</span>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/doctors">Find Doctors</Link>
        </nav>

        <Link href="/doctors" className={styles.backLink}>
          ← Back to doctors
        </Link>
      </header> */}

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/doctors">Doctors</Link>
          <span>/</span>
          <span>{doctor.name}</span>
        </div>

        <section className={styles.profileCard}>
          <div className={styles.profileMain}>
            <div className={styles.imageWrapper}>
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={180}
                height={180}
                className={styles.image}
                unoptimized
              />
            </div>

            <div className={styles.profileInfo}>
              <span className={styles.specialty}>
                {doctor.specialty}
              </span>

              <h1>{doctor.name}</h1>

              <p className={styles.qualification}>
                {doctor.qualification}
              </p>

              <div className={styles.stats}>
                <span>★ {doctor.rating} Rating</span>
                <span>{doctor.reviews} Reviews</span>
                <span>{doctor.experience} Years Experience</span>
              </div>

              <span className={styles.availability}>
                <span />
                {doctor.availability}
              </span>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.aboutCard}>
            <h2>About the Doctor</h2>

            <p>
              {doctor.name} is a {doctor.specialty.toLowerCase()}.
              With {doctor.experience} years of experience and
              qualifications including {doctor.qualification},
              this doctor is listed on MediBook.
            </p>

            <div className={styles.infoSection}>
              <h3>Professional Details</h3>

              <div className={styles.infoRow}>
                <span>Specialty</span>
                <strong>{doctor.specialty}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Qualification</span>
                <strong>{doctor.qualification}</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Experience</span>
                <strong>{doctor.experience} years</strong>
              </div>

              <div className={styles.infoRow}>
                <span>Patient reviews</span>
                <strong>{doctor.reviews}</strong>
              </div>
            </div>
          </section>

          <aside className={styles.bookingCard}>
            <span className={styles.bookingLabel}>
              CONSULTATION FEE
            </span>

            <h2>₹{doctor.consultationFee}</h2>
            <p>Per consultation</p>

            <div className={styles.bookingAvailability}>
              <span />
              {doctor.availability}
            </div>

            <Link
              href="#appointment"
              className={styles.bookingButton}
            >
              Book Appointment
            </Link>

            <p className={styles.bookingNote}>
              Appointment scheduling will be available soon.
            </p>
          </aside>
        </div>

      <div id="appointment">
        <AppointmentBooking
          doctorName={doctor.name}
          consultationFee={doctor.consultationFee}
        />
      </div>
      </div>
    </main>
  );
}

export default function DoctorProfilePage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main style={{ padding: "40px" }}>
          Loading doctor profile...
        </main>
      }
    >
      <DoctorProfileContent params={params} />
    </Suspense>
  );
}

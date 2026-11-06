
import Image from "next/image";
import { Doctor } from "@/types/doctor";
import styles from "./DoctorCard.module.scss";
import Link from "next/link";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={120}
          height={120}
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.details}>
        <span className={styles.specialty}>
          {doctor.specialty}
        </span>
        <span className={styles.availability}>
          {doctor.availability}
        </span>

        <h3>{doctor.name}</h3>

        <p className={styles.qualification}>
          {doctor.qualification}
        </p>

        <div className={styles.meta}>
          <span>★ {doctor.rating}</span>
          <span>{doctor.experience} Years Experience</span>
        </div>

        <div className={styles.footer}>
          <div>
            <strong>₹{doctor.consultationFee}</strong>
            <p>Consultation fee</p>
          </div>

          <Link
              href={`/doctors/${doctor.id}`}
              className={styles.bookButton}
            >
              View Profile
            </Link>
        </div>
      </div>
    </article>
  );
}

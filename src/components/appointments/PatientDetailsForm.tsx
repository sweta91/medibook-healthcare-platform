"use client";

import { useState } from "react";
import styles from "./PatientDetailsForm.module.scss";

export type PatientDetails = {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
};

type PatientDetailsFormProps = {
  doctorName: string;
  consultationFee: number;
  appointmentDate: string;
  appointmentTime: string;
  initialValues?: PatientDetails | null;
  onBack: () => void;
  onSubmit: (details: PatientDetails) => void;
};

export default function PatientDetailsForm({
  doctorName,
  consultationFee,
  appointmentDate,
  appointmentTime,
  initialValues,
  onBack,
  onSubmit,
}: PatientDetailsFormProps) {
const [formData, setFormData] = useState<PatientDetails>(
  initialValues ?? {
    fullName: "",
    email: "",
    phone: "",
    reason: "",
  }
);

  const [errors, setErrors] = useState<
    Partial<Record<keyof PatientDetails, string>>
  >({});

  const updateField = (
    field: keyof PatientDetails,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<
      Record<keyof PatientDetails, string>
    > = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter the patient's full name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please enter the reason for your visit.";
    } else if (formData.reason.trim().length < 5) {
      newErrors.reason = "Please provide at least 5 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      reason: formData.reason.trim(),
    });
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>ALMOST THERE</span>
        <h2>Patient Details</h2>
        <p>Please provide your details to continue with the booking.</p>
      </div>

      <div className={styles.formLayout}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <h3>Personal Information</h3>

          <div className={styles.field}>
            <label htmlFor="fullName">Patient Full Name *</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter patient's full name"
              value={formData.fullName}
              onChange={(event) =>
                updateField("fullName", event.target.value)
              }
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? "fullName-error" : undefined
              }
            />
            {errors.fullName && (
              <span id="fullName-error" className={styles.error}>
                {errors.fullName}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
            />
            {errors.email && (
              <span id="email-error" className={styles.error}>
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Mobile Number *</label>
            <div className={styles.phoneInput}>
              <span>+91</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={formData.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? "phone-error" : undefined
                }
              />
            </div>
            {errors.phone && (
              <span id="phone-error" className={styles.error}>
                {errors.phone}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="reason">Reason for Appointment *</label>
            <textarea
              id="reason"
              rows={4}
              placeholder="Briefly describe your concern..."
              value={formData.reason}
              onChange={(event) =>
                updateField("reason", event.target.value)
              }
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={
                errors.reason ? "reason-error" : undefined
              }
            />
            {errors.reason && (
              <span id="reason-error" className={styles.error}>
                {errors.reason}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.backButton}
              onClick={onBack}
            >
              Back to Calendar
            </button>

            <button type="submit" className={styles.submitButton}>
              Review Booking
            </button>
          </div>
        </form>

        <aside className={styles.summaryCard}>
          <h3>Appointment Summary</h3>

          <div className={styles.doctorInfo}>
            <span className={styles.doctorIcon}>+</span>
            <div>
              <strong>{doctorName}</strong>
              <span>Doctor consultation</span>
            </div>
          </div>

          <div className={styles.summaryRow}>
            <span>Appointment Date</span>
            <strong>{appointmentDate}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Appointment Time</span>
            <strong>{appointmentTime}</strong>
          </div>

          <div className={styles.feeRow}>
            <span>Consultation Fee</span>
            <strong>₹{consultationFee}</strong>
          </div>

          <p className={styles.note}>
            Please review your appointment details before proceeding.
          </p>
        </aside>
      </div>
    </section>
  );
}
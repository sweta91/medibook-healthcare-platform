"use client";

import { useMemo, useState } from "react";
import styles from "./AppointmentBooking.module.scss";
import PatientDetailsForm, {
  type PatientDetails,
} from "./PatientDetailsForm";

type AppointmentBookingProps = {
  doctorName: string;
  consultationFee: number;
};

const timeSlots = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: false },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: false },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
];



export default function AppointmentBooking({
  doctorName,
  consultationFee,
}: AppointmentBookingProps) {
 const [patientDetails, setPatientDetails] =
  useState<PatientDetails | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [showNextStep, setShowNextStep] = useState(false);
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      return {
        value: date.toDateString(),
        day: date.toLocaleDateString("en-IN", {
          weekday: "short",
        }),
        date: date.getDate(),
        month: date.toLocaleDateString("en-IN", {
          month: "short",
        }),
        label: date.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    });
  }, []);
 const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const activeDate = dates.find(
    (date) => date.value === selectedDate
  );
if (patientDetails) {
  return (
    <section className={styles.bookingSection}>
      <div className={styles.sectionHeading}>
        <span className={styles.eyebrow}>DETAILS COMPLETED</span>
        <h2>Patient Details Saved</h2>
        <p>
          Your details have been validated successfully.
        </p>
      </div>

      <div className={styles.calendarCard}>
        <h3>{patientDetails.fullName}</h3>
        <p>{patientDetails.email}</p>
        <p>{patientDetails.phone}</p>
        <p>{patientDetails.reason}</p>

        <button
        type="button"
        className={styles.continueButton}
        onClick={() => {
            setShowNextStep(true);
        }}
        >
        Edit Patient Details
        </button>
      </div>
    </section>
  );
}

if (showNextStep) {
  return (
    <PatientDetailsForm
      doctorName={doctorName}
      consultationFee={consultationFee}
      appointmentDate={activeDate?.label ?? ""}
      appointmentTime={selectedTime}
      initialValues={patientDetails}
      onBack={() => setShowNextStep(false)}
      onSubmit={(details) => {
        setPatientDetails(details);
        setShowNextStep(false);
      }}
    />
  );
}
  return (
    <section className={styles.bookingSection}>
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.eyebrow}>BOOK YOUR VISIT</span>
          <h2>Appointment Booking</h2>
          <p>Select your preferred date and consultation time.</p>
        </div>
      </div>

      <div className={styles.bookingLayout}>
        <div className={styles.calendarCard}>
          <h3>Select Appointment Date</h3>

          <div className={styles.dateGrid}>
            {dates.map((date) => (
              <button
                type="button"
                key={date.value}
                className={`${styles.dateButton} ${
                  selectedDate === date.value
                    ? styles.activeDate
                    : ""
                }`}
                onClick={() => {
                    setSelectedDate(date.value);
                    setSelectedTime("");
                    setShowNextStep(false);
                    }}
                aria-pressed={selectedDate === date.value}
              >
                <span>{date.day}</span>
                <strong>{date.date}</strong>
                <span>{date.month}</span>
              </button>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.slotHeading}>
            <div>
              <h3>Available Time Slots</h3>
              <p>{activeDate?.label}</p>
            </div>

            <span className={styles.timeZone}>
              <span /> Available
            </span>
          </div>

          <div className={styles.slotGrid}>
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot.time}
                disabled={!slot.available}
                className={`${styles.timeSlot} ${
                  selectedTime === slot.time
                    ? styles.activeSlot
                    : ""
                }`}
                onClick={() => {
                    setSelectedTime(slot.time);
                    setShowNextStep(false);
                    }}
                aria-pressed={selectedTime === slot.time}
              >
                {slot.time}
              </button>
            ))}
          </div>

          <div className={styles.slotLegend}>
            <span>
              <i className={styles.availableDot} /> Available
            </span>
            <span>
              <i className={styles.unavailableDot} /> Booked
            </span>
            <span>
              <i className={styles.selectedDot} /> Selected
            </span>
          </div>
        </div>

        <aside className={styles.summaryCard}>
          <h3>Booking Summary</h3>

          <div className={styles.summaryDoctor}>
            <span className={styles.doctorIcon}>+</span>
            <div>
              <strong>{doctorName}</strong>
              <span>Doctor consultation</span>
            </div>
          </div>

          <div className={styles.summaryRow}>
            <span>Date</span>
            <strong>{activeDate?.label ?? "Not selected"}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Time</span>
            <strong>{selectedTime || "Not selected"}</strong>
          </div>

          <div className={styles.summaryDivider} />

          <div className={styles.feeRow}>
            <span>Consultation Fee</span>
            <strong>₹{consultationFee}</strong>
          </div>

          <button
            type="button"
            className={styles.continueButton}
            disabled={!selectedDate || !selectedTime}
            onClick={() => setShowNextStep(true)}
          >
            Continue to Patient Details
          </button>
       

          <p className={styles.summaryNote}>
            Your appointment is not confirmed yet. You can review
            your details before final booking.
          </p>
        </aside>
      </div>
    </section>
  );
}
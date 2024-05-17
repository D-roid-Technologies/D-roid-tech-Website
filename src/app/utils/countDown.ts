// A React hook that calculates and updates the remaining time until an offer expires, 
// based on the provided course details. It returns an object with days, hours, minutes, and seconds.
import { useState, useEffect } from "react";
import { Course } from "./Types";

export const useTimer = (course: Course | undefined) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // useEffect(() => {
  //   const calculateTimeRemaining = () => {
  //     const now = new Date();
  //     const [expiryHours, expiryMinutes, expirySeconds] =
  //       course?.courseDetails.offerExpiry.split(" : ").map(Number) ?? [0, 0, 0];
  //     const offerExpiryDate = new Date(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       expiryHours,
  //       expiryMinutes,
  //       expirySeconds
  //     );

  //     const difference = offerExpiryDate.getTime() - now.getTime();

  //     if (difference > 0) {
  //       const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  //       const remainingHours = Math.floor(
  //         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const remainingMinutes = Math.floor(
  //         (difference % (1000 * 60 * 60)) / (1000 * 60)
  //       );
  //       const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

  //       setTimeRemaining({
  //         days: remainingDays,
  //         hours: remainingHours,
  //         minutes: remainingMinutes,
  //         seconds: remainingSeconds,
  //       });
  //     } else {
  //       // Offer has expired
  //       setTimeRemaining({
  //         days: 0,
  //         hours: 0,
  //         minutes: 0,
  //         seconds: 0,
  //       });
  //       clearInterval(interval);
  //     }
  //   };

  //   const interval = setInterval(calculateTimeRemaining, 1000);

  //   return () => clearInterval(interval);
  // }, [course]);

  // return timeRemaining;
};

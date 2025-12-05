import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  performSpin,
  startSpinning,
  stopSpinning,
  selectRemainingGifts,
  selectIsSpinning,
  selectUserSpins,
  selectLatestUserSpin,
  selectCanUserSpin,
} from "../../../redux/slices/spinnerSlice";
import { RootState } from "../../../redux/Store";
import styles from "./SpinnerModal.module.css";

interface SpinnerModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSpinComplete?: (outcome: number, giftAwarded: boolean) => void;
}

export default function SpinnerModal({
  userId,
  isOpen,
  onClose,
  onSpinComplete,
}: SpinnerModalProps) {
  const dispatch = useDispatch();
  const remainingGifts = useSelector(selectRemainingGifts);
  const isSpinning = useSelector(selectIsSpinning);
  const userSpins = useSelector((state: RootState) =>
    selectUserSpins(state, userId)
  );
  const latestUserSpin = useSelector((state: RootState) =>
    selectLatestUserSpin(state, userId)
  );
  const canSpin = useSelector((state: RootState) =>
    selectCanUserSpin(state, userId)
  );

  const spinCount = userSpins.length;

  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState<number | null>(null);

  // Mapped segments matching Redux IDs
  // NOTE: Order matters for the wheel visual construction!
  const segments = [
    { value: 1, label: "Phone Stand", emoji: "📱" }, // Index 0
    { value: 2, label: "Gaming Mouse", emoji: "🎮" }, // Index 1
    { value: 3, label: "Sweets", emoji: "🍬" }, // Index 2
    { value: 4, label: "Speakers", emoji: "🔊" }, // Index 3
    { value: 5, label: "Biscuits", emoji: "🍪" }, // Index 4
    { value: 6, label: "Biscuits", emoji: "🍪" }, // Index 5
    { value: 0, label: "Try Again", emoji: "😊" }, // Index 6
  ];

  const colors = [
    "#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#EF476F", "#073B4C",
  ];

  // Generate Conic Gradient for background
  const generateConicGradient = () => {
    const degPerSegment = 360 / segments.length;
    let gradientString = "conic-gradient(";
    const offset = -degPerSegment / 2;
    gradientString += `from ${offset}deg, `;
    segments.forEach((_, index) => {
      const color = colors[index % colors.length];
      const startDeg = index * degPerSegment;
      const endDeg = (index + 1) * degPerSegment;
      gradientString += `${color} ${startDeg}deg ${endDeg}deg${
        index === segments.length - 1 ? "" : ", "
      }`;
    });
    gradientString += ")";
    return gradientString;
  };

  // Handle the spin action
  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    // Start the spin
    dispatch(startSpinning());
    setShowResult(false);

    // Generate the outcome in Redux
    dispatch(performSpin(userId));
  };

  // Handle clicking anywhere on the wheel
  const handleWheelClick = () => {
    if (!isSpinning) {
      handleSpin();
    }
  };

  // Watch for the Spin Result and Animate when it arrives
  useEffect(() => {
    // Only animate if we are in 'spinning' state and have a valid result
    if (isSpinning && latestUserSpin && userSpins.length > 0) {
      const latestSpin = userSpins[userSpins.length - 1];
      const outcome = latestSpin.outcome;

      // Calculate target rotation
      const segmentAngle = 360 / segments.length;
      const targetIndex = segments.findIndex((s) => s.value === outcome);

      // Calculate how much to rotate to land 'targetIndex' at the top (0deg)
      // If we want index X at top, we rotate MINUS (X * angle)
      // We add extra full spins (360 * 5) for effect
      const degreesToLand = 360 - (targetIndex * segmentAngle);
      const randomSpins = 5;
      const newRotation = rotation + (360 * randomSpins) + degreesToLand;

      setRotation(newRotation);

      // Wait for animation (3 seconds) then show result
      setTimeout(() => {
        dispatch(stopSpinning());
        setFinalOutcome(outcome);
        setShowResult(true);
        onSpinComplete?.(outcome, latestSpin.giftAwarded);
      }, 3000);
    }
    // If user loads page and has ALREADY spun previously
    else if (!isSpinning && latestUserSpin && finalOutcome === null) {
      setFinalOutcome(latestUserSpin.outcome);
      setShowResult(true);
    }
  }, [userSpins, isSpinning, dispatch]);

  const getStatusMessage = () => {
    if (isSpinning) return "Spinning...";
    if (remainingGifts === 0) return `All gifts claimed (${spinCount} spins)`;
    return `Spin to Win! (${spinCount} spins)`;
  };

  const getSpinButtonText = () => {
    if (isSpinning) return "Spinning...";
    return "Click to Spin!";
  };

  const getPrizeLabel = (outcome: number | null) => {
    const segment = segments.find((s) => s.value === outcome);
    return segment?.label || "Unknown";
  };

  const getResultEmoji = (outcome: number | null) => {
    const segment = segments.find((s) => s.value === outcome);
    return segment?.emoji || "😊";
  };

  // Lock scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={styles.modalContent}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>🎁 Spin & Win</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusText}>
            {getStatusMessage()}
            {remainingGifts > 0 && (
              <span className={styles.giftsRemaining}>
                • {remainingGifts} {remainingGifts === 1 ? 'gift' : 'gifts'} remaining
              </span>
            )}
          </span>
        </div>

        <div className={styles.wheelSection}>
          <div className={styles.wheelContainer}>
            <div className={styles.pointer}>▼</div>

            <motion.div
              className={`${styles.wheel} ${!isSpinning ? styles.clickable : ''}`}
              animate={{ rotate: rotation }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ background: generateConicGradient() }}
              onClick={handleWheelClick}
              whileHover={!isSpinning ? { scale: 1.02 } : {}}
              whileTap={!isSpinning ? { scale: 0.98 } : {}}
            >
              {segments.map((segment, index) => {
                const angleDeg = (360 / segments.length) * index;
                return (
                  <div
                    key={index}
                    className={styles.segmentLabelContainer}
                    style={{ transform: `rotate(${angleDeg}deg)` }}
                  >
                    <div className={styles.segmentContent}>
                      <span className={styles.segmentEmoji}>{segment.emoji}</span>
                      <span className={styles.segmentText}>{segment.label}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <button
              className={`${styles.spinButton} ${
                !canSpin || isSpinning ? styles.disabled : ""
              }`}
              onClick={handleSpin}
              disabled={!canSpin || isSpinning}
            >
              {getSpinButtonText()}
            </button>
          </div>
        </div>

        <div className={styles.resultSection}>
          <AnimatePresence>
            {showResult && finalOutcome !== null && (
              <motion.div
                className={styles.resultCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.resultIcon}>
                  {getResultEmoji(finalOutcome)}
                </div>
                <h3 className={styles.resultTitle}>
                  {/* Hide Number, show Item Name */}
                  {finalOutcome === 0 ? "Try Again" : getPrizeLabel(finalOutcome)}
                </h3>
                <p className={styles.resultMessage}>
                  {finalOutcome === 0
                    ? "Better luck next time!"
                    : "Congratulations! You won this item."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
 
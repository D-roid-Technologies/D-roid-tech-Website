import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  performSpin,
  startSpinning,
  selectRemainingGifts,
  selectIsSpinning,
  selectUserSpin,
  selectCanUserSpin,
} from "../../../redux/slices/spinnerSlice";
import { RootState } from "../../../redux/Store";
import styles from "./spinner.module.css";

interface SpinnerProps {
  userId: string;
  onSpinComplete?: (outcome: number, giftAwarded: boolean) => void;
}

export default function Spinner({ userId, onSpinComplete }: SpinnerProps) {
  const dispatch = useDispatch();
  const remainingGifts = useSelector(selectRemainingGifts);
  const isSpinning = useSelector(selectIsSpinning);
  const userSpin = useSelector((state: RootState) => selectUserSpin(state, userId));
  const canSpin = useSelector((state: RootState) => selectCanUserSpin(state, userId));

  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState<number | null>(null);

  const numbers = [1, 2, 3, 4, 5, 6];
  const segmentAngle = 360 / numbers.length;

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    dispatch(startSpinning());
    setShowResult(false);

    // Generate random spins (4-7 full rotations)
    const randomSpins = Math.floor(Math.random() * 4) + 4;
    const totalRotation = rotation + randomSpins * 360;

    // Perform the spin in Redux
    dispatch(performSpin(userId));

    // Animate rotation
    setRotation(totalRotation);

    // Show result after animation completes
    setTimeout(() => {
      if (userSpin) {
        setFinalOutcome(userSpin.outcome);
        setShowResult(true);
        onSpinComplete?.(userSpin.outcome, userSpin.giftAwarded);
      }
    }, 3000);
  };

  useEffect(() => {
    if (userSpin) {
      setFinalOutcome(userSpin.outcome);
      setShowResult(true);
    }
  }, [userSpin]);

  const getStatusMessage = () => {
    if (userSpin) {
      return "You've already spun!";
    }
    if (remainingGifts === 0) {
      return "All gifts have been claimed";
    }
    return `${remainingGifts} gift${remainingGifts !== 1 ? "s" : ""} remaining`;
  };

  const isDisabled = !canSpin || remainingGifts === 0 || isSpinning;

 return (
  <div className={styles.spinnerContainer}>
    
    {/* Header */}
    <div className={styles.header}>
      <h2 className={styles.title}>🎁 Spin to Win!</h2>
      <p className={styles.subtitle}>Try your luck for a chance to win amazing prizes</p>
    </div>

    {/* Status Badge */}
    <div className={styles.statusBadge}>
      <span className={styles.statusIcon}>🎯</span>
      <span className={styles.statusText}>{getStatusMessage()}</span>
    </div>

    {/* CENTER THE WHEEL */}
    <div className={styles.centerWrapper}>
      <div className={styles.wheelContainer}>
        {/* Pointer */}
        <div className={styles.pointer}>▼</div>

        {/* Numbers */}
        <div className={styles.numbersRing}>
          {numbers.map((num, index) => {
            const angle = (index / numbers.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 140;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={num}
                className={styles.numberLabel}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Wheel + Button */}
        <motion.div
          className={styles.wheel}
          animate={{ rotate: rotation }}
          transition={{
            duration: 3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {numbers.map((num, index) => {
            const segmentRotation = index * segmentAngle;
            return (
              <div
                key={num}
                className={styles.segment}
                style={{
                  transform: `rotate(${segmentRotation}deg)`,
                  background: `hsl(${(index * 60) % 360}, 70%, 60%)`,
                }}
              />
            );
          })}
        </motion.div>

        {/* Spin Button - moved outside wheel so it doesn't rotate */}
        <button
          className={`${styles.spinButton} ${isDisabled ? styles.disabled : ""}`}
          onClick={handleSpin}
          disabled={isDisabled}
        >
          {isSpinning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.div>
          ) : userSpin ? (
            "✓"
          ) : (
            "SPIN"
          )}
        </button>
      </div>
    </div>

    {/* RESULT BELOW SPINNER */}
    <div className={styles.resultSection}>
      <AnimatePresence>
        {showResult && finalOutcome !== null && (
          <motion.div
            className={styles.resultCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.resultContent}>
              <div className={styles.resultIcon}>
                {userSpin?.giftAwarded ? "🎉" : "😊"}
              </div>
              <h3 className={styles.resultTitle}>
                You landed on {finalOutcome}!
              </h3>
              <p className={styles.resultMessage}>
                {userSpin?.giftAwarded
                  ? "Congratulations! You won a gift!"
                  : "Thanks for playing!"}
              </p>
              {userSpin?.giftAwarded && (
                <div className={styles.prize}>
                  <span className={styles.prizeIcon}>🎁</span>
                  <span className={styles.prizeName}>Mystery Gift</span>
                </div>
              )}
              <p className={styles.prizeNote}>
                {userSpin?.giftAwarded
                  ? "Check your email for prize details"
                  : "Better luck next time!"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Footer */}
    <div className={styles.infoFooter}>
      <p className={styles.infoText}>
        Each registered user gets <strong>one spin</strong>. Good luck! 🍀
      </p>
    </div>
  </div>
);

}
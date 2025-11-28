import { useState } from "react";
import { motion } from "framer-motion";

export default function Spinner() {
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);

    const spin = () => {
        const randomTurns = Math.floor(Math.random() * 4) + 4;
        const newRotation = rotation + randomTurns * 360;
        setRotation(newRotation);

        const number: any = Math.floor(Math.random() * 6) + 1;
        setResult(number);
    };

    const numbers = [1, 2, 3, 4, 5, 6];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 relative">
            {/* Number labels around the spinner */}
            <div className="relative w-64 h-64">
                {numbers.map((num, index) => {
                    const angle = (index / numbers.length) * 2 * Math.PI;
                    const x = 100 * Math.cos(angle);
                    const y = 100 * Math.sin(angle);

                    return (
                        <div
                            key={num}
                            className="absolute text-xl font-bold"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            {num}
                        </div>
                    );
                })}

                {/* Spinner button */}
                <motion.div
                    onClick={spin}
                    animate={{ rotate: rotation }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 flex items-center justify-center text-3xl font-bold cursor-pointer shadow-xl bg-white"
                >
                    🎡
                </motion.div>
            </div>

            {result && (
                <div className="text-3xl font-semibold">
                    Result: <span className="font-bold">{result}</span>
                </div>
            )}
        </div>
    );
}
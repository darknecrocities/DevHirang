import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[200] bg-background flex items-center justify-center overflow-hidden"
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.15 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                                className="flex items-center justify-center gap-4 mb-4"
                            >
                                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-secondary" />
                                <span className="text-secondary font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] font-black">
                                    Established 2026
                                </span>
                                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-secondary" />
                            </motion.div>

                            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">
                                DEV<span className="text-secondary">HIRANG</span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="text-sm sm:text-base md:text-lg text-text-muted font-mono uppercase tracking-[0.3em] font-medium"
                            >
                                Where <span className="text-white italic">Legends</span> Reside
                            </motion.p>
                        </motion.div>

                        {/* Progress Line */}
                        <div className="mt-12 w-48 h-0.5 bg-white/5 mx-auto rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full w-full bg-secondary shadow-[0_0_10px_#CBFD02]"
                            />
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-12 left-12 hidden lg:block">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                            Secure Entry v2.0 // Terminal Protocol Active
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const TestimonialCarousel = ({ developers, onSelect }) => {
    const testimonials = developers
        .filter(dev => dev.testimonial)
        .map(dev => ({
            ...dev.testimonial,
            devName: dev.name,
            devAvatar: dev.avatar,
            devRole: dev.role[0],
            devId: dev.id,
            originalDev: dev
        }));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
            }
        })
    };

    if (testimonials.length === 0) return null;

    const current = testimonials[currentIndex];

    return (
        <section className="relative py-16 px-4 overflow-hidden">
            <div className="max-w-3xl mx-auto relative">
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none text-secondary">
                    <Quote className="w-48 h-48" />
                </div>

                <div className="relative min-h-[500px] sm:min-h-[400px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute w-full px-2 sm:px-8 py-6"
                        >
                            <div className="space-y-6 text-center bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[2rem] backdrop-blur-xl glow-primary">
                                <Quote className="w-8 h-8 text-secondary mx-auto opacity-50" />

                                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed font-mono italic text-white/90 px-2 lg:px-8">
                                    "{current.text}"
                                </p>

                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        onClick={() => onSelect(current.originalDev)}
                                        className="flex items-center gap-4 group hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/50 glow-secondary">
                                            <img src={current.devAvatar} alt={current.devName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <div className="text-left leading-tight">
                                            <p className="font-bold text-base text-white group-hover:text-secondary transition-colors">{current.devName}</p>
                                            <p className="text-xs text-text-muted font-mono">{current.devRole}</p>
                                        </div>
                                    </button>
                                    <div className="text-xs text-text-muted uppercase tracking-[0.2em] font-bold mt-2">
                                        — {current.author}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center items-center gap-6 mt-12 sm:mt-16">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/50 hover:text-white"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > currentIndex ? 1 : -1);
                                    setCurrentIndex(i);
                                }}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-500",
                                    i === currentIndex ? "bg-secondary w-8 glow-secondary" : "bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/50 hover:text-white"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;

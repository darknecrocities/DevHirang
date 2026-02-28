import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
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

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    if (testimonials.length === 0) return null;

    return (
        <section className="relative py-8 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                <div className="absolute -top-10 left-0 opacity-10 pointer-events-none text-secondary">
                    <Quote className="w-32 h-32" />
                </div>

                <h2 className="text-3xl font-bold mb-12 pl-2">Community Voices</h2>

                <div className="relative group">
                    <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex gap-6 items-stretch pb-10 pt-4 px-2">
                            {testimonials.map((current, index) => (
                                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 flex">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full flex flex-col justify-between space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-white/20 transition-colors cursor-pointer group/card"
                                        onClick={() => onSelect(current.originalDev)}
                                    >
                                        <Quote className="w-8 h-8 text-secondary opacity-50 absolute top-6 right-6" />

                                        <p className="text-sm xl:text-base leading-relaxed font-mono italic text-white/90 flex-grow pt-4">
                                            "{current.text}"
                                        </p>

                                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10 shrink-0">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-secondary/50 group-hover/card:border-secondary transition-colors shrink-0">
                                                <img src={current.devAvatar} alt={current.devName} className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all" />
                                            </div>
                                            <div className="text-left leading-tight min-w-0">
                                                <p className="font-bold text-sm text-white group-hover/card:text-secondary transition-colors truncate">{current.devName}</p>
                                                <p className="text-[10px] text-text-muted font-mono truncate">{current.devRole}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Embla scrolling controls omitted as per user request */}
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;

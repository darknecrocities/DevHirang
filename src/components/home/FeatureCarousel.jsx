import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const FeatureCarousel = ({ developers, onSelect }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    return (
        <div className="relative group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {developers.map((dev) => (
                        <div key={dev.id} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => onSelect(dev)}
                                className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer group/card border border-white/10"
                            >
                                <img
                                    src={dev.avatar}
                                    alt={dev.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                                <div className="absolute top-4 left-4 p-3 bg-secondary/90 backdrop-blur-md rounded-2xl text-background">
                                    <Trophy className="w-5 h-5 font-bold" />
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-primary/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-secondary">
                                            Featured Talent
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                                            {dev.role.join(' • ')}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white">{dev.name}</h3>
                                    <p className="text-sm text-text-muted line-clamp-2 max-w-[280px]">
                                        {dev.bio}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute -top-16 right-0 flex gap-2">
                <button
                    onClick={scrollPrev}
                    className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all active:scale-90"
                >
                    <ChevronLeft className="w-5 h-5 text-text-muted" />
                </button>
                <button
                    onClick={scrollNext}
                    className="p-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-white/30 transition-all active:scale-90"
                >
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                </button>
            </div>
        </div>
    );
};

export default FeatureCarousel;

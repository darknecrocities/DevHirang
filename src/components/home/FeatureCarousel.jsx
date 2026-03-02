import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Trophy, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const FeatureCarousel = ({ developers, onSelect, variant = 'monthly' }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1
    });

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const isYearly = variant === 'yearly';

    return (
        <div className="relative group px-4">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-8 py-4">
                    {developers.map((dev) => (
                        <div key={dev.id} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0">
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                onClick={() => onSelect(dev)}
                                className={cn(
                                    "relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer group/card transition-all duration-500",
                                    isYearly
                                        ? "premium-border-gold shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] shimmer-effect"
                                        : "border border-white/10 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/10"
                                )}
                            >
                                {/* Image with Overlay */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={dev.avatar}
                                        alt={dev.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                    />
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent",
                                        isYearly ? "opacity-90" : "opacity-80"
                                    )} />
                                </div>

                                {/* Floating Badge */}
                                <div className={cn(
                                    "absolute top-6 left-6 p-4 backdrop-blur-xl rounded-2xl shadow-2xl z-20 flex items-center justify-center border",
                                    isYearly
                                        ? "bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30 text-gold"
                                        : "bg-blue-500/20 border-blue-500/30 text-blue-400"
                                )}>
                                    {isYearly ? <Trophy className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4 z-20">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className={cn(
                                            "flex items-center gap-1.5 px-4 py-1.5 backdrop-blur-md border rounded-full text-[10px] font-bold uppercase tracking-[0.2em]",
                                            isYearly
                                                ? "bg-gold/10 border-gold/40 text-gold"
                                                : "bg-blue-500/10 border-blue-500/40 text-blue-400"
                                        )}>
                                            {isYearly && <Sparkles className="w-3 h-3" />}
                                            {isYearly ? 'Hall of Fame' : 'Elite Monthly'}
                                        </div>
                                        <div className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/70">
                                            {dev.role[0]}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className={cn(
                                            "text-3xl font-black tracking-tight",
                                            isYearly ? "text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold" : "text-white"
                                        )}>
                                            {dev.name}
                                        </h3>
                                        <p className="text-sm text-text-muted/80 line-clamp-2 leading-relaxed">
                                            {dev.bio}
                                        </p>
                                    </div>

                                    {/* Action Reveal */}
                                    <div className="pt-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50">
                                        <span>View Excellence Portfolio</span>
                                        <div className={cn(
                                            "h-[1px] flex-grow",
                                            isYearly ? "bg-gold/30" : "bg-blue-500/30"
                                        )} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Controls */}
            <div className="absolute -top-20 right-4 flex gap-4">
                <button
                    onClick={scrollPrev}
                    className="group/btn p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                >
                    <ChevronLeft className="w-6 h-6 text-text-muted group-hover/btn:text-white transition-colors" />
                </button>
                <button
                    onClick={scrollNext}
                    className="group/btn p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                >
                    <ChevronRight className="w-6 h-6 text-text-muted group-hover/btn:text-white transition-colors" />
                </button>
            </div>
        </div>
    );
};

export default FeatureCarousel;

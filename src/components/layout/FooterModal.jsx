import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, HelpCircle, Send } from 'lucide-react';

const FooterModal = ({ isOpen, onClose, type }) => {
    const content = {
        'Submit Achievement': {
            icon: <Send className="w-6 h-6 text-secondary" />,
            title: "Submit Your Achievement",
            description: "Go beyond numbers—tell the story of your impact and innovation.",
            details: [
                "Open Contribution Model: Our platform thrives on community input. You are encouraged to openly contribute your milestones through our public repository system.",
                "Narrative Impact: Provide a detailed account of your achievement, focusing on the technical challenges overcome and the project's broader significance to the ecosystem.",
                "Public Verification: Include links to public repositories, official event result pages, or verifiable digital certificates for peer review and community trust.",
                "Curated Selection: Submissions undergo a qualitative review by community leads to ensure they align with our standards of excellence and inspirational value."
            ]
        },
        'Member FAQ': {
            icon: <HelpCircle className="w-6 h-6 text-secondary" />,
            title: "Frequently Asked Questions",
            description: "Understanding the DevHirang philosophy and qualitative framework.",
            details: [
                "What makes a developer 'Elite'? Excellence is gauged by consistent community involvement, technical leadership, and the qualitative depth of their contributions.",
                "How do I improve my visibility? Focus on high-impact projects, mentoring others, and sharing your authentic journey through the Hinirang Stories section.",
                "Why the focus on qualitative growth? We believe that a developer's worth is more than just points; it's about the unique value and perspective they bring to the ecosystem.",
                "Who manages the platform? DevHirang is a community-owned initiative driven by volunteers dedicated to showcasing and elevating Pampanga's technical talent."
            ]
        },
        'Terms of Service': {
            icon: <FileText className="w-6 h-6 text-secondary" />,
            title: "Terms of Service",
            description: "Community standards and shared responsibilities for a thriving ecosystem.",
            details: [
                "Professional Code of Conduct: Members are expected to maintain the highest level of professional integrity. Misrepresentation of skills or achievements is strictly prohibited.",
                "Collaborative Participation: By contributing, you agree to engage respectfully with the community and uphold the values of open-source collaboration and transparency.",
                "Content Usage Rights: While you retain ownership of your professional data, by submitting it, you grant the platform a non-exclusive right to display and feature your profile.",
                "Platform Moderation: We reserve the right to curate, edit, or remove profiles that do not meet our community standards or contain demonstrably inaccurate information."
            ]
        },
        'Privacy Policy': {
            icon: <Shield className="w-6 h-6 text-secondary" />,
            title: "Privacy Policy",
            description: "Transparent data handling for an open developer community.",
            details: [
                "Transparency by Design: As an open community initiative, we operate with maximum transparency. Your professional profile is part of an open-access public repository.",
                "Data Purpose & Utility: We only process data that is essential for showcasing your professional journey—such as your name, bio, accomplishments, and social links.",
                "Community Sovereignty: You have full control over your information. Since the system is open, you can contribute, update, or remove your data through standard open workflows.",
                "Security & Integrity: We do not track users or sell data. We rely on the security of our hosting infrastructure and the shared integrity of our community-driven process."
            ]
        },
        'Upcoming Events': {
            icon: <HelpCircle className="w-6 h-6 text-secondary" />,
            title: "Upcoming Events",
            description: "Exciting community gatherings and tech events are on the horizon.",
            details: [
                "Coming Soon: We are currently curating a series of hackathons, workshops, and meetups for the Pampanga developer community.",
                "Community Meetups: Stay tuned for our first in-person gathering to network, share ideas, and build lasting connections.",
                "Hackathons & Competitions: Get ready to showcase your skills in upcoming challenges designed to spark innovation and problem-solving.",
                "Workshops & Seminars: Learn from industry experts and community leaders through our upcoming educational sessions and lightning talks."
            ]
        }
    }[type] || {};

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/10 blur-[100px]" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 blur-[100px]" />

                        <div className="flex justify-between items-start mb-8 relative">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shrink-0">
                                    {content.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{content.title}</h2>
                                    <p className="text-text-muted text-sm mt-1">{content.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-xl transition-colors shrink-0"
                            >
                                <X className="w-6 h-6 text-text-muted" />
                            </button>
                        </div>

                        <div className="space-y-4 relative">
                            {content.details?.map((detail, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex gap-4 items-start hover:border-white/10 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xs font-bold shrink-0 mt-0.5">
                                        {index + 1}
                                    </div>
                                    <p className="text-text-muted leading-relaxed italic text-sm">
                                        "{detail}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end relative">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-secondary text-background font-bold rounded-xl hover:scale-105 transition-transform"
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FooterModal;

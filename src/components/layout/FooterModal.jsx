import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, HelpCircle, Send } from 'lucide-react';

const FooterModal = ({ isOpen, onClose, type }) => {
    const content = {
        'Submit Achievement': {
            icon: <Send className="w-6 h-6 text-secondary" />,
            title: "Submit Your Achievement",
            description: "Ready to join the Hall of Fame? Follow these steps to submit your milestone.",
            details: [
                "Ensure your achievement falls under our recognized categories (Hackathons, Open Source, etc.).",
                "Prepare links to your proof of work (GitHub repo, Certificate, or Event page).",
                "Submit via our GitHub repository by opening a PR on developers.json.",
                "Or reach out to our community moderators on Discord for manual verification."
            ]
        },
        'Member FAQ': {
            icon: <HelpCircle className="w-6 h-6 text-secondary" />,
            title: "Frequently Asked Questions",
            description: "Find answers to the most common questions about the DevHirang platform.",
            details: [
                "How are points calculated? Points are based on Impact (Projects/Wins) and Trust (Certifications).",
                "How often do rankings update? Rankings update instantly upon data synchronization.",
                "Can I lose my Elite status? Yes, if other developers surpass your score, you may move to the Professional Division.",
                "Is the platform free? Absolutely. It is a community initiative for Pampanga's developers."
            ]
        },
        'Terms of Service': {
            icon: <FileText className="w-6 h-6 text-secondary" />,
            title: "Terms of Service",
            description: "Please read our community guidelines to ensure a fair and respectful platform.",
            details: [
                "All submitted achievements must be genuine and verifiable.",
                "Plagiarism or false claims will lead to a permanent ban from the leaderboard.",
                "DevHirang reserves the right to adjust scoring algorithms for fairness.",
                "Users remain owners of their data but grant public display rights on this platform."
            ]
        },
        'Privacy Policy': {
            icon: <Shield className="w-6 h-6 text-secondary" />,
            title: "Privacy Policy",
            description: "We value your privacy. Here is how we handle your developer data.",
            details: [
                "We only collect data you provide: name, bio, social links, and achievements.",
                "Data is stored in a public developers.json file to maintain transparency.",
                "We do not sell or share your personal data with third-party advertisers.",
                "You can request data removal at any time via a GitHub Pull Request."
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

import React, { useState } from 'react';
import { Trophy, Github, Linkedin, MessageSquare, Mail, Facebook } from 'lucide-react';
import FooterModal from './FooterModal';

const Footer = ({ setActiveTab }) => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '' });

    const openModal = (type) => setModalConfig({ isOpen: true, type });
    const closeModal = () => setModalConfig({ isOpen: false, type: '' });

    const handleNavigation = (tab, sectionId = null) => {
        setActiveTab(tab);
        if (sectionId) {
            // Small delay to ensure tab has switched if necessary
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="mt-20 border-t border-white/10 bg-white/[0.02] py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="p-2 bg-primary rounded-lg">
                                <Trophy className="w-6 h-6 text-secondary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Dev<span className="text-secondary">Hirang</span>
                            </span>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Celebrating the brilliance of Pampanga's developer community.
                            The ultimate hall of fame for tech innovators and leaders.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/darknecrocities/DevHirang" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61588212392192"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="mailto:devhirang@gmail.com" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all" title="Email Us">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-text-muted">
                            <li>
                                <button
                                    onClick={() => handleNavigation('Bale', 'achievements')}
                                    className="hover:text-secondary transition-colors text-left"
                                >
                                    Contributors
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('Hinirang')}
                                    className="hover:text-secondary transition-colors text-left"
                                >
                                    Hinirang Section
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => openModal('Upcoming Events')}
                                    className="hover:text-secondary transition-colors text-left"
                                >
                                    Upcoming Events
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavigation('Stories')}
                                    className="hover:text-secondary transition-colors text-left"
                                >
                                    Stories Section
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-secondary">Support</h4>
                        <ul className="space-y-4 text-sm text-text-muted">
                            {['Submit Achievement', 'Member FAQ', 'Terms of Service', 'Privacy Policy'].map(item => (
                                <li key={item}>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="hover:text-secondary transition-colors text-left"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Newsletter</h4>
                        <p className="text-sm text-text-muted mb-4">
                            Stay updated with the latest achievements and community news.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-secondary transition-colors"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-secondary text-background rounded-lg">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-text-muted">
                    <p>© 2025 DevHirang Pampanga. All rights reserved.</p>
                </div>
            </div>

            <FooterModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </footer>
    );
};

export default Footer;

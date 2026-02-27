import React from 'react';
import { Trophy, Github, Linkedin, MessageSquare, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-white/10 bg-white/[0.02] py-20">
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
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-secondary hover:text-background transition-all">
                                <MessageSquare className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-text-muted">
                            <li><a href="#" className="hover:text-secondary transition-colors">Hall of Fame</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Featured Talents</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Upcoming Events</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Community Leaderboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-text-muted">
                            <li><a href="#" className="hover:text-secondary transition-colors">Submit Achievement</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Member FAQ</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
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
        </footer>
    );
};

export default Footer;

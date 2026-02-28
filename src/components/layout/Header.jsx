import React from 'react';
import { Search, Github, Linkedin, Trophy, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ search, setSearch, activeTab, setActiveTab, developers, onSelect }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const tabs = ['Contributors', '100 Devs'];

    // Filter logic for dropdown
    const searchTerms = search?.toLowerCase().split(' ').filter(Boolean) || [];
    const searchResults = searchTerms.length > 0 ? developers.filter(dev => {
        return searchTerms.every(term => {
            return (
                dev.name.toLowerCase().includes(term) ||
                dev.role.join(' ').toLowerCase().includes(term) ||
                dev.bio.toLowerCase().includes(term) ||
                dev.achievements.some(a => a.title.toLowerCase().includes(term) || a.description.toLowerCase().includes(term))
            );
        });
    }).slice(0, 5) : []; // Limit to 5 results in dropdown

    return (
        <header className="sticky top-0 z-50 w-full glassmorphism border-b border-white/10 px-4 py-3">
            <div className="container mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="p-2 bg-primary rounded-lg glow-primary group-hover:scale-110 transition-transform">
                        <Trophy className="w-6 h-6 text-secondary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">
                        Dev<span className="text-secondary">Hirang</span>
                    </span>
                </div>

                <div className="flex-1 max-w-md relative hidden sm:block z-50">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search developers, roles, or achievements..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
                    />

                    {/* Search Results Dropdown */}
                    <AnimatePresence>
                        {searchTerms.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden glassmorphism"
                            >
                                {searchResults.length > 0 ? (
                                    <div className="max-h-[70vh] overflow-y-auto p-2">
                                        <p className="text-xs text-text-muted px-3 mt-2 mb-3 font-mono">Found {searchResults.length} developers</p>
                                        <div className="space-y-1">
                                            {searchResults.map(dev => (
                                                <button
                                                    key={dev.id}
                                                    onClick={() => {
                                                        onSelect(dev);
                                                        setSearch('');
                                                    }}
                                                    className="w-full text-left flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors group"
                                                >
                                                    <img src={dev.avatar} alt={dev.name} className="w-10 h-10 rounded-full object-cover border border-white/20 grayscale group-hover:grayscale-0 transition-all" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-white text-sm truncate">{dev.name}</p>
                                                        <p className="text-xs text-text-muted truncate font-mono">{dev.role.join(' • ')}</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors flex-shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-text-muted text-sm font-mono">
                                        No developers found matching "{search}"
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Desktop Tabs */}
                <div className="hidden lg:flex items-center gap-2 lg:mx-8">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-4 py-2 rounded-lg font-mono text-sm font-bold transition-all whitespace-nowrap",
                                activeTab === tab ? "bg-white text-black" : "text-text-muted hover:text-white hover:bg-white/5"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="https://forms.gle/iTD6v4WoUQdRRD1R9"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-block bg-white text-black hover:bg-gray-200 px-4 py-2 text-sm font-bold transition-all border border-transparent font-mono whitespace-nowrap text-center"
                    >
                        Submit Dev
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-4"
                    >
                        {/* Mobile Search */}
                        <div className="relative sm:hidden">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search developers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/50 transition-all font-mono"
                            />
                        </div>

                        {/* Mobile Nav Links */}
                        <div className="flex flex-col gap-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setIsMenuOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-xl font-mono text-sm font-bold transition-all",
                                        activeTab === tab ? "bg-white text-black" : "text-text-muted hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <a
                            href="https://forms.gle/iTD6v4WoUQdRRD1R9"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-4 bg-secondary text-background rounded-xl font-bold flex items-center justify-center gap-2 glow-secondary sm:hidden"
                        >
                            Submit Developer
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

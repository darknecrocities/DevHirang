import React from 'react';
import { Search, Github, Linkedin, Trophy, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Header = ({ search, setSearch, activeTab, setActiveTab }) => {
    const tabs = ['Home', 'Top Developers'];

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

                <div className="flex-1 max-w-md relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search developers or achievements..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all font-mono"
                    />
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 lg:mx-8">
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
                        className="bg-white text-black hover:bg-gray-200 px-4 py-2 text-sm font-bold transition-all border border-transparent font-mono whitespace-nowrap inline-block text-center"
                    >
                        Submit Dev
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;

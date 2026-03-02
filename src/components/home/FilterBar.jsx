import React from 'react';
import { cn } from '../../lib/utils';

const FilterBar = ({ activeFilter, setFilter }) => {
    const filters = ['All', 'Hackathon', 'Startup', 'Open Source', 'Community', 'Work', 'Intern'];

    return (
        <div className="flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 hide-scrollbar scroll-smooth">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setFilter(filter)}
                    className={cn(
                        "px-5 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap",
                        activeFilter === filter
                            ? "bg-secondary text-background border-secondary shadow-lg shadow-secondary/20"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    )}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;

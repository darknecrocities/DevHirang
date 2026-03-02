import React, { useState } from 'react';
import developersData from './data/developers.json';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import FeatureCarousel from './components/home/FeatureCarousel';
import FilterBar from './components/home/FilterBar';
import DevCard from './components/home/DevCard';
import DevDiaries from './components/home/DevDiaries';
import TopDevelopersList from './components/home/TopDevelopersList';
import Footer from './components/layout/Footer';
import ProfileModal from './components/home/ProfileModal';
import TestimonialCarousel from './components/home/TestimonialCarousel';
import AnalyticsSpotlight from './components/home/AnalyticsSpotlight';
import Stories from './components/home/Stories';
import SplashScreen from './components/layout/SplashScreen';
import { useEffect } from 'react';

function App() {
  const [developers, setDevelopers] = useState(developersData);
  const [activeTab, setActiveTab] = useState('Bale');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedDev, setSelectedDev] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDevs = developers.filter(dev => {
    const matchesFilter = filter === 'All' || dev.achievements.some(a =>
      a.type.toLowerCase().replace(/\s+/g, '') === filter.toLowerCase().replace(/\s+/g, '')
    );

    // Improved Advanced Search Algorithm
    const searchTerms = search.toLowerCase().split(' ').filter(Boolean);
    if (searchTerms.length === 0) return matchesFilter;

    const matchesSearch = searchTerms.every(term => {
      return (
        dev.name.toLowerCase().includes(term) ||
        dev.role.join(' ').toLowerCase().includes(term) ||
        dev.bio.toLowerCase().includes(term) ||
        dev.achievements.some(a => a.title.toLowerCase().includes(term) || a.description.toLowerCase().includes(term))
      );
    });

    return matchesFilter && matchesSearch;
  });

  const yearlyFeaturedDevs = developers.filter(dev => dev.featured === 'yearly' || dev.featured === true);
  const monthlyFeaturedDevs = developers.filter(dev => dev.featured === 'monthly');

  return (
    <div className="min-h-screen bg-background text-text-main">
      <SplashScreen isVisible={showSplash} />
      <Header
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        developers={developers}
        onSelect={setSelectedDev}
      />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {activeTab === 'Bale' ? (
          <>
            <Hero />

            <section className="text-center max-w-4xl mx-auto py-12 px-6 md:px-12 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">What is DevHirang?</h2>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed font-mono">
                DevHirang is a community-driven platform that brings together developers, innovators, and students across Pampanga and the Philippines. It's a space where ideas turn into real-world solutions, collaboration is encouraged, and growth is nurtured.
              </p>
            </section>

            <AnalyticsSpotlight developers={developers} />

            {yearlyFeaturedDevs.length > 0 && (
              <section id="yearly-featured" className="pt-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  <h2 className="text-4xl font-black text-center px-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gold tracking-tighter uppercase">
                    Yearly Hall of Fame
                  </h2>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>
                <FeatureCarousel developers={yearlyFeaturedDevs} onSelect={setSelectedDev} variant="yearly" />
              </section>
            )}

            {monthlyFeaturedDevs.length > 0 && (
              <section id="monthly-featured" className="pt-8">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <h2 className="text-4xl font-black text-center px-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 tracking-tighter uppercase">
                    Monthly Spotlights
                  </h2>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                </div>
                <FeatureCarousel developers={monthlyFeaturedDevs} onSelect={setSelectedDev} />
              </section>
            )}

            <TestimonialCarousel developers={developers} onSelect={setSelectedDev} />


            <section id="achievements">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-3xl font-bold">Contributors</h2>
                <FilterBar activeFilter={filter} setFilter={setFilter} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDevs.map(dev => (
                  <DevCard key={dev.id} developer={dev} onClick={() => setSelectedDev(dev)} />
                ))}
              </div>

              {filteredDevs.length === 0 && (
                <div className="text-center py-20 text-text-muted">
                  No developers found matching your criteria.
                </div>
              )}
            </section>

            <section id="diaries">
              <h2 className="text-3xl font-bold mb-8">Dev Diaries</h2>
              <DevDiaries developers={developers} />
            </section>
          </>
        ) : activeTab === 'Stories' ? (
          <Stories developers={developers} />
        ) : (
          <TopDevelopersList developers={developers} onSelect={setSelectedDev} />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />

      {selectedDev && (
        <ProfileModal
          developer={selectedDev}
          isOpen={!!selectedDev}
          onClose={() => setSelectedDev(null)}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
}

export default App;

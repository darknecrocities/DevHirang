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

  const featuredDevs = developers.filter(dev => dev.featured);

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

            <AnalyticsSpotlight developers={developers} />

            <section id="featured">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <span className="text-secondary">✦</span> Monthly Featured
              </h2>
              <FeatureCarousel developers={featuredDevs} onSelect={setSelectedDev} />
            </section>

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
        ) : (
          <TopDevelopersList developers={developers} onSelect={setSelectedDev} />
        )}
      </main>

      <Footer />

      {selectedDev && (
        <ProfileModal
          developer={selectedDev}
          isOpen={!!selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </div>
  );
}

export default App;

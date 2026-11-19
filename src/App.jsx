import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OsiModel from './components/OsiModel';
import TcpIpModel from './components/TcpIpModel';
import TopologyViewer from './components/TopologyViewer';
import ProtocolComparison from './components/ProtocolComparison';
import PortExplorer from './components/PortExplorer';
import IpAddressing from './components/IpAddressing';
import SubnetCalculator from './components/SubnetCalculator';
import InteractiveQuiz from './components/InteractiveQuiz';
import SlideMode from './components/SlideMode';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSlideMode, setIsSlideMode] = useState(false);

  const handleNavigate = (tabId) => {
    if (tabId === 'slides') {
      setIsSlideMode(true);
      setActiveTab('slides');
    } else {
      setActiveTab(tabId);
      setIsSlideMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isShowingSlides = isSlideMode || activeTab === 'slides';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavigate} 
        isSlideMode={isShowingSlides} 
        setIsSlideMode={(val) => {
          setIsSlideMode(val);
          if (val) setActiveTab('slides');
          else if (activeTab === 'slides') setActiveTab('overview');
        }} 
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isShowingSlides ? (
          <SlideMode onExit={() => {
            setIsSlideMode(false);
            setActiveTab('overview');
          }} />
        ) : (
          <div>
            {activeTab === 'overview' && (
              <>
                <Hero onNavigate={handleNavigate} />
                <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '3rem' }}>
                  <OsiModel />
                  <TcpIpModel />
                  <TopologyViewer />
                  <ProtocolComparison />
                  <PortExplorer />
                  <IpAddressing />
                  <SubnetCalculator />
                  <InteractiveQuiz />
                </div>
              </>
            )}

            {activeTab === 'layers' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <OsiModel />
                <TcpIpModel />
              </div>
            )}

            {activeTab === 'topology' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <TopologyViewer />
              </div>
            )}

            {activeTab === 'transport' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <ProtocolComparison />
              </div>
            )}

            {activeTab === 'ports' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <PortExplorer />
              </div>
            )}

            {activeTab === 'ip-addressing' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <IpAddressing />
              </div>
            )}

            {activeTab === 'subnet-calc' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <SubnetCalculator />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
                <InteractiveQuiz />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      {!isShowingSlides && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

import React from 'react';
import { 
  Network, 
  Layers, 
  Share2, 
  ArrowLeftRight, 
  Hash, 
  Globe, 
  Calculator, 
  HelpCircle, 
  Presentation,
  LayoutDashboard
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isSlideMode, setIsSlideMode }) {
  const navItems = [
    { id: 'slides', label: 'Presentasi (12 Slide)', icon: Presentation },
    { id: 'overview', label: 'Ringkasan Modul', icon: LayoutDashboard },
    { id: 'layers', label: 'OSI & TCP/IP', icon: Layers },
    { id: 'topology', label: 'Topologi', icon: Share2 },
    { id: 'transport', label: 'TCP vs UDP', icon: ArrowLeftRight },
    { id: 'ports', label: 'Port Explorer', icon: Hash },
    { id: 'ip-addressing', label: 'IP & MAC', icon: Globe },
    { id: 'subnet-calc', label: 'Kalkulator Subnet', icon: Calculator },
    { id: 'quiz', label: 'Kuis Jaringan', icon: HelpCircle },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(7, 24, 39, 0.94)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
        gap: '1rem',
      }}>
        {/* Brand matching TRAINING NETWORK RisTIE · 2026 */}
        <div 
          onClick={() => { setActiveTab('overview'); setIsSlideMode(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #15364d 0%, #1e556e 100%)',
            border: '1px solid var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px var(--glow-cyan)',
          }}>
            <Network size={22} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
                TRAINING NETWORK <span className="text-cyan">RisTIE</span> · 2026
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.2, letterSpacing: '0.05em' }}>
              DASAR JARINGAN KOMPUTER
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        {!isSlideMode && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            overflowX: 'auto',
            padding: '0.25rem 0',
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    background: isActive ? 'rgba(56, 198, 217, 0.15)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'transparent'}`,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <Icon size={15} color={isActive ? 'var(--accent-cyan)' : 'currentColor'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Action: Slide Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsSlideMode(!isSlideMode)}
            className={`btn btn-sm ${isSlideMode ? 'btn-accent' : 'btn-primary'}`}
            title={isSlideMode ? 'Kembali ke Tampilan Web' : 'Buka Mode Presentasi Slide'}
          >
            {isSlideMode ? (
              <>
                <LayoutDashboard size={16} />
                <span>Mode Web</span>
              </>
            ) : (
              <>
                <Presentation size={16} />
                <span>Mode Slide</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { 
  Layers, 
  Share2, 
  ArrowLeftRight, 
  Hash, 
  Calculator, 
  HelpCircle, 
  ShieldCheck, 
  Server,
  Zap,
  BookOpen,
  Presentation
} from 'lucide-react';

export default function Hero({ onNavigate }) {
  const stats = [
    { label: 'Presentasi Slide', value: '12 Slide', desc: 'Sesuai Modul Training RisTIE', icon: Presentation, tab: 'slides' },
    { label: 'OSI Model', value: '7 Layer', desc: 'Arsitektur komunikasi standar ISO', icon: Layers, tab: 'layers' },
    { label: 'TCP/IP Model', value: '4 Layer', desc: 'Standar de-facto internet global', icon: Server, tab: 'layers' },
    { label: 'Bentuk Topologi', value: '5 Topologi', desc: 'Bus, Star, Ring, Mesh, & Hybrid', icon: Share2, tab: 'topology' },
    { label: 'Protokol Transport', value: 'TCP vs UDP', desc: 'Perbandingan andal vs cepat', icon: ArrowLeftRight, tab: 'transport' },
    { label: 'Port Jaringan', value: '65.536', desc: 'Rentang port 0 hingga 65535', icon: Hash, tab: 'ports' }
  ];

  return (
    <section style={{ padding: '3rem 0 2rem' }}>
      <div className="container">
        {/* Banner Hero */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 40, 59, 0.9) 0%, rgba(11, 32, 49, 0.8) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1.25rem',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 198, 217, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-cyan">
                <Zap size={13} />
                MODUL DASAR JARINGAN 01
              </span>
              <span className="badge badge-mint">
                <ShieldCheck size={13} />
                UNIVERSITAS BRAWIJAYA
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Training RisTIE 2026
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              Pahami Fondasi <span className="text-cyan">Jaringan Komputer</span> Secara Visual & Interaktif
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Bagaimana data mengalir dari satu komputer ke komputer lain? Pelajari model berlapis OSI & TCP/IP, 
              eksplorasi topologi jaringan dengan diagram interaktif, bandingkan karakteristik TCP vs UDP, 
              telusuri direktori nomor port, serta gunakan kalkulator subnetting CIDR terintegrasi.
            </p>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => onNavigate('slides')}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.4rem', background: 'linear-gradient(135deg, #1d6677 0%, #154559 100%)', borderColor: 'var(--accent)' }}
              >
                <Presentation size={18} />
                <span>Buka Presentasi Interaktif (12 Slide)</span>
              </button>
              <button 
                onClick={() => onNavigate('layers')}
                className="btn"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <Layers size={18} />
                <span>Model OSI &amp; TCP/IP</span>
              </button>
              <button 
                onClick={() => onNavigate('subnet-calc')}
                className="btn"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <Calculator size={18} />
                <span>Kalkulator Subnet</span>
              </button>
              <button 
                onClick={() => onNavigate('quiz')}
                className="btn"
                style={{ padding: '0.75rem 1.25rem', borderColor: 'var(--accent-mint)', color: 'var(--accent-mint)' }}
              >
                <HelpCircle size={18} />
                <span>Uji Kuis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Grid Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i}
                onClick={() => onNavigate(stat.tab)}
                className="card-panel"
                style={{
                  padding: '1.15rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</span>
                  <Icon size={16} color="var(--accent-cyan)" />
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-mint)' }}>
                  {stat.value}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


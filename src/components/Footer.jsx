import React from 'react';
import { Network, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: '#05121e',
      padding: '3rem 0 2rem',
      marginTop: '4rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#15364d',
                border: '1px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Network size={18} color="var(--accent-cyan)" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', letterSpacing: '0.04em' }}>
                TRAINING NETWORK <span className="text-cyan">RisTIE</span> · 2026
              </span>
            </div>
            <p style={{ lineHeight: 1.6, color: '#8eaec2', margin: 0 }}>
              Modul dan presentasi interaktif Dasar Jaringan Komputer — Training Network RisTIE 2026, 
              Universitas Brawijaya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              Modul Pembelajaran
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button 
                onClick={() => onNavigate('layers')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Model OSI (7 Layer) & TCP/IP
              </button>
              <button 
                onClick={() => onNavigate('topology')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Topologi Jaringan Fisik
              </button>
              <button 
                onClick={() => onNavigate('transport')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Komparasi TCP vs UDP
              </button>
              <button 
                onClick={() => onNavigate('ports')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Direktori Nomor Port
              </button>
            </div>
          </div>

          {/* Tools & Interactive */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              Alat Interaktif
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button 
                onClick={() => onNavigate('subnet-calc')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-mint)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Kalkulator Subnetting & CIDR
              </button>
              <button 
                onClick={() => onNavigate('ip-addressing')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-mint)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Anatomi MAC vs IP Address
              </button>
              <button 
                onClick={() => onNavigate('quiz')} 
                style={{ background: 'none', border: 'none', color: '#8eaec2', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-mint)'}
                onMouseLeave={(e) => e.target.style.color = '#8eaec2'}
              >
                Uji Pemahaman (Kuis)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid #142838',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem'
        }}>
          <div>
            © 2026 RisTIE Data · Training Network. Dibuat dengan React & Vite.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>React 19</span>
            <span className="badge badge-mint" style={{ fontSize: '0.7rem' }}>Vite 6</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


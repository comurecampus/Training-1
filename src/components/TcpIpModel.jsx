import React, { useState } from 'react';
import { tcpIpLayers } from '../data/networkData';
import { ArrowRight, Server, Layers, ShieldCheck, Check } from 'lucide-react';

export default function TcpIpModel() {
  const [activeLayer, setActiveLayer] = useState(4);

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-mint">RFC 1122 & DoD Standard</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Arsitektur Internet Praktis</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Model Protokol <span className="text-mint">TCP/IP (4 Layers)</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          TCP/IP adalah tumpukan protokol nyata yang menggerakkan internet modern. Berbeda dengan model teoritis OSI 7 lapis, 
          TCP/IP menyederhanakan komunikasi menjadi 4 lapisan fungsional yang ramping.
        </p>
      </div>

      {/* Comparison Grid: TCP/IP Stack & Mapping */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* TCP/IP Layers Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            TUMPUKAN LAYER TCP/IP:
          </div>
          {tcpIpLayers.map((layer) => {
            const isSelected = activeLayer === layer.layer;
            return (
              <div
                key={layer.layer}
                onClick={() => setActiveLayer(layer.layer)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.85rem',
                  background: isSelected ? 'rgba(121, 224, 181, 0.14)' : 'var(--bg-card-alt)',
                  border: `1px solid ${isSelected ? 'var(--accent-mint)' : 'var(--border-subtle)'}`,
                  boxShadow: isSelected ? '0 0 15px rgba(121, 224, 181, 0.2)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: 'var(--accent-mint)',
                      color: '#071827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.8rem'
                    }}>
                      {layer.layer}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                      {layer.name}
                    </span>
                  </div>
                  <span className="badge" style={{
                    fontSize: '0.7rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--accent-mint)'
                  }}>
                    Setara OSI: {layer.osiEquivalent.split(',')[0]}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.4rem 0 0.8rem' }}>
                  {layer.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {layer.protocols.map((p, idx) => (
                    <span key={idx} className="mono" style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '0.35rem',
                      background: '#091c2b',
                      border: '1px solid #1f425c',
                      color: '#a5d8f0'
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Mapping to OSI Model */}
        <div style={{
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem',
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--accent-cyan)" />
            <span>Pemetaan TCP/IP vs Model OSI</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{
              background: '#0f293d',
              border: '1px solid #234c6b',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>TCP/IP Layer 4: Application</span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>3 Layer OSI</span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>
                Menggabungkan seluruh fungsi dari <b>L7 (Application)</b>, <b>L6 (Presentation)</b>, dan <b>L5 (Session)</b>. 
                Aplikasi langsung mengelola protokol, format data, dan enkripsinya sendiri.
              </p>
            </div>

            <div style={{
              background: '#0f293d',
              border: '1px solid #234c6b',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-mint)' }}>TCP/IP Layer 3: Transport</span>
                <span className="badge badge-mint" style={{ fontSize: '0.65rem' }}>1 Layer OSI</span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>
                Tepat sama dengan <b>L4 (Transport)</b> pada OSI. Menyediakan komunikasi end-to-end melalui TCP (terurut & andal) atau UDP (cepat tanpa garansi).
              </p>
            </div>

            <div style={{
              background: '#0f293d',
              border: '1px solid #234c6b',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-amber)' }}>TCP/IP Layer 2: Internet</span>
                <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>1 Layer OSI</span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>
                Setara dengan <b>L3 (Network)</b> pada OSI. Menangani routing paket dan skema pengalamatan logis (IPv4 & IPv6).
              </p>
            </div>

            <div style={{
              background: '#0f293d',
              border: '1px solid #234c6b',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: '#c084fc' }}>TCP/IP Layer 1: Network Access</span>
                <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>2 Layer OSI</span>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>
                Menggabungkan <b>L2 (Data Link)</b> dan <b>L1 (Physical)</b>. Mengelola pengalamatan fisik (MAC), transmisi kabel/serat/gelombang radio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


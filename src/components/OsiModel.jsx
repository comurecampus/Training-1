import React, { useState } from 'react';
import { osiLayers } from '../data/networkData';
import { 
  Layers, 
  Cpu, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  Lightbulb,
  Box
} from 'lucide-react';

export default function OsiModel() {
  const [selectedLayerNum, setSelectedLayerNum] = useState(7);
  const [simStep, setSimStep] = useState(0); // 0 = ready, 1-7 = encapsulating down, 8 = complete

  const currentLayer = osiLayers.find(l => l.number === selectedLayerNum) || osiLayers[0];

  const handleStartSimulation = () => {
    setSimStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step <= 7) {
        setSimStep(step);
        setSelectedLayerNum(8 - step);
      } else {
        setSimStep(8);
        clearInterval(interval);
      }
    }, 700);
  };

  const handleResetSimulation = () => {
    setSimStep(0);
    setSelectedLayerNum(7);
  };

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-cyan">ISO / IEC 7498-1</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>7 Lapisan Terstandarisasi</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
            Model Referensi <span className="text-cyan">OSI (7 Layers)</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', marginTop: '0.4rem' }}>
            Model OSI (Open Systems Interconnection) membagi alur komunikasi jaringan menjadi 7 lapisan terpisah 
            dari level pengguna (Application) hingga sinyal transmisi fisik (Physical).
          </p>
        </div>

        {/* Simulation Action Controls */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {simStep === 0 ? (
            <button 
              onClick={handleStartSimulation} 
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Send size={15} />
              <span>Simulasi Enkapsulasi</span>
            </button>
          ) : (
            <button 
              onClick={handleResetSimulation} 
              className="btn btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <RotateCcw size={15} />
              <span>Reset Simulasi</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulation Banner If Active */}
      {simStep > 0 && (
        <div style={{
          background: simStep === 8 ? 'rgba(121, 224, 181, 0.15)' : 'rgba(56, 198, 217, 0.12)',
          border: `1px solid ${simStep === 8 ? 'var(--accent-mint)' : 'var(--accent-cyan)'}`,
          borderRadius: '0.75rem',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Box size={20} color={simStep === 8 ? 'var(--accent-mint)' : 'var(--accent-cyan)'} />
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                {simStep === 8 ? '✅ Enkapsulasi Lengkap!' : `Enkapsulasi Berjalan: Lapisan L${8 - simStep}`}
              </span>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {simStep === 8 
                  ? 'Data telah berhasil diubah menjadi sinyal bit fisik (0 & 1) dan siap ditransmisikan melalui kabel/udara.' 
                  : `Header lapisan ditambahkan ke payload data: PDU saat ini adalah ${currentLayer.pdu}.`}
              </p>
            </div>
          </div>
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {simStep === 8 ? 'BITS TRANSMITTED' : `PROGRESS: ${Math.round((simStep / 7) * 100)}%`}
          </span>
        </div>
      )}

      {/* Grid: 7 Layers list (L7 to L1) on the left, Detailed Inspector on the right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Layer Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, paddingBottom: '0.25rem' }}>
            SUSUNAN LAPISAN (DARI ATAS KE BAWAH)
          </div>
          {osiLayers.map((layer) => {
            const isSelected = selectedLayerNum === layer.number;
            return (
              <div
                key={layer.number}
                onClick={() => setSelectedLayerNum(layer.number)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '0.75rem',
                  background: isSelected ? 'rgba(56, 198, 217, 0.16)' : 'var(--bg-card-alt)',
                  border: `1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                  boxShadow: isSelected ? '0 0 16px rgba(56, 198, 217, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? 'var(--accent-cyan)' : '#10283b',
                    color: isSelected ? '#071827' : 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    L{layer.number}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? '#ffffff' : 'var(--text-main)' }}>
                      {layer.name} Layer
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      PDU: <span className="mono" style={{ color: 'var(--accent-mint)' }}>{layer.pdu}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{
                    fontSize: '0.7rem',
                    background: isSelected ? 'rgba(56, 198, 217, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'
                  }}>
                    {layer.number >= 5 ? 'Software' : layer.number >= 3 ? 'Transport/Net' : 'Hardware'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector Panel */}
        <div style={{
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem',
          position: 'sticky',
          top: '90px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.8rem' }}>
              DETAIL LAPISAN {currentLayer.number}
            </span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-mint)' }}>
              PDU: {currentLayer.pdu}
            </span>
          </div>

          <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }}>
            {currentLayer.name} Layer
          </h3>

          <p style={{ color: '#d0e3ed', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            {currentLayer.description}
          </p>

          {/* Protocols List */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>
              PROTOKOL UMUM:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {currentLayer.protocols.map((proto, i) => (
                <span key={i} className="mono" style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: '0.4rem',
                  fontSize: '0.78rem',
                  background: '#0e293c',
                  border: '1px solid #234c68',
                  color: 'var(--accent-cyan)'
                }}>
                  {proto}
                </span>
              ))}
            </div>
          </div>

          {/* Hardware / Devices */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
              PERANGKAT / LEVEL IMPLEMENTASI:
            </div>
            <div style={{ fontSize: '0.88rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} color="var(--accent-amber)" />
              <span>{currentLayer.hardware}</span>
            </div>
          </div>

          {/* Real World Analogy */}
          <div style={{
            background: 'rgba(56, 198, 217, 0.08)',
            borderLeft: '3px solid var(--accent-cyan)',
            padding: '0.85rem 1rem',
            borderRadius: '0 0.5rem 0.5rem 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Lightbulb size={14} />
              <span>Analogi Sederhana:</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#e2f0f8', fontStyle: 'italic' }}>
              "{currentLayer.analogy}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


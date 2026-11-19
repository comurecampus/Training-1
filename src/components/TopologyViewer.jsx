import React, { useState } from 'react';
import { topologies } from '../data/networkData';
import { Share2, CheckCircle2, XCircle, Sparkles, Activity } from 'lucide-react';

export default function TopologyViewer() {
  const [selectedKey, setSelectedKey] = useState('bus');
  const [activeNode, setActiveNode] = useState(null);

  const currentTopo = topologies[selectedKey];

  // SVG Render Helper for Topologies
  const renderSvg = (type) => {
    if (type === 'bus') {
      const nodes = [
        { id: 1, x: 50, y: 45, label: 'PC 1' },
        { id: 2, x: 130, y: 45, label: 'PC 2' },
        { id: 3, x: 210, y: 45, label: 'PC 3' },
        { id: 4, x: 290, y: 45, label: 'PC 4' },
        { id: 5, x: 370, y: 45, label: 'PC 5' }
      ];
      return (
        <svg viewBox="0 0 430 180" style={{ width: '100%', height: 'auto', maxHeight: '280px' }}>
          {/* Backbone line */}
          <line x1="20" y1="120" x2="410" y2="120" stroke="#79e0b5" strokeWidth="4" />
          {/* Terminators */}
          <rect x="14" y="112" width="8" height="16" fill="#ffd27a" rx="2" />
          <rect x="408" y="112" width="8" height="16" fill="#ffd27a" rx="2" />
          <text x="215" y="155" fill="#8eaec2" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
            Kabel Backbone Utama (Coaxial / Ethernet) + Terminator
          </text>

          {/* Drops to nodes */}
          {nodes.map(n => (
            <g key={n.id}>
              <line 
                x1={n.x} 
                y1={n.y + 16} 
                x2={n.x} 
                y2="120" 
                stroke="#38c6d9" 
                strokeWidth="2" 
                strokeDasharray="4 3" 
              />
              <rect 
                x={n.x - 28} 
                y={n.y - 16} 
                width="56" 
                height="32" 
                rx="8" 
                fill={activeNode === n.id ? '#38c6d9' : '#15364d'} 
                stroke={activeNode === n.id ? '#ffffff' : '#31546a'} 
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveNode(n.id)}
              />
              <text 
                x={n.x} 
                y={n.y + 4} 
                fill={activeNode === n.id ? '#071827' : '#ffffff'} 
                fontSize="12" 
                fontWeight="700" 
                textAnchor="middle"
                fontFamily="sans-serif"
                pointerEvents="none"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      );
    }

    if (type === 'star') {
      const center = { x: 215, y: 95, label: 'SWITCH' };
      const nodes = [
        { id: 1, x: 215, y: 25, label: 'PC 1' },
        { id: 2, x: 345, y: 55, label: 'PC 2' },
        { id: 3, x: 310, y: 145, label: 'PC 3' },
        { id: 4, x: 120, y: 145, label: 'PC 4' },
        { id: 5, x: 85, y: 55, label: 'PC 5' }
      ];
      return (
        <svg viewBox="0 0 430 180" style={{ width: '100%', height: 'auto', maxHeight: '280px' }}>
          {/* Edges from center */}
          {nodes.map(n => (
            <line 
              key={`line-${n.id}`} 
              x1={center.x} 
              y1={center.y} 
              x2={n.x} 
              y2={n.y} 
              stroke="#38c6d9" 
              strokeWidth="2.5" 
            />
          ))}

          {/* Center switch */}
          <rect 
            x={center.x - 38} 
            y={center.y - 18} 
            width="76" 
            height="36" 
            rx="8" 
            fill="#ffd27a" 
            stroke="#ffffff" 
            strokeWidth="2" 
          />
          <text 
            x={center.x} 
            y={center.y + 5} 
            fill="#071827" 
            fontSize="12" 
            fontWeight="800" 
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {center.label}
          </text>

          {/* Surrounding nodes */}
          {nodes.map(n => (
            <g key={n.id}>
              <rect 
                x={n.x - 26} 
                y={n.y - 14} 
                width="52" 
                height="28" 
                rx="6" 
                fill={activeNode === n.id ? '#79e0b5' : '#15364d'} 
                stroke={activeNode === n.id ? '#ffffff' : '#31546a'} 
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveNode(n.id)}
              />
              <text 
                x={n.x} 
                y={n.y + 4} 
                fill={activeNode === n.id ? '#071827' : '#ffffff'} 
                fontSize="11" 
                fontWeight="700" 
                textAnchor="middle"
                fontFamily="sans-serif"
                pointerEvents="none"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      );
    }

    if (type === 'ring') {
      const nodes = [
        { id: 1, x: 215, y: 25, label: 'Node 1' },
        { id: 2, x: 345, y: 65, label: 'Node 2' },
        { id: 3, x: 300, y: 145, label: 'Node 3' },
        { id: 4, x: 130, y: 145, label: 'Node 4' },
        { id: 5, x: 85, y: 65, label: 'Node 5' }
      ];
      return (
        <svg viewBox="0 0 430 180" style={{ width: '100%', height: 'auto', maxHeight: '280px' }}>
          {/* Ring polygon */}
          <polygon 
            points={nodes.map(n => `${n.x},${n.y}`).join(' ')} 
            fill="none" 
            stroke="#79e0b5" 
            strokeWidth="3" 
            strokeDasharray="6 4"
          />
          {nodes.map(n => (
            <g key={n.id}>
              <rect 
                x={n.x - 28} 
                y={n.y - 15} 
                width="56" 
                height="30" 
                rx="6" 
                fill={activeNode === n.id ? '#38c6d9' : '#15364d'} 
                stroke={activeNode === n.id ? '#ffffff' : '#31546a'} 
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveNode(n.id)}
              />
              <text 
                x={n.x} 
                y={n.y + 4} 
                fill={activeNode === n.id ? '#071827' : '#ffffff'} 
                fontSize="11" 
                fontWeight="700" 
                textAnchor="middle"
                fontFamily="sans-serif"
                pointerEvents="none"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      );
    }

    if (type === 'mesh') {
      const nodes = [
        { id: 1, x: 215, y: 25, label: 'Node A' },
        { id: 2, x: 345, y: 65, label: 'Node B' },
        { id: 3, x: 300, y: 145, label: 'Node C' },
        { id: 4, x: 130, y: 145, label: 'Node D' },
        { id: 5, x: 85, y: 65, label: 'Node E' }
      ];
      // Full mesh edges: all pairs
      const edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          edges.push([nodes[i], nodes[j]]);
        }
      }
      return (
        <svg viewBox="0 0 430 180" style={{ width: '100%', height: 'auto', maxHeight: '280px' }}>
          {edges.map(([a, b], idx) => (
            <line 
              key={idx} 
              x1={a.x} 
              y1={a.y} 
              x2={b.x} 
              y2={b.y} 
              stroke="#31546a" 
              strokeWidth="1.5" 
            />
          ))}
          {nodes.map(n => (
            <g key={n.id}>
              <rect 
                x={n.x - 28} 
                y={n.y - 15} 
                width="56" 
                height="30" 
                rx="6" 
                fill={activeNode === n.id ? '#ffd27a' : '#15364d'} 
                stroke={activeNode === n.id ? '#071827' : '#38c6d9'} 
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveNode(n.id)}
              />
              <text 
                x={n.x} 
                y={n.y + 4} 
                fill={activeNode === n.id ? '#071827' : '#ffffff'} 
                fontSize="11" 
                fontWeight="700" 
                textAnchor="middle"
                fontFamily="sans-serif"
                pointerEvents="none"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      );
    }

    // Hybrid
    return (
      <svg viewBox="0 0 430 180" style={{ width: '100%', height: 'auto', maxHeight: '280px' }}>
        {/* Star 1 */}
        <line x1="100" y1="90" x2="60" y2="40" stroke="#38c6d9" strokeWidth="2" />
        <line x1="100" y1="90" x2="60" y2="140" stroke="#38c6d9" strokeWidth="2" />
        {/* Star 2 */}
        <line x1="330" y1="90" x2="370" y2="40" stroke="#38c6d9" strokeWidth="2" />
        <line x1="330" y1="90" x2="370" y2="140" stroke="#38c6d9" strokeWidth="2" />
        {/* Trunk connect */}
        <line x1="100" y1="90" x2="330" y2="90" stroke="#79e0b5" strokeWidth="3.5" />

        {/* Nodes */}
        <rect x="75" y="75" width="50" height="30" rx="6" fill="#ffd27a" stroke="#fff" strokeWidth="1.5" />
        <text x="100" y="94" fill="#071827" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SW 1</text>

        <rect x="305" y="75" width="50" height="30" rx="6" fill="#ffd27a" stroke="#fff" strokeWidth="1.5" />
        <text x="330" y="94" fill="#071827" fontSize="10" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">SW 2</text>

        {/* Clients */}
        <rect x="35" y="25" width="45" height="24" rx="4" fill="#15364d" stroke="#38c6d9" strokeWidth="1.5" />
        <text x="57" y="41" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PC 1</text>

        <rect x="35" y="125" width="45" height="24" rx="4" fill="#15364d" stroke="#38c6d9" strokeWidth="1.5" />
        <text x="57" y="141" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PC 2</text>

        <rect x="350" y="25" width="45" height="24" rx="4" fill="#15364d" stroke="#38c6d9" strokeWidth="1.5" />
        <text x="372" y="41" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PC 3</text>

        <rect x="350" y="125" width="45" height="24" rx="4" fill="#15364d" stroke="#38c6d9" strokeWidth="1.5" />
        <text x="372" y="141" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PC 4</text>
      </svg>
    );
  };

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-amber">Arsitektur Fisik & Logis</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Desain Susunan Jaringan</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Eksplorasi <span className="text-amber">Topologi Jaringan</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Topologi menentukan pola interkoneksi perangkat, keandalan, redundansi kabel, serta kemudahan pemeliharaan jaringan.
        </p>
      </div>

      {/* Tabs / Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {Object.keys(topologies).map((key) => {
          const t = topologies[key];
          const isSelected = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => { setSelectedKey(key); setActiveNode(null); }}
              className={`btn btn-sm ${isSelected ? 'btn-primary' : ''}`}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #1f7b88 0%, #155569 100%)' : 'var(--bg-card-alt)',
                borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)',
              }}
            >
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid: Visual Canvas & Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {/* Canvas SVG Box */}
        <div style={{
          background: '#071a2a',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '320px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
              DIAGRAM INTERAKTIF
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Klik node untuk memilih
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            {renderSvg(currentTopo.diagram)}
          </div>

          {activeNode && (
            <div style={{
              background: 'rgba(56, 198, 217, 0.1)',
              border: '1px solid rgba(56, 198, 217, 0.3)',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              marginTop: '0.75rem',
              textAlign: 'center'
            }}>
              Node {activeNode} terpilih — status koneksi aktif pada topologi {currentTopo.name}.
            </div>
          )}
        </div>

        {/* Info Card */}
        <div style={{
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-amber">{currentTopo.kicker}</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>
              {currentTopo.name}
            </h3>

            <p style={{ color: '#d0e3ed', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {currentTopo.summary}
            </p>

            {/* Pros and Cons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#0e2b3f', padding: '0.85rem', borderRadius: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-mint)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  <CheckCircle2 size={15} />
                  <span>Kelebihan:</span>
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#cadde8', margin: 0 }}>
                  {currentTopo.pros.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '0.2rem' }}>{p}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: '#0e2b3f', padding: '0.85rem', borderRadius: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  <XCircle size={15} />
                  <span>Kekurangan:</span>
                </div>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: '#cadde8', margin: 0 }}>
                  {currentTopo.cons.map((c, idx) => (
                    <li key={idx} style={{ marginBottom: '0.2rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Use Case */}
          <div style={{
            background: 'rgba(255, 210, 122, 0.08)',
            borderLeft: '3px solid var(--accent-amber)',
            padding: '0.75rem 1rem',
            borderRadius: '0 0.5rem 0.5rem 0',
            fontSize: '0.82rem',
            color: '#fbe7bf'
          }}>
            <b>Contoh Penggunaan:</b> {currentTopo.useCase}
          </div>
        </div>
      </div>
    </div>
  );
}


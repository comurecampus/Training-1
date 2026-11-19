import React, { useState } from 'react';
import { protocolComparison } from '../data/networkData';
import { ArrowLeftRight, Check, Zap, ShieldCheck, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ProtocolComparison() {
  const [selectedProto, setSelectedProto] = useState('tcp');
  const [simState, setSimState] = useState({ active: false, proto: null, log: [] });

  const runSimulation = (proto) => {
    setSimState({ active: true, proto, log: ['Memulai inisialisasi koneksi...'] });

    if (proto === 'tcp') {
      const steps = [
        '[KLIEN -> SERVER] 1. SYN (Synchronize: request koneksi)',
        '[SERVER -> KLIEN] 2. SYN-ACK (Acknowledge & Sync diterima)',
        '[KLIEN -> SERVER] 3. ACK (Koneksi terbentuk - 3-Way Handshake selesai)',
        '[KLIEN -> SERVER] 4. DATA SEGMEN #1 (Seq=100, Ack=1)',
        '[SERVER -> KLIEN] 5. ACK #1 (Segmen diterima dengan utuh)',
        '[KLIEN -> SERVER] 6. DATA SEGMEN #2 (Seq=200, Ack=1)',
        '[SERVER -> KLIEN] 7. ACK #2 (Semua data terurut & terverifikasi sempurna ✅)'
      ];
      steps.forEach((step, idx) => {
        setTimeout(() => {
          setSimState(prev => ({
            ...prev,
            log: [...prev.log, step]
          }));
        }, (idx + 1) * 600);
      });
    } else {
      const steps = [
        '[KLIEN -> SERVER] Datagram #1 langsung dikirim (Tanpa Handshake)',
        '[KLIEN -> SERVER] Datagram #2 langsung dikirim',
        '[KLIEN -> SERVER] Datagram #3 langsung dikirim (Kecepatan maksimal ⚡)',
        '[JARINGAN] ⚠️ Datagram #2 mengalami packet loss (dibuang tanpa retransmit)',
        '[SERVER] Menerima Datagram #1 dan #3 tanpa menunggu konfirmasi (Selesai)'
      ];
      steps.forEach((step, idx) => {
        setTimeout(() => {
          setSimState(prev => ({
            ...prev,
            log: [...prev.log, step]
          }));
        }, (idx + 1) * 500);
      });
    }
  };

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-cyan">Layer 4 · Transport</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mekanisme Pengiriman Data</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Komparasi Protokol: <span className="text-cyan">TCP</span> vs <span className="text-mint">UDP</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Dua protokol utama pada lapisan transport dengan filosofi yang berlawanan: 
          keandalan dengan verifikasi (TCP) atau kecepatan dengan latensi serendah mungkin (UDP).
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setSelectedProto('tcp')}
          className={`btn ${selectedProto === 'tcp' ? 'btn-primary' : ''}`}
          style={{ flex: 1, padding: '0.75rem' }}
        >
          <ShieldCheck size={18} />
          <span>TCP (Transmission Control Protocol)</span>
        </button>
        <button
          onClick={() => setSelectedProto('udp')}
          className={`btn ${selectedProto === 'udp' ? 'btn-accent' : ''}`}
          style={{ flex: 1, padding: '0.75rem' }}
        >
          <Zap size={18} />
          <span>UDP (User Datagram Protocol)</span>
        </button>
      </div>

      {/* Interactive Simulation Arena */}
      <div style={{
        background: '#071827',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
              Simulasi Aliran Transmisi Paket
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Lihat perbedaan nyata proses handshake, verifikasi acknowledgment, dan penanganan packet loss.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => runSimulation('tcp')} 
              className="btn btn-primary btn-sm"
            >
              <Play size={14} />
              <span>Simulasi TCP (Andal)</span>
            </button>
            <button 
              onClick={() => runSimulation('udp')} 
              className="btn btn-accent btn-sm"
            >
              <Play size={14} />
              <span>Simulasi UDP (Cepat)</span>
            </button>
            {simState.active && (
              <button 
                onClick={() => setSimState({ active: false, proto: null, log: [] })} 
                className="btn btn-sm"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Terminal log output */}
        <div style={{
          background: '#040d16',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          minHeight: '130px',
          maxHeight: '220px',
          overflowY: 'auto',
          border: '1px solid #142e42'
        }}>
          {simState.log.length === 0 ? (
            <span style={{ color: '#4a6b82' }}>
              &gt; Klik tombol di atas untuk menjalankan simulasi transmisi TCP atau UDP...
            </span>
          ) : (
            simState.log.map((line, idx) => (
              <div key={idx} style={{ 
                color: line.includes('⚠️') ? 'var(--accent-amber)' : line.includes('✅') ? 'var(--accent-mint)' : '#a5cbe0',
                marginBottom: '0.3rem',
                lineHeight: 1.4
              }}>
                &gt; {line}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#0e2b40', borderBottom: '2px solid #234c6b' }}>
              <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>Parameter</th>
              <th style={{ padding: '0.85rem 1rem', color: 'var(--accent-cyan)' }}>TCP</th>
              <th style={{ padding: '0.85rem 1rem', color: 'var(--accent-mint)' }}>UDP</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #1b3d56' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Tipe Koneksi</td>
              <td style={{ padding: '0.8rem 1rem' }}>Connection-oriented (3-way handshake)</td>
              <td style={{ padding: '0.8rem 1rem' }}>Connectionless (tanpa handshake)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1b3d56', background: 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Keandalan (Reliability)</td>
              <td style={{ padding: '0.8rem 1rem', color: 'var(--accent-mint)' }}>Dijamin sampai (ACK & Retransmission)</td>
              <td style={{ padding: '0.8rem 1rem', color: 'var(--accent-rose)' }}>Best-effort (Bisa hilang/hilang tanpa tahu)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1b3d56' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Urutan Paket (Ordering)</td>
              <td style={{ padding: '0.8rem 1rem' }}>Pasti terurut (diurutkan ulang via Sequence #)</td>
              <td style={{ padding: '0.8rem 1rem' }}>Tidak terurut (tiba sesuai rute)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1b3d56', background: 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Kecepatan & Overhead</td>
              <td style={{ padding: '0.8rem 1rem' }}>Lebih lambat karena verifikasi (Header 20–60 byte)</td>
              <td style={{ padding: '0.8rem 1rem', color: 'var(--accent-mint)' }}>Sangat cepat & ringan (Header tetap 8 byte)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1b3d56' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Flow & Congestion Control</td>
              <td style={{ padding: '0.8rem 1rem' }}>Ya (Sliding Window & Congestion Window)</td>
              <td style={{ padding: '0.8rem 1rem' }}>Tidak ada mekanisme penyesuaian aliran</td>
            </tr>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <td style={{ padding: '0.8rem 1rem', fontWeight: 600 }}>Contoh Penggunaan Utama</td>
              <td style={{ padding: '0.8rem 1rem' }}>Web (HTTP/S), Email (SMTP/IMAP), File (FTP), SSH</td>
              <td style={{ padding: '0.8rem 1rem' }}>Streaming Video/Audio, Gaming Online, DNS, VoIP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


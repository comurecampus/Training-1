import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  List, 
  X,
  LayoutDashboard
} from 'lucide-react';

const osiData = [
  { name: 'Physical', desc: 'Mengatur transmisi data melalui media fisik, seperti kabel dan serat optik.' },
  { name: 'Data Link', desc: 'Menangani pengiriman data antara dua node yang terhubung secara fisik, misalnya melalui switch atau bridge.' },
  { name: 'Network', desc: 'Bertanggung jawab untuk routing data melalui jaringan, misalnya menggunakan alamat IP.' },
  { name: 'Transport', desc: 'Menyiapkan dan mengelola koneksi end-to-end antara aplikasi serta membantu memastikan data sampai dengan benar.' },
  { name: 'Session', desc: 'Mengatur dan memelihara sesi komunikasi antara aplikasi, misalnya login dan logout.' },
  { name: 'Presentation', desc: 'Menangani format dan enkripsi data yang akan ditransmisikan.' },
  { name: 'Application', desc: 'Lapisan yang berinteraksi langsung dengan aplikasi dan pengguna, misalnya HTTP, FTP, dan SMTP.' }
];

const topoData = {
  Bus: {
    name: 'Bus',
    desc: 'Semua perangkat tersambung pada satu jalur komunikasi utama.',
    type: 'bus'
  },
  Star: {
    name: 'Star',
    desc: 'Setiap perangkat terhubung ke satu titik pusat, seperti hub atau switch.',
    type: 'star'
  },
  Ring: {
    name: 'Ring',
    desc: 'Perangkat membentuk jalur melingkar; tiap perangkat terhubung dengan perangkat di sebelahnya.',
    type: 'ring'
  },
  Mesh: {
    name: 'Mesh',
    desc: 'Perangkat memiliki banyak jalur koneksi langsung satu sama lain.',
    type: 'mesh'
  },
  Hybrid: {
    name: 'Hybrid',
    desc: 'Menggabungkan dua atau lebih bentuk topologi dalam satu jaringan.',
    type: 'hybrid'
  }
};

const protoContent = {
  tcp: {
    name: 'TCP',
    title: 'Transmission Control Protocol',
    metric: 'Andal & terurut',
    desc: 'Dirancang untuk memastikan data dikirim secara andal dan terurut. Dalam materi sumber, TCP disebut relatif lebih lambat.',
    tags: ['Pengiriman data', 'Keandalan'],
    characTitle: 'Pengelolaan pengiriman',
    characDesc: 'Materi menjelaskan TCP sebagai protokol untuk pengiriman data yang andal dan terorganisir, termasuk konfirmasi penerimaan paket.',
    note: 'Cocok ketika ketepatan dan urutan data menjadi prioritas.'
  },
  udp: {
    name: 'UDP',
    title: 'User Datagram Protocol',
    metric: 'Ringkas & cepat',
    desc: 'Berorientasi pada datagram: setiap pesan dikirim sebagai unit terpisah tanpa bergantung pada pesan sebelumnya atau sesudahnya.',
    tags: ['Streaming video', 'Kecepatan'],
    characTitle: 'Tanpa jaminan pengiriman',
    characDesc: 'Materi menyebut UDP relatif lebih cepat, tetapi dapat mengalami packet loss.',
    note: 'Dipakai pada contoh streaming video dalam materi sumber; pertimbangannya adalah kecepatan dan toleransi terhadap kehilangan paket.'
  }
};

const portTableData = [
  { port: 20, service: 'FTP-DATA', proto: 'TCP', desc: 'Transfer data' },
  { port: 21, service: 'FTP', proto: 'TCP', desc: 'Kontrol transfer file' },
  { port: 22, service: 'SSH', proto: 'TCP', desc: 'Secure Shell' },
  { port: 23, service: 'Telnet', proto: 'TCP', desc: 'Akses Telnet' },
  { port: 25, service: 'SMTP', proto: 'TCP', desc: 'Simple Mail Transfer Protocol' },
  { port: 53, service: 'DNS', proto: 'TCP / UDP', desc: 'Domain Name System' },
  { port: 69, service: 'TFTP', proto: 'UDP', desc: 'Trivial File Transfer Protocol' },
  { port: 80, service: 'HTTP', proto: 'TCP', desc: 'Hypertext Transfer Protocol' },
  { port: 110, service: 'POP3', proto: 'TCP', desc: 'Post Office Protocol 3' },
  { port: 123, service: 'NTP', proto: 'UDP', desc: 'Network Time Protocol' },
  { port: 143, service: 'IMAP', proto: 'TCP', desc: 'Internet Message Access Protocol' },
  { port: 443, service: 'HTTPS', proto: 'TCP', desc: 'Secure HTTP' },
];

const slideTitles = [
  '01 · Pengantar: Dasar Jaringan Komputer',
  '02 · Protokol Jaringan: Mengapa Perlu Protokol?',
  '03 · Model OSI: 7 Lapisan',
  '04 · Model TCP/IP: 4 Lapisan',
  '05 · Topologi Jaringan: Bagaimana Perangkat Disusun?',
  '06 · Jenis Topologi: Lima Bentuk Topologi',
  '07 · Protokol Transport: TCP atau UDP?',
  '08 · Port: Pintu Menuju Layanan',
  '09 · Port Umum: Daftar Port yang Sering Ditemui',
  '10 · Network Address: MAC Address vs IP Address',
  '11 · Pengalamatan IPv4: Dari Kelas Alamat ke CIDR',
  '12 · Penutup: Menyatukan Konsep'
];

export default function SlideMode({ onExit }) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverviewModal, setShowOverviewModal] = useState(false);

  // Sub-states
  const [activeOsiIndex, setActiveOsiIndex] = useState(0);
  const [activeTopoKey, setActiveTopoKey] = useState('Bus');
  const [activeProto, setActiveProto] = useState('tcp');

  const total = 12;

  const show = (idx) => {
    setCurrent(Math.max(0, Math.min(total - 1, idx)));
  };

  // Keyboard navigation matching presentasi_interaktif_dasar_jaringan.html
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showOverviewModal) {
        if (e.key === 'Escape') setShowOverviewModal(false);
        return;
      }
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        show(current + 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === 'Home') {
        show(0);
      } else if (e.key === 'End') {
        show(total - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, showOverviewModal]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // SVG Generator for Topologies matching HTML exactly
  const renderTopoSvg = (type) => {
    let pts = [];
    let edges = [];
    let extra = null;

    if (type === 'bus') {
      pts = [[45, 42], [125, 42], [205, 42], [285, 42], [365, 42]];
      extra = (
        <>
          <line className="edge" stroke="#79e0b5" strokeWidth="3.5" x1="20" y1="108" x2="390" y2="108" />
          {pts.map((p, i) => (
            <line key={i} className="edge" strokeDasharray="3 3" x1={p[0]} y1={p[1] + 14} x2={p[0]} y2="108" />
          ))}
          <rect x="15" y="102" width="6" height="12" fill="#ffd27a" rx="1" />
          <rect x="389" y="102" width="6" height="12" fill="#ffd27a" rx="1" />
          <text x="205" y="138" fill="#9dc4d5" fontSize="11" textAnchor="middle">
            Kabel Backbone Utama &amp; Terminator
          </text>
        </>
      );
    } else if (type === 'star') {
      pts = [[205, 22], [330, 65], [280, 140], [130, 140], [80, 65], [205, 82]];
      edges = [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4]];
    } else if (type === 'ring') {
      pts = [[205, 20], [340, 65], [290, 140], [120, 140], [70, 65]];
      edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
    } else if (type === 'mesh') {
      pts = [[205, 20], [340, 65], [290, 140], [120, 140], [70, 65]];
      for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
          edges.push([i, j]);
        }
      }
    } else { // hybrid
      pts = [[95, 35], [95, 115], [205, 75], [315, 35], [315, 115]];
      edges = [[0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4]];
    }

    return (
      <svg viewBox="0 0 410 170" role="img" aria-label={`Diagram topologi ${type}`}>
        {extra}
        {edges.map(([a, b], idx) => (
          <line 
            key={idx} 
            className="edge" 
            x1={pts[a][0]} 
            y1={pts[a][1]} 
            x2={pts[b][0]} 
            y2={pts[b][1]} 
          />
        ))}
        {pts.map((p, i) => (
          <g key={i}>
            <rect 
              className="node" 
              x={p[0] - 25} 
              y={p[1] - 14} 
              width="50" 
              height="28" 
              rx="6" 
            />
            <text className="nodeText" x={p[0]} y={p[1] + 4} textAnchor="middle">
              {i === 5 && type === 'star' ? 'SW' : `PC ${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      background: 'radial-gradient(ellipse at 80% 10%, #12334a 0, transparent 45%), var(--bg)',
      color: 'var(--ink)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Top Header matching HTML */}
      <header style={{
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderBottom: '1px solid #23445a',
        backgroundColor: '#071827dd',
        flexShrink: 0
      }}>
        <div style={{ fontWeight: 750, letterSpacing: '.04em', fontSize: '13px' }}>
          TRAINING NETWORK <span style={{ color: 'var(--accent)' }}>RisTIE</span> · 2026
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '12px' }}>
          <span className="hide-mobile" style={{ fontWeight: 600, letterSpacing: '0.04em' }}>
            DASAR JARINGAN KOMPUTER
          </span>
          <button
            onClick={toggleFullscreen}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              background: '#15344a',
              color: 'var(--ink)',
              cursor: 'pointer'
            }}
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
          {onExit && (
            <button
              onClick={onExit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid var(--accent)',
                background: '#133e54',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 600
              }}
              title="Kembali ke Mode Web"
            >
              <LayoutDashboard size={14} />
              <span>Mode Web</span>
            </button>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      <div style={{ height: '3px', background: '#1b3445', flexShrink: 0 }}>
        <div style={{
          height: '100%',
          width: `${((current + 1) / total) * 100}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          transition: 'width 0.25s ease'
        }} />
      </div>

      {/* Main Slide Stage */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <div 
          key={current}
          className="slide-appear"
          style={{
            width: 'min(1120px, 100%)',
            height: 'min(690px, 100%)',
            overflowY: 'auto',
            padding: 'clamp(22px, 4vw, 54px)',
            border: '1px solid #294b61',
            borderRadius: '22px',
            background: 'linear-gradient(145deg, #10283b 0%, #0b2031 70%)',
            boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}
        >
          {/* SLIDE 1: PENGANTAR */}
          {current === 0 && (
            <div>
              <div className="kicker">01 · Pengantar</div>
              <h1 className="slide-title-1">
                Dasar Jaringan<br />
                <span className="accent">Komputer</span>
              </h1>
              <p className="lead">
                Bagaimana perangkat saling terhubung, bertukar data, dan menemukan layanan di dalam sebuah jaringan?
              </p>
              <div className="grid three">
                <div className="card">
                  <div className="metric">01</div>
                  <h3>Protokol</h3>
                  <p>Aturan komunikasi antarperangkat.</p>
                </div>
                <div className="card">
                  <div className="metric">02</div>
                  <h3>Topologi</h3>
                  <p>Susunan hubungan antarperangkat.</p>
                </div>
                <div className="card">
                  <div className="metric">03</div>
                  <h3>Alamat &amp; Port</h3>
                  <p>Identitas perangkat dan layanan.</p>
                </div>
              </div>
              <div className="callout">
                Jaringan komputer adalah kumpulan perangkat yang saling terhubung dan dapat berinteraksi, misalnya dengan mengirim atau menerima data.
              </div>
              <div className="footer-note">Dari Modul Training</div>
            </div>
          )}

          {/* SLIDE 2: PROTOKOL JARINGAN */}
          {current === 1 && (
            <div>
              <div className="kicker">02 · Protokol jaringan</div>
              <h2 className="slide-title-2">
                Mengapa perlu <span className="accent">protokol?</span>
              </h2>
              <p>
                Protokol adalah aturan atau prosedur yang mengatur bagaimana data dikirim dan diterima. Tanpa aturan bersama, perangkat atau layanan yang berbeda akan sulit berkomunikasi.
              </p>
              <div className="grid">
                <div className="card">
                  <h3>Masalah yang ingin diatasi</h3>
                  <p>Sebelum adanya standar yang disepakati, layanan dapat memakai protokolnya masing-masing sehingga hubungan antarjaringan menjadi sulit.</p>
                </div>
                <div className="card">
                  <h3>Standarisasi</h3>
                  <p>Model OSI dikembangkan oleh ISO untuk menyediakan kerangka komunikasi yang dapat dipahami lintas sistem.</p>
                </div>
              </div>
              <div className="callout">
                Dua model yang akan kita gunakan untuk memahami komunikasi jaringan: <b>OSI (7 lapisan)</b> dan <b>TCP/IP (4 lapisan)</b>.
              </div>
            </div>
          )}

          {/* SLIDE 3: MODEL OSI */}
          {current === 2 && (
            <div>
              <div className="kicker">03 · Model OSI</div>
              <h2 className="slide-title-2">
                Model OSI: <span className="accent">7 lapisan</span>
              </h2>
              <p>
                Pilih lapisan untuk melihat fungsi ringkasnya. Susunan ditampilkan dari lapisan terbawah ke lapisan teratas.
              </p>
              <div className="layer-layout">
                <div className="layers">
                  {osiData.map((layer, idx) => (
                    <button
                      key={idx}
                      className={`layer ${activeOsiIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveOsiIndex(idx)}
                    >
                      <span>{idx + 1}. {layer.name}</span>
                      <span className="number">L{idx + 1}</span>
                    </button>
                  ))}
                </div>
                <div className="card layer-detail">
                  <div className="number">LAPISAN {activeOsiIndex + 1}</div>
                  <h3>{osiData[activeOsiIndex].name} Layer</h3>
                  <p>{osiData[activeOsiIndex].desc}</p>
                </div>
              </div>
              <div className="small" style={{ marginTop: '16px' }}>
                Berdasarkan Modul Training.
              </div>
            </div>
          )}

          {/* SLIDE 4: MODEL TCP/IP */}
          {current === 3 && (
            <div>
              <div className="kicker">04 · Model TCP/IP</div>
              <h2 className="slide-title-2">
                Model TCP/IP: <span className="accent">4 lapisan</span>
              </h2>
              <p>
                TCP/IP merupakan standar komunikasi data. TCP membantu pengiriman yang andal dan terorganisir, sedangkan IP menangani pengalamatan serta perutean paket.
              </p>
              <div className="stack">
                <div>Application</div>
                <div>Transport</div>
                <div>Internet</div>
                <div>Network Access</div>
              </div>
              <div className="mapping">
                <div><b>Application</b>Gabungan fungsi aplikasi, presentasi, dan sesi pada OSI.</div>
                <div><b>Transport</b>Berhubungan dengan pengiriman antarperangkat, termasuk TCP dan UDP.</div>
                <div><b>Internet</b>Menangani pengalamatan dan perutean paket.</div>
                <div><b>Network Access</b>Mencakup fungsi fisik dan tautan data pada OSI.</div>
              </div>
              <div className="small" style={{ marginTop: '16px' }}>
                Berdasarkan Modul Training.
              </div>
            </div>
          )}

          {/* SLIDE 5: TOPOLOGI JARINGAN (BAGIAN 1) */}
          {current === 4 && (
            <div>
              <div className="kicker">05 · Topologi jaringan</div>
              <h2 className="slide-title-2">
                Bagaimana perangkat <span className="accent">disusun?</span>
              </h2>
              <p>
                Topologi adalah susunan fisik atau logis yang menggambarkan bagaimana komputer, server, router, dan perangkat lain saling terhubung.
              </p>
              <div className="grid">
                <div className="card">
                  <h3>Contoh paling sederhana</h3>
                  <p>Dua perangkat terhubung langsung melalui media jaringan, misalnya Ethernet/LAN.</p>
                  <div className="topo-art" style={{ marginTop: '12px' }}>
                    <svg viewBox="0 0 420 130" role="img" aria-label="Dua komputer terhubung langsung">
                      <path className="edge" d="M105 65 H315" />
                      <rect className="node" x="55" y="35" width="90" height="55" rx="7" />
                      <rect className="node" x="275" y="35" width="90" height="55" rx="7" />
                      <text className="nodeText" x="100" y="68" textAnchor="middle">PC 1</text>
                      <text className="nodeText" x="320" y="68" textAnchor="middle">PC 2</text>
                      <text x="210" y="52" fill="#9dc4d5" fontSize="11" textAnchor="middle">Ethernet / LAN</text>
                    </svg>
                  </div>
                </div>

                <div className="card">
                  <h3>Contoh jaringan umum</h3>
                  <p>Server dan beberapa perangkat terhubung melalui switch (LAN), lalu ke ISP melalui router.</p>
                  <div className="topo-art" style={{ marginTop: '12px' }}>
                    <svg viewBox="0 0 420 160" role="img" aria-label="Server, switch, router, perangkat dan ISP">
                      <path className="edge" d="M65 82 H160 M240 82 H330 M200 60 V46 M200 24 V16" />
                      <rect className="node" x="15" y="60" width="90" height="42" rx="6" />
                      <rect className="node" x="160" y="60" width="80" height="42" rx="6" />
                      <rect className="node" x="165" y="24" width="70" height="22" rx="5" />
                      <rect className="node" x="315" y="30" width="90" height="35" rx="6" />
                      <rect className="node" x="315" y="80" width="90" height="35" rx="6" />
                      <rect className="node" x="315" y="130" width="90" height="25" rx="6" />
                      <path className="edge" d="M240 82 H285 V47 H315 M285 82 H315 M285 82 V142 H315" />
                      <text className="nodeText" x="60" y="86" textAnchor="middle">Server</text>
                      <text className="nodeText" x="200" y="86" textAnchor="middle">Switch</text>
                      <text className="nodeText" x="200" y="39" textAnchor="middle" fontSize="11">Router</text>
                      <text className="nodeText" x="360" y="52" textAnchor="middle">PC 1</text>
                      <text className="nodeText" x="360" y="102" textAnchor="middle">PC 2</text>
                      <text className="nodeText" x="360" y="147" textAnchor="middle">PC 3</text>
                      <text x="200" y="12" fill="#9dc4d5" fontSize="11" textAnchor="middle">ISP / Internet</text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="small" style={{ marginTop: '16px' }}>
                Berdasarkan Modul Training.
              </div>
            </div>
          )}

          {/* SLIDE 6: JENIS TOPOLOGI */}
          {current === 5 && (
            <div>
              <div className="kicker">06 · Jenis topologi</div>
              <h2 className="slide-title-2">Lima bentuk topologi</h2>
              <p>Pilih nama topologi untuk melihat pola hubungan perangkatnya.</p>
              
              <div className="pills">
                {Object.keys(topoData).map((key) => (
                  <button
                    key={key}
                    aria-pressed={activeTopoKey === key}
                    onClick={() => setActiveTopoKey(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="topology">
                <div className="topo-art">
                  {renderTopoSvg(topoData[activeTopoKey].type)}
                </div>
                <div className="card">
                  <div className="number">TOPOLOGI {activeTopoKey.toUpperCase()}</div>
                  <h3>Topologi {topoData[activeTopoKey].name}</h3>
                  <p>{topoData[activeTopoKey].desc}</p>
                </div>
              </div>

              <div className="small" style={{ marginTop: '16px' }}>
                Jenis yang ditampilkan pada dokumen: Bus, Star, Ring, Mesh, dan Hybrid (halaman 5–6).
              </div>
            </div>
          )}

          {/* SLIDE 7: PROTOKOL TRANSPORT */}
          {current === 6 && (
            <div>
              <div className="kicker">07 · Protokol transport</div>
              <h2 className="slide-title-2">TCP atau UDP?</h2>
              <p>Keduanya digunakan pada lapisan transport, tetapi memiliki karakteristik pengiriman yang berbeda.</p>
              
              <div className="pills">
                <button
                  aria-pressed={activeProto === 'tcp'}
                  onClick={() => setActiveProto('tcp')}
                >
                  TCP
                </button>
                <button
                  aria-pressed={activeProto === 'udp'}
                  onClick={() => setActiveProto('udp')}
                >
                  UDP
                </button>
              </div>

              <div className="compare">
                <div className="card">
                  <div className="number">{protoContent[activeProto].name}</div>
                  <h3>{protoContent[activeProto].title}</h3>
                  <div className="metric">{protoContent[activeProto].metric}</div>
                  <p>{protoContent[activeProto].desc}</p>
                  <div style={{ marginTop: '10px' }}>
                    {protoContent[activeProto].tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="number">KARAKTERISTIK</div>
                  <h3>{protoContent[activeProto].characTitle}</h3>
                  <p>{protoContent[activeProto].characDesc}</p>
                </div>
              </div>

              <div className="callout">
                {protoContent[activeProto].note}
              </div>

              <div className="small" style={{ marginTop: '16px' }}>
                Berdasarkan Modul Training.
              </div>
            </div>
          )}

          {/* SLIDE 8: PORT */}
          {current === 7 && (
            <div>
              <div className="kicker">08 · Port</div>
              <h2 className="slide-title-2">
                Port: pintu menuju <span className="accent">layanan</span>
              </h2>
              <p>
                Port digunakan untuk mengidentifikasi layanan atau aplikasi spesifik dalam komunikasi jaringan. 
                Rentang nomor port adalah 0 hingga 65.535 (total 65.536 kemungkinan port berbasis bilangan 16-bit).
              </p>
              
              <div className="grid three">
                <div className="card">
                  <div className="metric">0–1023</div>
                  <h3>Well-known</h3>
                  <p>Rentang port yang dikenal luas.</p>
                </div>
                <div className="card">
                  <div className="metric">1024–49151</div>
                  <h3>Registered</h3>
                  <p>Rentang port terdaftar.</p>
                </div>
                <div className="card">
                  <div className="metric">49152–65535</div>
                  <h3>Dynamic</h3>
                  <p>Rentang port dinamis/tidak terdaftar.</p>
                </div>
              </div>

              <div className="callout">
                Analogi pada dokumen: server seperti sebuah gedung, sedangkan SSH, DNS, HTTP, dan HTTPS seperti pintu menuju layanan yang berbeda.
              </div>
            </div>
          )}

          {/* SLIDE 9: PORT UMUM */}
          {current === 8 && (
            <div>
              <div className="kicker">09 · Port umum</div>
              <h2 className="slide-title-2">Beberapa port yang sering ditemui</h2>
              <p>Tabel berikut merangkum contoh layanan dan protokol yang dicantumkan pada dokumen.</p>

              <div className="slide-table-container">
                <table className="slide-table">
                  <thead>
                    <tr>
                      <th>Port</th>
                      <th>Layanan</th>
                      <th>Protokol</th>
                      <th>Fungsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portTableData.map((row) => (
                      <tr key={row.port}>
                        <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{row.port}</td>
                        <td style={{ fontWeight: 600 }}>{row.service}</td>
                        <td>{row.proto}</td>
                        <td style={{ color: '#d0e0e9' }}>{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="small" style={{ marginTop: '14px' }}>
                Koreksi teknis: NTP beroperasi menggunakan UDP (port 123), DNS mendukung TCP &amp; UDP (port 53), sedangkan HTTP standar beroperasi menggunakan TCP (port 80).
              </p>
            </div>
          )}

          {/* SLIDE 10: NETWORK ADDRESS */}
          {current === 9 && (
            <div>
              <div className="kicker">10 · Network address</div>
              <h2 className="slide-title-2">
                MAC Address vs <span className="accent">IP Address</span>
              </h2>

              <div className="compare">
                <div className="card">
                  <div className="number">IDENTITAS FISIK</div>
                  <h3>MAC Address</h3>
                  <div className="address-demo">
                    <span className="octet">00-B0-D0</span>
                    <span className="octet">63-C2-26</span>
                  </div>
                  <p>
                    Mengidentifikasi perangkat keras/NIC secara unik dalam jaringan lokal. Pada model OSI, bekerja di Data Link (Layer 2).
                  </p>
                  <p className="small" style={{ marginTop: '8px' }}>
                    Dokumen menjelaskan enam digit terdepan sebagai penanda vendor.
                  </p>
                </div>

                <div className="card">
                  <div className="number">IDENTITAS LOGIS</div>
                  <h3>IP Address</h3>
                  <div className="address-demo">
                    <span className="octet">192</span>
                    <span className="octet">168</span>
                    <span className="octet">1</span>
                    <span className="octet">1</span>
                  </div>
                  <p>
                    Mengidentifikasi perangkat pada jaringan yang lebih luas dan memungkinkan komunikasi antarjaringan. Bekerja pada Network Layer (Layer 3).
                  </p>
                  <div style={{ marginTop: '10px' }}>
                    <span className="tag">IPv4</span>
                    <span className="tag">IPv6</span>
                  </div>
                </div>
              </div>

              <div className="callout">
                Cara mengingat: MAC berhubungan dengan antarmuka jaringan perangkat, sedangkan IP merupakan alamat logis yang digunakan dalam komunikasi jaringan.
              </div>

              <div className="small" style={{ marginTop: '16px' }}>
                Berdasarkan Modul Training.
              </div>
            </div>
          )}

          {/* SLIDE 11: PENGALAMATAN IPV4 */}
          {current === 10 && (
            <div>
              <div className="kicker">11 · Pengalamatan IPv4</div>
              <h2 className="slide-title-2">
                Dari kelas alamat ke <span className="accent">CIDR</span>
              </h2>
              <p>
                Dokumen memperkenalkan pembagian kelas IPv4 dan menjelaskan bahwa kebutuhan kapasitas alamat mendorong penggunaan metode classless yang dirujuk sebagai RFC 4632.
              </p>

              <div className="grid">
                <div className="card">
                  <h3>Pembagian kelas pada materi</h3>
                  <p><b>Kelas A</b> · Network – Host – Host – Host</p>
                  <p><b>Kelas B</b> · Network – Network – Host – Host</p>
                  <p><b>Kelas C</b> · Network – Network – Network – Host</p>
                </div>
                <div className="card">
                  <h3>Public dan Private IP</h3>
                  <p><b>Public IP</b> digunakan untuk terhubung dengan internet.</p>
                  <p><b>Private IP</b> digunakan pada jaringan lokal.</p>
                </div>
              </div>

              <h3 style={{ marginTop: '24px', fontSize: '18px', color: '#ffffff' }}>
                Rentang Private IPv4 (RFC 1918)
              </h3>

              <div className="slide-table-container">
                <table className="slide-table">
                  <thead>
                    <tr>
                      <th>Blok CIDR</th>
                      <th>Alamat awal</th>
                      <th>Alamat akhir</th>
                      <th>Kelas Asal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--accent)' }}>10.0.0.0/8</td>
                      <td>10.0.0.0</td>
                      <td>10.255.255.255</td>
                      <td>Kelas A (/8)</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--accent)' }}>172.16.0.0/12</td>
                      <td>172.16.0.0</td>
                      <td>172.31.255.255</td>
                      <td>Kelas B (/12)</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 700, color: 'var(--accent)' }}>192.168.0.0/16</td>
                      <td>192.168.0.0</td>
                      <td>192.168.255.255</td>
                      <td>Kelas C (/16)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="small" style={{ marginTop: '16px' }}>
                Pengalamatan privat distandarisasi pada RFC 1918, dan perutean tanpa kelas dirujuk pada RFC 4632 (CIDR).
              </div>
            </div>
          )}

          {/* SLIDE 12: PENUTUP */}
          {current === 11 && (
            <div>
              <div className="kicker">12 · Penutup</div>
              <h2 className="slide-title-2">Menyatukan konsep</h2>
              <p>
                Sebuah perangkat mengirim data melalui jaringan dengan mengikuti protokol. Topologi menggambarkan susunan koneksinya, alamat membantu mengenali sumber dan tujuan, sedangkan port mengarahkan komunikasi ke layanan yang tepat.
              </p>

              <div className="grid three">
                <div className="card">
                  <h3 className="accent">OSI / TCP-IP</h3>
                  <p>Kerangka untuk memahami tahapan komunikasi.</p>
                </div>
                <div className="card">
                  <h3 className="accent">Topologi</h3>
                  <p>Gambaran hubungan antarperangkat.</p>
                </div>
                <div className="card">
                  <h3 className="accent">Alamat / Port</h3>
                  <p>Identitas perangkat dan layanan tujuan.</p>
                </div>
              </div>

              <div className="callout">
                <b>Inti materi:</b> jaringan komputer bukan hanya menghubungkan perangkat, tetapi juga membutuhkan aturan, struktur, identitas, dan mekanisme komunikasi yang terorganisir.
              </div>

              <div className="small" style={{ marginTop: '16px' }}>
                Sumber utama: <i>Modul Jaringan Komputer</i>, Training Network RISTIE 2026.
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Controls matching HTML */}
      <footer style={{
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderTop: '1px solid #23445a',
        backgroundColor: '#071827',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <button
            onClick={() => show(current - 1)}
            disabled={current === 0}
            style={{
              minWidth: '88px',
              opacity: current === 0 ? 0.35 : 1,
              cursor: current === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Sebelumnya
          </button>
          <button
            onClick={() => show(current + 1)}
            disabled={current === total - 1}
            style={{
              minWidth: '88px',
              opacity: current === total - 1 ? 0.35 : 1,
              cursor: current === total - 1 ? 'not-allowed' : 'pointer',
              background: '#1d6677',
              borderColor: 'var(--accent)'
            }}
          >
            Berikutnya →
          </button>
        </div>

        <div style={{
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--muted)',
          fontSize: '13px',
          fontWeight: 700
        }}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <button
            onClick={() => setShowOverviewModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <List size={14} />
            <span>Daftar slide</span>
          </button>
        </div>
      </footer>

      {/* Modal Daftar Slide */}
      {showOverviewModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(5, 18, 30, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #10283b 0%, #0b2031 90%)',
            border: '1px solid #294b61',
            borderRadius: '18px',
            padding: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#ffffff' }}>Daftar Slide Presentasi</h3>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                  Pilih slide untuk langsung berpindah
                </div>
              </div>
              <button 
                onClick={() => setShowOverviewModal(false)}
                style={{ padding: '6px 10px', background: 'transparent', border: '1px solid var(--line)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingRight: '6px'
            }}>
              {slideTitles.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    show(idx);
                    setShowOverviewModal(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: `1px solid ${current === idx ? 'var(--accent)' : 'var(--line)'}`,
                    background: current === idx ? '#1d6677' : '#14344b',
                    color: '#ffffff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: '0.15s ease'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: current === idx ? 700 : 500 }}>
                    {title}
                  </span>
                  <span className="number" style={{ fontSize: '11px', color: current === idx ? '#ffffff' : 'var(--accent2)' }}>
                    Slide {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

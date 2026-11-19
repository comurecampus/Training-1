import React, { useState } from 'react';
import { commonPorts } from '../data/networkData';
import { Hash, Search, Filter, Shield, Server, ExternalLink } from 'lucide-react';

export default function PortExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Web', 'Core Services', 'Email', 'Remote Access', 'File Transfer', 'Database'];

  const filteredPorts = commonPorts.filter(item => {
    const matchesSearch = 
      item.port.toString().includes(searchTerm) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'Semua' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-cyan">Alamat Logis Layanan</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>16-Bit Transport Identifier</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Direktori & Eksplorasi <span className="text-cyan">Nomor Port</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Port adalah pengenal numerik 16-bit (total 65.536 nomor) yang menentukan ke aplikasi atau layanan mana 
          data yang masuk harus diarahkan di dalam sistem operasi.
        </p>
      </div>

      {/* 3 Categories Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ background: 'var(--bg-card-alt)', border: '1px solid #1f4561', borderRadius: '0.85rem', padding: '1.25rem' }}>
          <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            0 – 1.023
          </div>
          <h4 style={{ fontSize: '1rem', margin: '0.3rem 0 0.2rem' }}>Well-Known Ports</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Port standar yang dicadangkan untuk layanan sistem inti dan protokol web populer (HTTP, SSH, DNS).
          </p>
        </div>

        <div style={{ background: 'var(--bg-card-alt)', border: '1px solid #1f4561', borderRadius: '0.85rem', padding: '1.25rem' }}>
          <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-mint)' }}>
            1.024 – 49.151
          </div>
          <h4 style={{ fontSize: '1rem', margin: '0.3rem 0 0.2rem' }}>Registered Ports</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Port terdaftar oleh IANA untuk aplikasi vendor pihak ketiga spesifik (MySQL 3306, Postgres 5432).
          </p>
        </div>

        <div style={{ background: 'var(--bg-card-alt)', border: '1px solid #1f4561', borderRadius: '0.85rem', padding: '1.25rem' }}>
          <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
            49.152 – 65.535
          </div>
          <h4 style={{ fontSize: '1rem', margin: '0.3rem 0 0.2rem' }}>Dynamic / Ephemeral</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Port sementara yang dialokasikan oleh sistem operasi pada sisi klien saat membuka koneksi outbound.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem'
      }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          minWidth: '260px',
          flex: '1 1 260px'
        }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari port (misal: 80, SSH, DNS, HTTP)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.4rem',
              borderRadius: '0.65rem',
              background: '#091c2b',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        {/* Categories Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : ''}`}
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Port Directory Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '0.85rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#0e2b40', borderBottom: '1px solid #234c6b' }}>
              <th style={{ padding: '0.85rem 1rem', width: '90px' }}>Port</th>
              <th style={{ padding: '0.85rem 1rem', width: '130px' }}>Layanan</th>
              <th style={{ padding: '0.85rem 1rem', width: '120px' }}>Protokol</th>
              <th style={{ padding: '0.85rem 1rem', width: '140px' }}>Kategori</th>
              <th style={{ padding: '0.85rem 1rem' }}>Deskripsi & Peran</th>
            </tr>
          </thead>
          <tbody>
            {filteredPorts.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Tidak ada nomor port yang cocok dengan pencarian "{searchTerm}".
                </td>
              </tr>
            ) : (
              filteredPorts.map((item, idx) => (
                <tr 
                  key={item.port} 
                  style={{
                    borderBottom: '1px solid #143046',
                    background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 198, 217, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent'}
                >
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 800 }}>
                    <span className="mono" style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.35rem',
                      background: '#13354b',
                      color: 'var(--accent-cyan)',
                      border: '1px solid #2b5570'
                    }}>
                      {item.port}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: '#ffffff' }}>
                    {item.service}
                  </td>
                  <td style={{ padding: '0.8rem 1rem' }}>
                    <span className="badge" style={{
                      fontSize: '0.7rem',
                      background: item.transport.includes('UDP') && !item.transport.includes('TCP') ? 'rgba(121, 224, 181, 0.15)' : 'rgba(56, 198, 217, 0.15)',
                      color: item.transport.includes('UDP') && !item.transport.includes('TCP') ? 'var(--accent-mint)' : 'var(--accent-cyan)'
                    }}>
                      {item.transport}
                    </span>
                  </td>
                  <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)' }}>
                    {item.category}
                  </td>
                  <td style={{ padding: '0.8rem 1rem', color: '#cbe0ed' }}>
                    {item.desc}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


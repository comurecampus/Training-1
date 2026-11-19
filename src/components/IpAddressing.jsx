import React from 'react';
import { ipClasses, privateIpRanges } from '../data/networkData';
import { Globe, Cpu, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function IpAddressing() {
  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-cyan">Identitas Jaringan</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Layer 2 vs Layer 3 Addressing</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Pengalamatan Jaringan: <span className="text-cyan">MAC Address</span> vs <span className="text-mint">IP Address</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Komunikasi jaringan bergantung pada dua bentuk identitas yang berbeda: identitas perangkat keras permanen (MAC) 
          dan identitas logis yang dapat diubah sesuai lokasi jaringan (IP).
        </p>
      </div>

      {/* Anatomy Visualizer Side-by-Side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* MAC Address Anatomy */}
        <div style={{
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="badge badge-cyan">Lapisan 2 · Data Link</span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>48-Bit Hex</span>
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#ffffff' }}>
            MAC Address (Fisik)
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Tertanam langsung pada chip NIC (Network Interface Card) oleh pabrik pembuat dan berlaku di jaringan lokal (L2).
          </p>

          {/* Interactive MAC Box */}
          <div style={{
            background: '#071827',
            border: '1px solid #1c425c',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <div style={{ background: '#123e59', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-cyan)' }}>
                <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>00 : B0 : D0</span>
              </div>
              <div style={{ background: '#123e59', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-mint)' }}>
                <span className="mono" style={{ fontWeight: 800, color: 'var(--accent-mint)' }}>63 : C2 : 26</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0 0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>← 24-bit OUI (Vendor ID)</span>
              <span style={{ color: 'var(--accent-mint)' }}>24-bit NIC Serial →</span>
            </div>
          </div>

          <ul style={{ fontSize: '0.82rem', color: '#cadde8', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li><b>OUI (Organizationally Unique Identifier):</b> Kode resmi pembuat perangkat (Cisco, Intel, Apple, dll).</li>
            <li>Tidak dapat diroute langsung melintasi internet tanpa melalui Router.</li>
          </ul>
        </div>

        {/* IP Address Anatomy */}
        <div style={{
          background: 'var(--bg-card-alt)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '1rem',
          padding: '1.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span className="badge badge-mint">Lapisan 3 · Network</span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-mint)' }}>32-Bit Decimal</span>
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#ffffff' }}>
            IP Address (Logis)
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Alamat logis terkonfigurasi (statis atau DHCP) yang dapat dirutekan melintasi banyak jaringan dan internet global.
          </p>

          {/* Interactive IP Box */}
          <div style={{
            background: '#071827',
            border: '1px solid #1c425c',
            borderRadius: '0.75rem',
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span className="mono" style={{ background: '#123e59', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-mint)', fontWeight: 800, color: 'var(--accent-mint)' }}>192</span>
              <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>.</span>
              <span className="mono" style={{ background: '#123e59', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-mint)', fontWeight: 800, color: 'var(--accent-mint)' }}>168</span>
              <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>.</span>
              <span className="mono" style={{ background: '#123e59', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-mint)', fontWeight: 800, color: 'var(--accent-mint)' }}>1</span>
              <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>.</span>
              <span className="mono" style={{ background: '#254427', padding: '0.4rem 0.6rem', borderRadius: '0.4rem', border: '1px solid var(--accent-amber)', fontWeight: 800, color: 'var(--accent-amber)' }}>100</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0 0.5rem' }}>
              <span style={{ color: 'var(--accent-mint)' }}>← Network ID (Subnet)</span>
              <span style={{ color: 'var(--accent-amber)' }}>Host ID →</span>
            </div>
          </div>

          <ul style={{ fontSize: '0.82rem', color: '#cadde8', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li>IPv4: Terdiri dari 4 oktet (32 bit total), masing-masing bernilai 0 hingga 255.</li>
            <li>Diterjemahkan ke MAC Address melalui protokol <b>ARP (Address Resolution Protocol)</b>.</li>
          </ul>
        </div>
      </div>

      {/* Classful IPv4 Table */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={18} color="var(--accent-cyan)" />
          <span>Pembagian Kelas IPv4 Bersejarah (Classful Addressing)</span>
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Sebelum diperkenalkannya CIDR (RFC 4632), pengalamatan IPv4 dibagi secara kaku ke dalam 5 kelas:
        </p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '0.85rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#0e2b40', borderBottom: '1px solid #234c6b' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Kelas</th>
                <th style={{ padding: '0.85rem 1rem' }}>Rentang Oktet Pertama</th>
                <th style={{ padding: '0.85rem 1rem' }}>Default Subnet Mask</th>
                <th style={{ padding: '0.85rem 1rem' }}>Kapasitas Maksimal Host</th>
                <th style={{ padding: '0.85rem 1rem' }}>Tujuan Penggunaan</th>
              </tr>
            </thead>
            <tbody>
              {ipClasses.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #143046', background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.015)' : 'transparent' }}>
                  <td style={{ padding: '0.8rem 1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{c.class}</td>
                  <td style={{ padding: '0.8rem 1rem' }} className="mono">{c.firstOctet} ({c.range})</td>
                  <td style={{ padding: '0.8rem 1rem', color: 'var(--accent-mint)' }} className="mono">{c.defaultMask}</td>
                  <td style={{ padding: '0.8rem 1rem' }}>{c.maxHosts}</td>
                  <td style={{ padding: '0.8rem 1rem', color: 'var(--text-muted)' }}>{c.useFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RFC 1918 Private IP Ranges */}
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={18} color="var(--accent-amber)" />
          <span>Rentang Private IP (RFC 1918) vs Public IP</span>
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Alamat Private IP tidak dapat diroute langsung di internet publik dan digunakan khusus untuk jaringan lokal internal (LAN). 
          Router menggunakan <b>NAT (Network Address Translation)</b> untuk menerjemahkan Private IP ke satu Public IP resmi.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {privateIpRanges.map((p, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-card-alt)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.85rem',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  {p.cidr}
                </span>
                <span className="badge badge-mint">{p.sourceClass}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }} className="mono">
                {p.start} – {p.end}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                {p.usage} (Total: {p.totalIps})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

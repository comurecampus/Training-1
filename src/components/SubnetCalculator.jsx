import React, { useState } from 'react';
import { Calculator, CheckCircle, RefreshCw, Copy, Check } from 'lucide-react';

export default function SubnetCalculator() {
  const [ipInput, setIpInput] = useState('192.168.1.50');
  const [cidr, setCidr] = useState(24);
  const [copiedField, setCopiedField] = useState(null);

  // Helper calculations
  const calculateSubnet = (ipStr, prefix) => {
    // Validate IP format
    const octets = ipStr.trim().split('.').map(Number);
    if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
      return { error: 'Format alamat IP tidak valid (gunakan format: 0.0.0.0 s.d 255.255.255.255)' };
    }

    const ipInt = (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
    const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix));

    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

    const intToIp = (val) => [
      (val >>> 24) & 255,
      (val >>> 16) & 255,
      (val >>> 8) & 255,
      val & 255
    ].join('.');

    const intToBinary = (val) => {
      const arr = [
        ((val >>> 24) & 255).toString(2).padStart(8, '0'),
        ((val >>> 16) & 255).toString(2).padStart(8, '0'),
        ((val >>> 8) & 255).toString(2).padStart(8, '0'),
        (val & 255).toString(2).padStart(8, '0')
      ];
      return arr.join('.');
    };

    const maskIp = intToIp(maskInt);
    const netIp = intToIp(netInt);
    const bcastIp = intToIp(bcastInt);

    const totalIps = Math.pow(2, 32 - prefix);
    const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : totalIps - 2;

    const firstUsable = prefix >= 31 ? netIp : intToIp(netInt + 1);
    const lastUsable = prefix >= 31 ? bcastIp : intToIp(bcastInt - 1);

    // Determine Class
    const firstOct = octets[0];
    let ipClass = 'Kelas A';
    if (firstOct >= 128 && firstOct <= 191) ipClass = 'Kelas B';
    else if (firstOct >= 192 && firstOct <= 223) ipClass = 'Kelas C';
    else if (firstOct >= 224 && firstOct <= 239) ipClass = 'Kelas D (Multicast)';
    else if (firstOct >= 240) ipClass = 'Kelas E (Eksperimental)';

    // Determine RFC 1918 Private status
    let isPrivate = false;
    if (firstOct === 10) isPrivate = true;
    else if (firstOct === 172 && octets[1] >= 16 && octets[1] <= 31) isPrivate = true;
    else if (firstOct === 192 && octets[1] === 168) isPrivate = true;

    // Wildcard mask
    const wildcardInt = (~maskInt >>> 0);
    const wildcardIp = intToIp(wildcardInt);

    return {
      error: null,
      ip: ipStr,
      prefix,
      netIp,
      bcastIp,
      maskIp,
      maskBinary: intToBinary(maskInt),
      firstUsable,
      lastUsable,
      totalIps,
      usableHosts,
      ipClass,
      isPrivate,
      wildcardIp
    };
  };

  const result = calculateSubnet(ipInput, Number(cidr));

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="card-panel fade-in" style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-mint">RFC 4632 CIDR</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Classless Inter-Domain Routing</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em' }}>
          Kalkulator <span className="text-mint">Subnet & CIDR</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', marginTop: '0.4rem' }}>
          Hitung Network ID, Broadcast ID, Subnet Mask desimal & biner, serta rentang usable host IP secara instan.
        </p>
      </div>

      {/* Input Controls Panel */}
      <div style={{
        background: 'var(--bg-card-alt)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        alignItems: 'flex-end'
      }}>
        {/* IP Input */}
        <div style={{ flex: '2 1 250px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
            Alamat IPv4:
          </label>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="192.168.1.1"
            className="mono"
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '0.65rem',
              background: '#071827',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              outline: 'none'
            }}
          />
        </div>

        {/* CIDR Prefix Selector */}
        <div style={{ flex: '1 1 180px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
            Prefix CIDR (Subnet Mask):
          </label>
          <select
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="mono"
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '0.65rem',
              background: '#071827',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent-mint)',
              fontSize: '1rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Array.from({ length: 25 }, (_, i) => i + 8).map((p) => (
              <option key={p} value={p}>
                /{p}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Presets */}
        <div style={{ flex: '3 1 300px' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>
            Preset Cepat:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            <button
              onClick={() => { setIpInput('192.168.1.1'); setCidr(24); }}
              className="btn btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              192.168.1.1/24 (LAN)
            </button>
            <button
              onClick={() => { setIpInput('10.0.0.1'); setCidr(16); }}
              className="btn btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              10.0.0.1/16 (Kampus)
            </button>
            <button
              onClick={() => { setIpInput('172.16.10.1'); setCidr(26); }}
              className="btn btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              172.16.10.1/26 (62 Hosts)
            </button>
            <button
              onClick={() => { setIpInput('10.10.10.1'); setCidr(30); }}
              className="btn btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              /30 (PTP Router)
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result.error ? (
        <div style={{
          background: 'rgba(248, 113, 113, 0.12)',
          border: '1px solid var(--accent-rose)',
          borderRadius: '0.75rem',
          padding: '1rem',
          color: 'var(--accent-rose)',
          fontSize: '0.9rem'
        }}>
          {result.error}
        </div>
      ) : (
        <div>
          {/* Main highlights grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ background: '#091f30', border: '1px solid #1f4561', borderRadius: '0.75rem', padding: '1.15rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NETWORK ADDRESS (ID)</div>
              <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)', margin: '0.2rem 0' }}>
                {result.netIp}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Alamat subnet pertama (tidak untuk host)</div>
            </div>

            <div style={{ background: '#091f30', border: '1px solid #1f4561', borderRadius: '0.75rem', padding: '1.15rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BROADCAST ADDRESS</div>
              <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-amber)', margin: '0.2rem 0' }}>
                {result.bcastIp}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Alamat broadcast ke semua node subnet</div>
            </div>

            <div style={{ background: '#091f30', border: '1px solid #1f4561', borderRadius: '0.75rem', padding: '1.15rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>USABLE HOST RANGE</div>
              <div className="mono" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-mint)', margin: '0.35rem 0' }}>
                {result.firstUsable} – {result.lastUsable}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rentang IP yang dapat diberikan ke perangkat</div>
            </div>

            <div style={{ background: '#091f30', border: '1px solid #1f4561', borderRadius: '0.75rem', padding: '1.15rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JUMLAH USABLE HOSTS</div>
              <div className="mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: '0.2rem 0' }}>
                {result.usableHosts.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Dari total {result.totalIps.toLocaleString()} alamat</div>
            </div>
          </div>

          {/* Technical Details Table */}
          <div style={{
            background: 'var(--bg-card-alt)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1d435e' }}>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)', width: '220px' }}>Subnet Mask (Desimal)</td>
                  <td className="mono" style={{ padding: '0.65rem 1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{result.maskIp}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1d435e' }}>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>Subnet Mask (Biner 32-bit)</td>
                  <td className="mono" style={{ padding: '0.65rem 1rem', color: 'var(--accent-mint)', letterSpacing: '0.04em' }}>{result.maskBinary}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1d435e' }}>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>Wildcard Mask</td>
                  <td className="mono" style={{ padding: '0.65rem 1rem' }}>{result.wildcardIp}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1d435e' }}>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>Kelas IP / Tipe Alamat</td>
                  <td style={{ padding: '0.65rem 1rem' }}>
                    <span className="badge badge-cyan" style={{ marginRight: '0.5rem' }}>{result.ipClass}</span>
                    <span className={`badge ${result.isPrivate ? 'badge-mint' : 'badge-amber'}`}>
                      {result.isPrivate ? 'Private IP (RFC 1918)' : 'Public IP Internet'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


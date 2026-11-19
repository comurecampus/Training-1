# Training-1 — Network 01: Dasar Jaringan Komputer

Website pembelajaran interaktif dan modul visual untuk **Dasar Jaringan Komputer** (Training Network RisTIE 2026), dibangun menggunakan struktur modern **React 19** didukung oleh **Vite 6**.

---

## 🚀 Fitur Utama

1. **Model Referensi OSI (7 Layer)**
   - Eksplorasi interaktif lapisan L1 (Physical) hingga L7 (Application).
   - Penjelasan PDU (Protocol Data Unit), protokol umum, perangkat keras, dan analogi dunia nyata.
   - **Simulasi Enkapsulasi Paket Data** bertahap dari Application hingga sinyal bit fisik.

2. **Model Protokol TCP/IP (4 Layer)**
   - Arsitektur standar internet dunia nyata (Application, Transport, Internet, Network Access).
   - Pemetaan langsung (*mapping*) perbandingan antara TCP/IP dan 7 layer OSI.

3. **Eksplorasi Topologi Jaringan**
   - Visualisasi SVG interaktif untuk 5 bentuk topologi: **Bus, Star, Ring, Mesh, dan Hybrid**.
   - Node interaktif yang dapat diklik untuk memeriksa status jaringan.
   - Analisis kelebihan, kekurangan, toleransi kegagalan (*fault tolerance*), dan skenario penggunaan.

4. **Komparasi Protokol Transport: TCP vs UDP**
   - Matriks perbandingan komprehensif (keandalan, urutan paket, kontrol aliran, ukuran header).
   - **Simulasi Transmisi Langsung**: Alur 3-way handshake (SYN, SYN-ACK, ACK) pada TCP vs *fire-and-forget* datagram pada UDP beserta simulasi *packet loss*.

5. **Direktori & Pencarian Nomor Port (Port Explorer)**
   - Klasifikasi rentang port: *Well-Known* (0–1023), *Registered* (1024–49151), dan *Dynamic/Ephemeral* (49152–65535).
   - Fitur pencarian instan dan filter kategori (Web, Email, Remote, Core Services, Database, File Transfer).

6. **Pengalamatan Jaringan (IP vs MAC Address)**
   - Anatomi visual MAC Address (24-bit OUI Vendor + 24-bit NIC Serial).
   - Anatomi IPv4 (Network ID vs Host ID).
   - Tabel kelas IPv4 bersejarah (Kelas A, B, C, D, E).
   - Panduan alamat privat **RFC 1918** (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) dan peran NAT.

7. **Kalkulator Subnet & CIDR Interaktif**
   - Masukkan alamat IP dan pilih prefix CIDR (/8 s.d /30).
   - Menghitung secara otomatis: Subnet Mask (desimal & biner 32-bit), Network ID, Broadcast ID, Usable Host Range, dan Total Host.
   - Tombol preset cepat untuk konfigurasi umum (LAN /24, Kampus /16, PTP Router /30).

8. **Kuis Interaktif Uji Pemahaman**
   - 8 soal pilihan ganda menguji pemahaman konsep dasar jaringan.
   - Umpan balik instan (*instant feedback*), koreksi jawaban, penjelasan konsep mendalam, dan papan skor akhir.

9. **Mode Presentasi Slide (12 Slide)**
   - Mode layar penuh (*fullscreen*) bergaya slide presentasi interaktif dengan navigasi keyboard (`←` / `→`).
   - Melestarikan dan memodernisasi konten modul presentasi interaktif dengan kontrol navigasi modern.

---

## 🛠️ Struktur Direktori Proyek

```
Network 01/
├── index.html               # Entry point HTML dengan font Plus Jakarta Sans & Fira Code
├── package.json             # Konfigurasi dependensi React 19 & Vite 6
├── vite.config.js           # Konfigurasi Vite bundler
├── public/
│   └── vite.svg             # Logo SVG kustom jaringan
└── src/
    ├── main.jsx             # Entry point React
    ├── App.jsx              # Main App Controller & Tab Router
    ├── index.css            # Styling global tema modern cyberpunk/dark navy
    ├── data/
    │   └── networkData.js   # Dataset OSI, TCP/IP, topologi, port, dan kuis
    └── components/
        ├── Navbar.jsx       # Header navigasi & toggle mode slide
        ├── Hero.jsx         # Hero banner & kartu ringkasan fitur
        ├── OsiModel.jsx     # Modul interaktif 7 OSI Layer & simulasi enkapsulasi
        ├── TcpIpModel.jsx   # Modul 4 TCP/IP Layer & pemetaan OSI
        ├── TopologyViewer.jsx # Diagram SVG topologi interaktif
        ├── ProtocolComparison.jsx # Komparasi TCP vs UDP & simulator paket
        ├── PortExplorer.jsx # Direktori & pencarian nomor port
        ├── IpAddressing.jsx # MAC Address vs IP Address & RFC 1918
        ├── SubnetCalculator.jsx # Kalkulator subnetting & CIDR
        ├── InteractiveQuiz.jsx # Kuis interaktif 8 soal dengan skor
        ├── SlideMode.jsx    # Mode presentasi 12 slide interaktif
        └── Footer.jsx       # Informasi modul & lisensi
```

---

## 💻 Cara Menjalankan Proyek

Pastikan Anda berada di direktori `Network 01`:

```bash
cd "Network 01"
```

### 1. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Setelah dijalankan, buka alamat lokal yang ditampilkan pada terminal (biasanya `http://localhost:5173`) di peramban web (*browser*).

### 2. Membangun untuk Produksi (Production Build)
```bash
npm run build
```
Hasil build yang teroptimasi akan berada di folder `dist/`.

### 3. Meninjau Hasil Build (Preview)
```bash
npm run preview
```

---

*Dikembangkan untuk Modul Training Network RisTIE 2026 — Universitas Brawijaya.*


// Data komprehensif Dasar Jaringan Komputer - Training RisTIE 2026

export const osiLayers = [
  {
    number: 7,
    name: "Application",
    pdu: "Data",
    description: "Lapisan yang berinteraksi langsung dengan aplikasi pengguna dan menyediakan layanan jaringan untuk perangkat lunak.",
    protocols: ["HTTP", "HTTPS", "FTP", "DNS", "SSH", "SMTP", "IMAP", "DHCP"],
    hardware: "Gateway, Host Application",
    analogy: "Antarmuka pemesanan makanan tempat pengguna memilih menu",
    color: "#38c6d9"
  },
  {
    number: 6,
    name: "Presentation",
    pdu: "Data",
    description: "Menangani format data, kompresi, enkripsi, dan dekripsi agar dapat dipahami oleh aplikasi penerima.",
    protocols: ["SSL/TLS", "JPEG", "ASCII", "MPEG", "MIDI"],
    hardware: "OS / Runtime Libraries",
    analogy: "Penerjemah bahasa yang menerjemahkan menu ke bahasa penerima",
    color: "#46d3cb"
  },
  {
    number: 5,
    name: "Session",
    pdu: "Data",
    description: "Mengatur, memelihara, dan mengakhiri sesi komunikasi antar aplikasi, serta sinkronisasi dialog.",
    protocols: ["RPC", "NetBIOS", "PPTP", "NFS"],
    hardware: "OS Sockets / API",
    analogy: "Petugas yang mencatat kapan percakapan dimulai dan ditutup",
    color: "#56dfbd"
  },
  {
    number: 4,
    name: "Transport",
    pdu: "Segment (TCP) / Datagram (UDP)",
    description: "Menyediakan transfer data end-to-end yang andal atau cepat, kontrol aliran, segmentasi, dan pengecekan error.",
    protocols: ["TCP", "UDP", "SCTP"],
    hardware: "Firewall L4, Host Kernel",
    analogy: "Layanan kurir pengiriman (JNE/Pos): memilih paket kilat atau paket reguler bertanda tangan",
    color: "#79e0b5"
  },
  {
    number: 3,
    name: "Network",
    pdu: "Packet",
    description: "Bertanggung jawab untuk pengalamatan logis (IP) dan perutean (routing) paket data melintasi banyak jaringan.",
    protocols: ["IPv4", "IPv6", "ICMP", "IGMP", "OSPF", "BGP"],
    hardware: "Router, Layer 3 Switch",
    analogy: "Sistem kode pos dan navigasi GPS yang menentukan rute tercepat antar kota",
    color: "#9fe49a"
  },
  {
    number: 2,
    name: "Data Link",
    pdu: "Frame",
    description: "Menangani transfer data antar node yang berada dalam jaringan fisik yang sama menggunakan alamat fisik (MAC Address) dan deteksi error.",
    protocols: ["Ethernet (802.3)", "Wi-Fi (802.11)", "ARP", "PPP", "VLAN (802.1Q)"],
    hardware: "Switch Layer 2, Bridge, NIC, Access Point",
    analogy: "Jalan lokal di perumahan yang menghubungkan rumah tetangga sebelah",
    color: "#c2e783"
  },
  {
    number: 1,
    name: "Physical",
    pdu: "Bits (0 dan 1)",
    description: "Mengatur transmisi sinyal elektrik, optik, atau radio mentah melalui media transmisi fisik.",
    protocols: ["1000BASE-T", "RJ45", "Fiber Optic", "Bluetooth RF"],
    hardware: "Kabel UTP/STP, Fiber Optic, Hub, Repeater, Transceiver",
    analogy: "Aspal jalan raya atau pipa tempat kendaraan/air mengalir",
    color: "#e5e874"
  }
];

export const tcpIpLayers = [
  {
    layer: 4,
    name: "Application",
    osiEquivalent: "Application (L7), Presentation (L6), Session (L5)",
    description: "Menggabungkan fungsi interaksi pengguna, pemformatan data, enkripsi, dan manajemen sesi ke dalam satu tingkat aplikasi tunggal.",
    protocols: ["HTTP/HTTPS", "DNS", "SSH", "FTP", "SMTP", "DHCP"],
    color: "#38c6d9"
  },
  {
    layer: 3,
    name: "Transport",
    osiEquivalent: "Transport (L4)",
    description: "Menyediakan layanan pengiriman data antarproses, segmentasi, flow control, dan port-based addressing.",
    protocols: ["TCP", "UDP"],
    color: "#79e0b5"
  },
  {
    layer: 2,
    name: "Internet",
    osiEquivalent: "Network (L3)",
    description: "Menangani pengalamatan logis (IP Address) dan perutean paket melintasi batasan jaringan otonom.",
    protocols: ["IP (IPv4/IPv6)", "ICMP", "ARP"],
    color: "#9fe49a"
  },
  {
    layer: 1,
    name: "Network Access (Link)",
    osiEquivalent: "Data Link (L2), Physical (L1)",
    description: "Mencakup media transmisi fisik, perangkat keras antarmuka, serta framing dan pengalamatan MAC.",
    protocols: ["Ethernet", "Wi-Fi", "Fiber", "PPP"],
    color: "#c2e783"
  }
];

export const topologies = {
  bus: {
    id: "bus",
    name: "Topologi Bus",
    kicker: "Jalur Tunggal",
    summary: "Semua perangkat (node) tersambung secara linier ke satu kabel tulang punggung (backbone cable) dengan terminator di kedua ujungnya.",
    pros: ["Hemat kabel dan biaya instalasi awal murah", "Sederhana untuk jaringan skala sangat kecil"],
    cons: ["Jika kabel backbone putus, seluruh jaringan lumpuh", "Rentan terhadap tabrakan data (collision)", "Sulit melacak letak kerusakan fisik"],
    useCase: "Jaringan kabel koaksial masa lalu (10BASE2), sistem sensor industri sederhana.",
    diagram: "bus"
  },
  star: {
    id: "star",
    name: "Topologi Star",
    kicker: "Paling Populer",
    summary: "Setiap perangkat terhubung langsung ke satu konsentrator pusat (seperti Switch atau Hub) menggunakan kabel terpisah.",
    pros: ["Mudah dipasang, dikelola, dan ditambahkan perangkat baru", "Jika satu kabel klien rusak, perangkat lain tetap berfungsi normal", "Mudah mendeteksi masalah"],
    cons: ["Jika Switch/Hub pusat mati, seluruh jaringan akan terputus", "Kebutuhan kabel lebih banyak dibanding Bus"],
    useCase: "Mayoritas jaringan LAN kantor, rumah, lab sekolah, dan warnet modern.",
    diagram: "star"
  },
  ring: {
    id: "ring",
    name: "Topologi Ring",
    kicker: "Cincin Tertutup",
    summary: "Perangkat terhubung membentuk lingkaran tertutup. Data mengalir ke satu arah (atau dua arah pada dual-ring) dari satu node ke node berikutnya.",
    pros: ["Aliran data teratur (tidak ada collision jika menggunakan token passing)", "Performa stabil saat beban kerja tinggi"],
    cons: ["Satu perangkat atau koneksi putus dapat menghentikan seluruh jaringan (pada single ring)", "Penambahan node mengganggu operasional"],
    useCase: "Teknologi lawas Token Ring, FDDI backbone serat optik di kampus berkecepatan tinggi.",
    diagram: "ring"
  },
  mesh: {
    id: "mesh",
    name: "Topologi Mesh",
    kicker: "Redundansi Tertinggi",
    summary: "Setiap perangkat terhubung langsung ke banyak perangkat lainnya (full mesh memiliki rumus N*(N-1)/2 koneksi).",
    pros: ["Redundansi penuh dan fault-tolerance luar biasa", "Tidak ada bottleneck lalu lintas data tunggal", "Privasi dan keamanan tinggi"],
    cons: ["Biaya kabel dan jumlah port antarmuka sangat mahal", "Pemasangan dan manajemen konfigurasi sangat rumit"],
    useCase: "Infrastruktur inti ISP, Data Center antar-router utama, jaringan militer/kritis.",
    diagram: "mesh"
  },
  hybrid: {
    id: "hybrid",
    name: "Topologi Hybrid",
    kicker: "Kombinasi Fleksibel",
    summary: "Menggabungkan dua atau lebih bentuk topologi yang berbeda (misalnya Star digabungkan dengan Bus atau Ring) untuk memenuhi kebutuhan skala besar.",
    pros: ["Fleksibel dan dapat diskalakan sesuai kebutuhan gedung/organisasi", "Dapat memanfaatkan kelebihan masing-masing jenis"],
    cons: ["Desain jaringan menjadi rumit", "Membutuhkan perangkat penghubung yang canggih"],
    useCase: "Jaringan universitas multi-gedung, perusahaan multi-lantai, penyedia jaringan ISP kota.",
    diagram: "hybrid"
  }
};

export const protocolComparison = {
  tcp: {
    name: "Transmission Control Protocol (TCP)",
    type: "Connection-Oriented",
    speed: "Sedang (ada overhead handshake & verifikasi)",
    reliability: "Sangat Tinggi (Guaranteed Delivery)",
    ordering: "Terurut (Paket disusun ulang sesuai sequence number)",
    flowControl: "Ya (Sliding Window)",
    errorChecking: "Checksum + Retransmission jika paket hilang (ACK/NACK)",
    headerSize: "20 - 60 bytes",
    idealFor: "Web browsing (HTTP/HTTPS), email (SMTP/IMAP), file transfer (FTP), remote access (SSH).",
    analogy: "Telepon interaktif: harus tersambung dulu ('Halo?', 'Halo, bisa dengar?'), lalu berbicara, dan jika terputus akan mengulang ucapan."
  },
  udp: {
    name: "User Datagram Protocol (UDP)",
    type: "Connectionless",
    speed: "Sangat Cepat & Ringan (Low Latency)",
    reliability: "Best-effort (Tidak ada jaminan sampai)",
    ordering: "Tidak Terurut (Bisa sampai acak)",
    flowControl: "Tidak ada",
    errorChecking: "Hanya Checksum sederhana (paket rusak langsung dibuang, tanpa retransmit)",
    headerSize: "Hanya 8 bytes konstan",
    idealFor: "Live video/audio streaming, game online real-time, DNS lookup, VoIP, broadcast/multicast.",
    analogy: "Siaran Radio atau Pengeras Suara: informasi terus dikirim, jika pendengar kehilangan 1 kata, siaran tidak diulang."
  }
};

export const commonPorts = [
  { port: 20, service: "FTP-DATA", transport: "TCP", category: "File Transfer", desc: "Mentransfer payload data file dalam koneksi FTP aktif." },
  { port: 21, service: "FTP", transport: "TCP", category: "File Transfer", desc: "Mengatur perintah kontrol, autentikasi user, dan navigasi direktori FTP." },
  { port: 22, service: "SSH", transport: "TCP", category: "Remote Access", desc: "Akses terminal jarak jauh terenkripsi secara aman dan transfer SFTP/SCP." },
  { port: 23, service: "Telnet", transport: "TCP", category: "Remote Access", desc: "Protokol terminal teks jarak jauh tidak terenkripsi (rentan disadap, kini digantikan SSH)." },
  { port: 25, service: "SMTP", transport: "TCP", category: "Email", desc: "Simple Mail Transfer Protocol untuk pengiriman email antar mail server." },
  { port: 53, service: "DNS", transport: "TCP / UDP", category: "Core Services", desc: "Domain Name System: menerjemahkan domain (google.com) ke IP. UDP untuk query cepat, TCP untuk zone transfer." },
  { port: 67, service: "DHCP Server", transport: "UDP", category: "Core Services", desc: "Dynamic Host Configuration Protocol server untuk alokasi IP otomatis ke klien." },
  { port: 68, service: "DHCP Client", transport: "UDP", category: "Core Services", desc: "Port penerima pesan penawaran DHCP pada perangkat klien." },
  { port: 69, service: "TFTP", transport: "UDP", category: "File Transfer", desc: "Trivial FTP yang sangat ringan untuk booting jaringan (PXE) dan backup firmware router." },
  { port: 80, service: "HTTP", transport: "TCP", category: "Web", desc: "Hypertext Transfer Protocol standar web plaintext tanpa enkripsi." },
  { port: 110, service: "POP3", transport: "TCP", category: "Email", desc: "Post Office Protocol 3 untuk mengunduh email dari server ke klien lokal." },
  { port: 123, service: "NTP", transport: "UDP", category: "Core Services", desc: "Network Time Protocol untuk sinkronisasi jam dan waktu presisi tinggi antarperangkat." },
  { port: 143, service: "IMAP", transport: "TCP", category: "Email", desc: "Internet Message Access Protocol untuk membaca dan menyinkronkan email secara real-time di server." },
  { port: 443, service: "HTTPS", transport: "TCP", category: "Web", desc: "HTTP over TLS/SSL untuk penjelajahan web aman dan terenkripsi." },
  { port: 3306, service: "MySQL / MariaDB", transport: "TCP", category: "Database", desc: "Koneksi database relasional open source paling populer di dunia." },
  { port: 5432, service: "PostgreSQL", transport: "TCP", category: "Database", desc: "Koneksi sistem basis data objek-relasional canggih PostgreSQL." },
  { port: 8080, service: "HTTP-Alt / Dev", transport: "TCP", category: "Web / Dev", desc: "Port alternatif umum untuk web server pengembangan lokal, proxy, atau Tomcat." }
];

export const ipClasses = [
  {
    class: "Kelas A",
    range: "1.0.0.0 s.d 126.255.255.255",
    firstOctet: "1 - 126",
    format: "Network . Host . Host . Host",
    defaultMask: "255.0.0.0 (/8)",
    maxNetworks: "126 jaringan",
    maxHosts: "16.777.214 host / jaringan",
    useFor: "Organisasi berskala raksasa / korporasi global"
  },
  {
    class: "Kelas B",
    range: "128.0.0.0 s.d 191.255.255.255",
    firstOctet: "128 - 191",
    format: "Network . Network . Host . Host",
    defaultMask: "255.255.0.0 (/16)",
    maxNetworks: "16.384 jaringan",
    maxHosts: "65.534 host / jaringan",
    useFor: "Perusahaan skala menengah hingga besar, universitas"
  },
  {
    class: "Kelas C",
    range: "192.0.0.0 s.d 223.255.255.255",
    firstOctet: "192 - 223",
    format: "Network . Network . Network . Host",
    defaultMask: "255.255.255.0 (/24)",
    maxNetworks: "2.097.152 jaringan",
    maxHosts: "254 host / jaringan",
    useFor: "Jaringan LAN lokal, kantor kecil, perumahan"
  },
  {
    class: "Kelas D",
    range: "224.0.0.0 s.d 239.255.255.255",
    firstOctet: "224 - 239",
    format: "Multicast Address",
    defaultMask: "Tidak ada (Multicasting)",
    maxNetworks: "Khusus",
    maxHosts: "Khusus",
    useFor: "Alamat pengiriman grup multicast (video streaming, routing updates)"
  },
  {
    class: "Kelas E",
    range: "240.0.0.0 s.d 255.255.255.255",
    firstOctet: "240 - 255",
    format: "Eksperimental",
    defaultMask: "Tidak ada (Reserved)",
    maxNetworks: "Khusus",
    maxHosts: "Khusus",
    useFor: "Kebutuhan riset dan eksperimen masa depan"
  }
];

export const privateIpRanges = [
  {
    cidr: "10.0.0.0/8",
    start: "10.0.0.0",
    end: "10.255.255.255",
    sourceClass: "Kelas A",
    totalIps: "16.777.216 IP",
    rfc: "RFC 1918",
    usage: "Jaringan perusahaan skala besar, data center privat, cloud VPC."
  },
  {
    cidr: "172.16.0.0/12",
    start: "172.16.0.0",
    end: "172.31.255.255",
    sourceClass: "Kelas B",
    totalIps: "1.048.576 IP (16 blok berturutan)",
    rfc: "RFC 1918",
    usage: "Jaringan kampus universitas, instansi pemerintah skala menengah."
  },
  {
    cidr: "192.168.0.0/16",
    start: "192.168.0.0",
    end: "192.168.255.255",
    sourceClass: "Kelas C",
    totalIps: "65.536 IP (256 blok kelas C)",
    rfc: "RFC 1918",
    usage: "Router Wi-Fi rumahan, kafe, warnet, dan kantor kecil."
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "Manakah lapisan OSI yang bertanggung jawab langsung untuk perutean (routing) dan pengalamatan logis seperti IP Address?",
    options: ["Lapisan Data Link (L2)", "Lapisan Network (L3)", "Lapisan Transport (L4)", "Lapisan Session (L5)"],
    answerIndex: 1,
    explanation: "Lapisan Network (Layer 3) bertanggung jawab untuk routing paket data antar jaringan yang berbeda menggunakan IP Address."
  },
  {
    id: 2,
    question: "Protokol transport manakah yang berorientasi koneksi (connection-oriented) dan menjamin keandalan pengiriman serta urutan data?",
    options: ["UDP", "IP", "TCP", "ICMP"],
    answerIndex: 2,
    explanation: "TCP (Transmission Control Protocol) menyediakan transmisi andal dengan 3-way handshake, acknowledgment penerimaan, dan pengurutan data."
  },
  {
    id: 3,
    question: "Pada topologi manakah kerusakan kabel utama (backbone) akan menyebabkan seluruh jaringan terputus seketika?",
    options: ["Topologi Bus", "Topologi Star", "Topologi Mesh", "Topologi Tree"],
    answerIndex: 0,
    explanation: "Topologi Bus mengandalkan satu kabel utama tunggal. Jika jalur utama ini putus, terminator hilang dan sinyal akan memantul sehingga seluruh node lumpuh."
  },
  {
    id: 4,
    question: "Nomor port standar yang digunakan oleh protokol HTTPS untuk komunikasi web terenkripsi adalah:",
    options: ["22", "80", "443", "8080"],
    answerIndex: 2,
    explanation: "Port 443 adalah port standar terdaftar untuk HTTPS (HTTP Secure) melalui TLS/SSL."
  },
  {
    id: 5,
    question: "Berapa bit panjang alamat MAC Address fisik pada kartu jaringan (NIC)?",
    options: ["32 bit", "48 bit", "64 bit", "128 bit"],
    answerIndex: 1,
    explanation: "MAC Address memiliki panjang 48 bit (6 oktet heksadesimal). 3 oktet pertama adalah OUI (identitas vendor pembuat) dan 3 oktet terakhir adalah nomor seri kartu."
  },
  {
    id: 6,
    question: "Di bawah ini yang merupakan rentang IP Private Kelas C sesuai standar RFC 1918 adalah:",
    options: ["10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255", "192.168.0.0 - 192.168.255.255", "169.254.0.0 - 169.254.255.255"],
    answerIndex: 2,
    explanation: "192.168.0.0/16 (192.168.0.0 s.d 192.168.255.255) adalah rentang alamat privat kelas C standar RFC 1918 yang umum dipakai pada router rumahan."
  },
  {
    id: 7,
    question: "Pada model TCP/IP yang terdiri dari 4 lapisan, fungsi dari lapisan Application mencakup fungsi lapisan OSI mana saja?",
    options: [
      "Hanya Application (L7)",
      "Application (L7) dan Presentation (L6)",
      "Application (L7), Presentation (L6), dan Session (L5)",
      "Transport (L4) dan Network (L3)"
    ],
    answerIndex: 2,
    explanation: "Lapisan Application pada TCP/IP menggabungkan tiga lapisan teratas model OSI, yaitu Application, Presentation, dan Session."
  },
  {
    id: 8,
    question: "Jika sebuah subnet menggunakan prefix CIDR /24 (255.255.255.0), berapa jumlah host usable (yang dapat digunakan oleh perangkat) per subnet?",
    options: ["256 host", "254 host", "128 host", "512 host"],
    answerIndex: 1,
    explanation: "Dengan 8 bit host, total IP adalah 2^8 = 256. Dua alamat dicadangkan untuk Network ID dan Broadcast ID, sehingga host usable adalah 256 - 2 = 254."
  }
];

export const slidePresentationData = [
  {
    id: 1,
    kicker: "01 · Pengantar",
    title: "Dasar Jaringan Komputer",
    subtitle: "Bagaimana perangkat saling terhubung, bertukar data, dan menemukan layanan di dalam sebuah jaringan?",
    cards: [
      { num: "01", title: "Protokol", desc: "Aturan komunikasi antarperangkat." },
      { num: "02", title: "Topologi", desc: "Susunan hubungan fisik dan logis antarperangkat." },
      { num: "03", title: "Alamat & Port", desc: "Identitas unik perangkat serta pintu menuju layanan." }
    ],
    callout: "Jaringan komputer adalah kumpulan perangkat yang saling terhubung dan dapat berinteraksi, misalnya dengan mengirim atau menerima data.",
    footer: "Training Network RisTIE 2026"
  },
  {
    id: 2,
    kicker: "02 · Protokol Jaringan",
    title: "Mengapa Perlu Protokol?",
    subtitle: "Protokol adalah aturan atau prosedur yang mengatur bagaimana data dikirim dan diterima. Tanpa aturan bersama, perangkat berbeda tidak dapat berkomunikasi.",
    cards: [
      { num: "A", title: "Masalah yang Diatasi", desc: "Sebelum standardisasi, tiap vendor memakai protokol sendiri sehingga hubungan antarjaringan sangat sulit." },
      { num: "B", title: "Standarisasi", desc: "Model OSI dikembangkan ISO untuk menyediakan kerangka komunikasi terbuka yang dipahami lintas sistem." }
    ],
    callout: "Dua model utama untuk memahami komunikasi jaringan: Model OSI (7 lapisan) dan Model TCP/IP (4 lapisan)."
  },
  {
    id: 3,
    kicker: "03 · Model OSI",
    title: "Model OSI: 7 Lapisan",
    subtitle: "Open Systems Interconnection membagi alur komunikasi menjadi 7 tahapan terpisah dari fisik hingga aplikasi.",
    interactiveType: "osi"
  },
  {
    id: 4,
    kicker: "04 · Model TCP/IP",
    title: "Model TCP/IP: 4 Lapisan",
    subtitle: "Standar nyata internet global: TCP menangani keandalan transfer data, dan IP menangani pengalamatan serta perutean.",
    interactiveType: "tcpip"
  },
  {
    id: 5,
    kicker: "05 · Topologi Jaringan",
    title: "Bagaimana Perangkat Disusun?",
    subtitle: "Topologi menggambarkan susunan fisik atau logis dari komputer, switch, router, server, dan kabel.",
    interactiveType: "topoSvgGeneral"
  },
  {
    id: 6,
    kicker: "06 · Jenis Topologi",
    title: "Lima Bentuk Topologi Utama",
    subtitle: "Bentuk susunan Bus, Star, Ring, Mesh, dan Hybrid memiliki kelebihan dan kekurangannya masing-masing.",
    interactiveType: "topologies"
  },
  {
    id: 7,
    kicker: "07 · Protokol Transport",
    title: "TCP atau UDP?",
    subtitle: "Keduanya beroperasi di Layer Transport, tetapi memiliki mekanisme dan prioritas performa yang berlawanan.",
    interactiveType: "tcpVsUdp"
  },
  {
    id: 8,
    kicker: "08 · Nomor Port",
    title: "Port: Pintu Menuju Layanan",
    subtitle: "Port mengidentifikasi aplikasi atau proses tertentu dalam satu komputer. Rentang nomor port 0 s.d 65.535 (16-bit).",
    cards: [
      { num: "0–1023", title: "Well-Known Ports", desc: "Rentang port standar sistem dan layanan protokol populer (HTTP, SSH, DNS)." },
      { num: "1024–49151", title: "Registered Ports", desc: "Rentang port terdaftar oleh vendor aplikasi seperti database (MySQL 3306)." },
      { num: "49152–65535", title: "Dynamic / Private", desc: "Port ephemeral sementara yang dialokasikan oleh OS untuk koneksi outbound." }
    ],
    callout: "Analogi: IP Address adalah alamat gedung kantor, sedangkan Port adalah nomor kamar/ruangan tempat layanan spesifik berada."
  },
  {
    id: 9,
    kicker: "09 · Port Umum",
    title: "Daftar Port Populer yang Sering Ditemui",
    subtitle: "Tabel referensi cepat port, protokol transport, dan fungsi operasionalnya.",
    interactiveType: "portTable"
  },
  {
    id: 10,
    kicker: "10 · Network Address",
    title: "MAC Address vs IP Address",
    subtitle: "Identitas fisik perangkat keras (Layer 2) berdampingan dengan alamat logis perutean global (Layer 3).",
    cards: [
      { num: "MAC", title: "Identitas Fisik (L2)", desc: "48-bit hex (contoh: 00-B0-D0-63-C2-26). Melekat pada Network Interface Card (NIC) dan unik di dunia." },
      { num: "IP", title: "Identitas Logis (L3)", desc: "IPv4 32-bit (contoh: 192.168.1.1) atau IPv6 128-bit. Dapat diubah dan menentukan lokasi perangkat di jaringan." }
    ],
    callout: "MAC Address seperti Nomor KTP/Sidik Jari perangkat keras, sedangkan IP Address seperti Alamat Rumah atau Alamat Pengiriman surat."
  },
  {
    id: 11,
    kicker: "11 · Pengalamatan IPv4 & CIDR",
    title: "Dari Kelas IP ke CIDR (RFC 4632)",
    subtitle: "Evolusi pengalamatan jaringan untuk efisiensi ruang alamat IP global dan lokal.",
    interactiveType: "ipClassTable"
  },
  {
    id: 12,
    kicker: "12 · Penutup & Rangkuman",
    title: "Menyatukan Konsep Jaringan",
    subtitle: "Setiap komponen dalam jaringan bekerja selaras untuk mewujudkan pertukaran data yang cepat, andal, dan aman.",
    cards: [
      { num: "OSI & TCP/IP", title: "Standar Komunikasi", desc: "Panduan lapisan agar perangkat multibahasa bisa saling memahami." },
      { num: "Topologi", title: "Arsitektur Fisik", desc: "Struktur jalur kabel atau nirkabel yang menghubungkan setiap node." },
      { num: "Alamat & Port", title: "Navigasi & Tujuan", desc: "Memastikan data sampai ke mesin yang tepat dan aplikasi yang benar." }
    ],
    callout: "Jaringan komputer bukan hanya menghubungkan perangkat, tetapi juga membutuhkan aturan, struktur, identitas, dan mekanisme yang terorganisir.",
    footer: "Sumber: Modul Jaringan Komputer — Training RisTIE 2026"
  }
];


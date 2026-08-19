/**
 * ===================================================================
 * CYBER-PORTFOLIO DATA CONFIGURATION (js/data.js)
 * ===================================================================
 * Anda dapat mengubah semua data di file ini sesuai profil asli Anda.
 * Data di bawah ini sudah disiapkan dengan persona Mahasiswa PGSD
 * yang antusias terhadap dunia teknologi & pengembangan web (EdTech).
 */

const PORTFOLIO_DATA = {
  // Informasi Pribadi & Identitas
  profile: {
    name: "Mukhlisin Nur Said",
    nickname: "Said",
    roleTitle: "PGSD Educator & Creative Technologist",
    tagline: "Membawa Masa Depan Pembelajaran Melalui Sentuhan Teknologi & Kreativitas",
    shortBio: "Mahasiswa Pendidikan Guru Sekolah Dasar (PGSD) di Universitas Muhammadiyah OKU Timur yang antusias dalam merancang media pembelajaran interaktif, gamifikasi edukasi, dan antarmuka web modern.",
    location: "Belitang, OKU Timur, Indonesia",
    statusBadge: "OPEN FOR EDTECH COLLABORATION & PROJECTS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", // placeholder avatar futuristik
    cvDownloadUrl: "#", // ganti dengan link download CV Anda jika ada
    stats: [
      { label: "Interactive EdTech Projects", value: "12+", suffix: "" },
      { label: "Students / Learners Impacted", value: "350+", suffix: "Siswa" },
      { label: "Lines of Code & Creative Logic", value: "25K+", suffix: "" },
      { label: "Educational Prototypes Built", value: "8", suffix: "Apps" }
    ]
  },

  // Bento Grid: Highlight Cerita & Nilai Inti
  bentoHighlights: [
    {
      id: "pedagogy-tech",
      badge: "PHILOSOPHY",
      title: "Pedagogi Bertemu Teknologi",
      desc: "Memadukan teori pembelajaran anak sekolah dasar dengan estetika UI/UX mutakhir untuk menciptakan proses belajar yang menyenangkan dan tidak membosankan.",
      icon: "graduation-cap",
      accent: "cyan",
      size: "large"
    },
    {
      id: "gamification",
      badge: "APPROACH",
      title: "Gamifikasi Interaktif",
      desc: "Merancang logika kuis, petualangan belajar, dan visual animasi yang memicu rasa ingin tahu siswa.",
      icon: "gamepad-2",
      accent: "purple",
      size: "small"
    },
    {
      id: "creative-code",
      badge: "DEVELOPMENT",
      title: "Clean & Modern Web",
      desc: "Membangun web yang responsif, cepat diakses di perangkat apapun, dan beranimasi halus.",
      icon: "code",
      accent: "emerald",
      size: "small"
    }
  ],

  // Kategori & Daftar Skill
  skillCategories: [
    {
      id: "all",
      name: "All Skills"
    },
    {
      id: "edtech",
      name: "EdTech & Pedagogy"
    },
    {
      id: "frontend",
      name: "Web & Tech Stack"
    },
    {
      id: "multimedia",
      name: "Creative & Multimedia"
    },
    {
      id: "tools",
      name: "Tools & Workflow"
    }
  ],

  skills: [
    // EdTech & Pedagogy
    { name: "Desain Pembelajaran Interaktif", category: "edtech", level: 90, icon: "sparkles", highlight: true },
    { name: "Gamifikasi Edukasi (Quiz & Quest)", category: "edtech", level: 88, icon: "gamepad-2", highlight: true },
    { name: "Pengembangan Media Ajar Digital", category: "edtech", level: 92, icon: "book-open", highlight: false },
    { name: "Psikologi Pembelajaran Dasar", category: "edtech", level: 85, icon: "heart-handshake", highlight: false },
    
    // Frontend & Web
    { name: "HTML5 / Semantic Web", category: "frontend", level: 92, icon: "file-code", highlight: false },
    { name: "Modern CSS / Tailwind CSS", category: "frontend", level: 88, icon: "palette", highlight: true },
    { name: "JavaScript (ES6+) / TypeScript", category: "frontend", level: 82, icon: "cpu", highlight: true },
    { name: "React & Component-Driven UI", category: "frontend", level: 78, icon: "layers", highlight: true },
    { name: "Interactive Canvas & Animation", category: "frontend", level: 75, icon: "activity", highlight: false },

    // Multimedia & Creative
    { name: "UI/UX Prototyping (Figma)", category: "multimedia", level: 86, icon: "layout", highlight: true },
    { name: "Digital Storytelling & Canva", category: "multimedia", level: 90, icon: "image", highlight: false },
    { name: "Audio-Visual Editing", category: "multimedia", level: 80, icon: "video", highlight: false },

    // Tools & Workflow
    { name: "Git & GitHub", category: "tools", level: 80, icon: "git-branch", highlight: false },
    { name: "VS Code & Cyber Dev Tools", category: "tools", level: 85, icon: "terminal", highlight: false },
    { name: "AI Prompting for Education", category: "tools", level: 90, icon: "bot", highlight: true }
  ],

  // Daftar Proyek Unggulan (Dummy data yang realistis dan futuristik)
  projectCategories: [
    { id: "all", name: "Semua Proyek" },
    { id: "edtech", name: "EdTech & LMS" },
    { id: "gamification", name: "Game Pembelajaran" },
    { id: "web-apps", name: "Web Application" }
  ],

  projects: [
    {
      id: "eduquest-lms",
      title: "EduQuest: Cyber Learning Platform",
      category: "edtech",
      categoryName: "EdTech & LMS",
      tagline: "Platform e-learning berbasis misi petualangan luar angkasa untuk siswa SD kelas 4-6.",
      description: "EduQuest menggabungkan materi tematik sekolah dasar dengan visual dashboard cyberpunk. Siswa menyelesaikan modul pelajaran seperti menuntaskan 'Misi Galaksi' yang memberikan lencana reward dan poin EXP.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Tailwind CSS", "Gamification", "Firebase"],
      features: [
        "Dashboard siswa dengan rank EXP & level galaksi",
        "Kuis interaktif dengan efek audio sci-fi dan timer real-time",
        "Panel pantauan guru untuk menganalisis pemahaman materi siswa",
        "Responsif di smartphone, tablet, dan Chromebook kelas"
      ],
      liveUrl: "https://example.com/demo/eduquest",
      githubUrl: "https://github.com/example/eduquest-lms",
      featured: true,
      color: "cyan"
    },
    {
      id: "cyber-math-quest",
      title: "NeonMath: Penjelajah Angka Interaktif",
      category: "gamification",
      categoryName: "Game Pembelajaran",
      tagline: "Game logika matematika dasar dengan visual neon dan tantangan bertingkat.",
      description: "Aplikasi berbasis web untuk melatih operasi hitung cepat perkalian dan pecahan. Dilengkapi visual efek laser dan partikel yang membuat matematika terasa seru layaknya game arcade masa depan.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
      tags: ["HTML5 Canvas", "JavaScript", "Web Audio API", "CSS3"],
      features: [
        "Animasi partikel neon saat menjawab dengan benar",
        "Sistem streak skor combo dan sound effect synth",
        "Tersedia level adaptif sesuai kemampuan anak",
        "Mode offline untuk pembelajaran di daerah minim internet"
      ],
      liveUrl: "https://example.com/demo/neonmath",
      githubUrl: "https://github.com/example/neon-math-quest",
      featured: true,
      color: "purple"
    },
    {
      id: "smart-story-ebook",
      title: "KisahNusantara: E-Book Cerita Rakyat 3D",
      category: "edtech",
      categoryName: "EdTech & LMS",
      tagline: "Buku cerita interaktif dengan audio narasi cerdas dan ilustrasi hidup untuk literasi dini.",
      description: "Inisiatif digitalisasi cerita rakyat Indonesia yang dikemas dalam bentuk e-book interaktif. Anak-anak dapat mengklik karakter cerita untuk memunculkan animasi, suara, dan kuis nilai moral di akhir cerita.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
      tags: ["Vue.js", "GSAP Animation", "Figma", "Digital Storytelling"],
      features: [
        "Efek perpindahan halaman 3D yang halus (*smooth page-turn*)",
        "Audio voiceover multibahasa (Bahasa Indonesia & Daerah)",
        "Mini-puzzle karakter untuk melatih daya ingat anak",
        "Modul tanya-jawab pemahaman bacaan interaktif"
      ],
      liveUrl: "https://example.com/demo/kisahnusantara",
      githubUrl: "https://github.com/example/kisah-nusantara-3d",
      featured: false,
      color: "emerald"
    },
    {
      id: "teacher-matrix-portal",
      title: "EduMatrix: Guru & Evaluasi Hub",
      category: "web-apps",
      categoryName: "Web Application",
      tagline: "Sistem otomasi rekapitulasi penilaian rubrik kurikulum merdeka dan generator RPP berbasis AI.",
      description: "Prototipe web app untuk membantu calon guru dan guru sekolah dasar mengelola asesmen formatif-sumatif secara instan serta menyusun rencana pembelajaran dengan asisten template digital.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Chart.js", "Node.js API", "Tailwind CSS"],
      features: [
        "Kalkulator nilai otomatis berstandar Kurikulum Merdeka",
        "Grafik radar capaian kompetensi tiap peserta didik",
        "Export laporan format PDF dan spreadsheet satu klik",
        "Dark mode interface dengan glow indicator status"
      ],
      liveUrl: "https://example.com/demo/edumatrix",
      githubUrl: "https://github.com/example/edumatrix-portal",
      featured: true,
      color: "cyan"
    }
  ],

  // Riwayat Perjalanan (Timeline)
  timeline: [
    {
      year: "2024 - Sekarang",
      role: "Eksplorasi Web Development & Creative Coding",
      organization: "Personal Lab & Komunitas Tech",
      description: "Mengembangkan berbagai prototipe aplikasi edukasi, mendalami JavaScript modern, canvas animations, dan integrasi UI/UX futuristik ke dalam media ajar.",
      icon: "code",
      tag: "Coding & Innovation"
    },
    {
      year: "2023 - 2024",
      role: "Pengembangan Media Pembelajaran Digital SD",
      organization: "Proyek Akademik PGSD",
      description: "Merancang modul gamifikasi matematika dan sains untuk peserta didik sekolah dasar dengan respon positif dan peningkatan antusiasme belajar lebih dari 40%.",
      icon: "sparkles",
      tag: "Research & Design"
    },
    {
      year: "2022 - Masuk Kuliah",
      role: "Mahasiswa S1 Pendidikan Guru Sekolah Dasar (PGSD)",
      organization: "Universitas Muhammadiyah OKU Timur",
      description: "Mempelajari dasar-dasar pedagogi, psikologi anak, metodologi pengajaran, dan menemukan ketertarikan kuat dalam menghubungkan pendidikan dengan teknologi modern.",
      icon: "graduation-cap",
      tag: "Academic Foundation"
    }
  ],

  // Kontak & Sosial Media
  contact: {
    email: "said.edutech@example.com",
    whatsapp: "+6287740193089",
    whatsappDisplay: "0877 4019 3089",
    telegram: "caknur286",
    github: "https://github.com/caknur286",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com/caknur_286",
    location: "Belitang, OKU Timur, Indonesia"
  },

  // Perintah Terminal Interaktif (Easter Egg)
  terminalCommands: {
    help: "Perintah tersedia: 'about', 'skills', 'projects', 'contact', 'role', 'clear', 'matrix', 'quote'",
    about: "Mukhlisin Nur Said (Said) — Mahasiswa PGSD Universitas Muhammadiyah OKU Timur yang menyukai dunia coding & menciptakan inovasi EdTech futuristik.",
    role: "Spesialisasi: EdTech Product Designer, Gamified Media Creator, and Frontend Enthusiast.",
    skills: "Daftar Skill: HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React, Interactive Canvas, Figma, Gamifikasi Pembelajaran.",
    projects: "Proyek Aktif: 1. EduQuest LMS | 2. NeonMath Arcade | 3. KisahNusantara 3D | 4. EduMatrix Portal.",
    contact: "Email: said.edutech@example.com | WA: 0877 4019 3089 | GitHub: github.com/caknur286 | IG: @caknur_286",
    matrix: "Wake up, Neo... Dunia pendidikan masa depan sedang dibangun di depan matamu. 🚀",
    quote: "\"Pendidikan bukan hanya mengisi wadah, melainkan menyalakan api rasa ingin tahu.\" — William Butler Yeats"
  }
};

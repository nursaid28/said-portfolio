/**
 * ===================================================================
 * MAIN.JS - Cyber Portfolio Controller & Interactive Features
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProfileData();
  initBentoGrid();
  initSkillsSection();
  initProjectsSection();
  initTimeline();
  initContactSection();
  initTerminal();
  initCustomCursor();
  initScrollSpyAndNav();
  initScrollAnimations();
  initCardSpotlightAndTilt();
  initTypewriter();
  initSoundHooks();

  // Re-run lucide icons to replace <i> elements with svg
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* -------------------------------------------------------------------
 * 1. Profile & Hero Initialization
 * ------------------------------------------------------------------- */
function initProfileData() {
  const p = PORTFOLIO_DATA.profile;

  // Name & Nickname
  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = p.name;

  const navLogo = document.getElementById('nav-logo-text');
  if (navLogo) navLogo.textContent = p.nickname.toUpperCase();

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = p.tagline;

  const heroBio = document.getElementById('hero-bio');
  if (heroBio) heroBio.textContent = p.shortBio;

  const statusBadge = document.getElementById('status-badge-text');
  if (statusBadge) statusBadge.textContent = p.statusBadge;

  // Stats Counter
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer && p.stats) {
    statsContainer.innerHTML = p.stats.map(stat => `
      <div class="cyber-glass p-4 text-center rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all">
        <div class="text-2xl lg:text-3xl font-orbitron font-bold text-cyan-400 text-glow-cyan">${stat.value}</div>
        <div class="text-xs uppercase tracking-wider text-slate-400 font-rajdhani mt-1">${stat.label}</div>
      </div>
    `).join('');
  }
}

/* -------------------------------------------------------------------
 * 2. Typewriter Effect in Hero Subtitle
 * ------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const words = [
    "Mahasiswa PGSD UM OKU Timur",
    "EdTech & Gamification Developer",
    "Creative Web & UI/UX Enthusiast",
    "Membangun Media Ajar Masa Depan"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delta = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delta = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delta = 400;
    }

    setTimeout(type, delta);
  }

  type();
}

/* -------------------------------------------------------------------
 * 3. Bento Grid Section (About Me Highlights)
 * ------------------------------------------------------------------- */
function initBentoGrid() {
  const container = document.getElementById('bento-grid-container');
  if (!container || !PORTFOLIO_DATA.bentoHighlights) return;

  container.innerHTML = PORTFOLIO_DATA.bentoHighlights.map((item, idx) => {
    const colorMap = {
      cyan: { border: 'hover:border-cyan-400/50', glow: 'text-cyan-400', badge: 'badge-neon-cyan', iconBg: 'bg-cyan-500/10 text-cyan-400' },
      purple: { border: 'hover:border-purple-400/50', glow: 'text-purple-400', badge: 'badge-neon-purple', iconBg: 'bg-purple-500/10 text-purple-400' },
      emerald: { border: 'hover:border-emerald-400/50', glow: 'text-emerald-400', badge: 'badge-neon-emerald', iconBg: 'bg-emerald-500/10 text-emerald-400' }
    };
    const c = colorMap[item.accent] || colorMap.cyan;
    const colSpan = item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1';

    return `
      <div class="cyber-card ${colSpan} p-6 lg:p-8 rounded-2xl flex flex-col justify-between ${c.border} transition-all duration-300">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs px-3 py-1 rounded-full font-mono font-semibold ${c.badge}">
              ${item.badge}
            </span>
            <div class="w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center border border-white/5">
              <i data-lucide="${item.icon}" class="w-5 h-5"></i>
            </div>
          </div>
          <h3 class="text-xl font-orbitron font-bold text-white mb-2">${item.title}</h3>
          <p class="text-slate-300 text-sm leading-relaxed">${item.desc}</p>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span class="w-2 h-2 rounded-full ${item.accent === 'cyan' ? 'bg-cyan-400' : item.accent === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'}"></span>
          <span>CORE_MODULE_0${idx + 1} :: ACTIVE</span>
        </div>
      </div>
    `;
  }).join('');
}

/* -------------------------------------------------------------------
 * 4. Interactive Skills Matrix & Filtering
 * ------------------------------------------------------------------- */
let activeSkillCategory = 'all';

function initSkillsSection() {
  const tabsContainer = document.getElementById('skill-tabs');
  const listContainer = document.getElementById('skills-grid-container');
  if (!tabsContainer || !listContainer) return;

  // Render Filter Tabs
  tabsContainer.innerHTML = PORTFOLIO_DATA.skillCategories.map(cat => `
    <button 
      class="skill-tab-btn px-4 py-2 rounded-xl text-xs md:text-sm font-rajdhani font-semibold tracking-wider transition-all cursor-pointer ${cat.id === activeSkillCategory ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'}"
      data-category="${cat.id}">
      ${cat.name}
    </button>
  `).join('');

  // Tab Click Events
  tabsContainer.querySelectorAll('.skill-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      activeSkillCategory = btn.getAttribute('data-category');
      initSkillsSection();
    });
  });

  // Filter skills
  const filtered = activeSkillCategory === 'all'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter(s => s.category === activeSkillCategory);

  // Render Skills Grid
  listContainer.innerHTML = filtered.map(skill => `
    <div class="cyber-card p-5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <i data-lucide="${skill.icon}" class="w-4 h-4"></i>
          </div>
          <div>
            <h4 class="font-rajdhani font-bold text-base text-white">${skill.name}</h4>
            <span class="text-[11px] font-mono uppercase text-slate-400">${skill.category}</span>
          </div>
        </div>
        <span class="text-xs font-mono font-bold text-cyan-400">${skill.level}%</span>
      </div>
      
      <!-- Glowing Progress Bar -->
      <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-[1px]">
        <div 
          class="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-1000 ease-out" 
          style="width: ${skill.level}%">
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  initCardSpotlightAndTilt();
  refreshCursorHover();
}

/* -------------------------------------------------------------------
 * 5. Featured Projects & Modal Viewer
 * ------------------------------------------------------------------- */
let activeProjectCategory = 'all';

function initProjectsSection() {
  const tabsContainer = document.getElementById('project-tabs');
  const gridContainer = document.getElementById('projects-grid-container');
  if (!tabsContainer || !gridContainer) return;

  // Render Tabs
  tabsContainer.innerHTML = PORTFOLIO_DATA.projectCategories.map(cat => `
    <button 
      class="project-tab-btn px-4 py-2 rounded-xl text-xs md:text-sm font-rajdhani font-semibold tracking-wider transition-all cursor-pointer ${cat.id === activeProjectCategory ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'}"
      data-category="${cat.id}">
      ${cat.name}
    </button>
  `).join('');

  // Tab Events
  tabsContainer.querySelectorAll('.project-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.cyberAudio) window.cyberAudio.playClick();
      activeProjectCategory = btn.getAttribute('data-category');
      initProjectsSection();
    });
  });

  // Filter Projects
  const filtered = activeProjectCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeProjectCategory);

  // Render Project Cards
  gridContainer.innerHTML = filtered.map(p => `
    <div class="cyber-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800/80 hover:border-cyan-400/50 transition-all duration-300" data-tilt>
      <div>
        <!-- Card Image & Overlay -->
        <div class="relative h-48 sm:h-56 overflow-hidden bg-slate-950">
          <img 
            src="${p.image}" 
            alt="${p.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <span class="absolute top-4 left-4 text-xs font-mono px-3 py-1 rounded-full badge-neon-cyan backdrop-blur-md">
            ${p.categoryName}
          </span>
        </div>

        <!-- Card Content -->
        <div class="p-6">
          <h3 class="text-xl font-orbitron font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            ${p.title}
          </h3>
          <p class="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
            ${p.tagline}
          </p>

          <!-- Tech Pills -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${p.tags.map(tag => `
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-slate-800">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="px-6 pb-6 pt-2 border-t border-slate-900/90 flex items-center justify-between gap-3">
        <button 
          onclick="openProjectModal('${p.id}')"
          class="btn-cyber-outline text-xs px-3.5 py-2 flex-1 justify-center rounded-lg">
          <i data-lucide="info" class="w-3.5 h-3.5"></i> Detail & Fitur
        </button>
        <a 
          href="${p.liveUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-cyber-primary text-xs px-3.5 py-2 flex-1 justify-center rounded-lg">
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Live Demo
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  initCardSpotlightAndTilt();
  refreshCursorHover();
}

/* Modal Controller */
window.openProjectModal = function(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  if (window.cyberAudio) window.cyberAudio.playModal();

  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative rounded-2xl bg-slate-950 border border-cyan-500/40 p-6 md:p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(0,240,255,0.2)] max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
      <button 
        onclick="closeProjectModal()" 
        class="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 p-2 rounded-lg bg-slate-900 border border-slate-800 transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="mb-4">
        <span class="text-xs font-mono px-3 py-1 rounded-full badge-neon-cyan">${project.categoryName}</span>
      </div>

      <h2 class="text-2xl font-orbitron font-bold text-white mb-2 text-glow-cyan">${project.title}</h2>
      <p class="text-cyan-300/80 font-rajdhani text-base mb-6">${project.tagline}</p>

      <div class="rounded-xl overflow-hidden mb-6 border border-slate-800 h-60">
        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" />
      </div>

      <h4 class="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">// Deskripsi Proyek</h4>
      <p class="text-slate-300 text-sm leading-relaxed mb-6">${project.description}</p>

      <h4 class="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3">// Fitur Unggulan</h4>
      <ul class="space-y-2 mb-6">
        ${project.features.map(f => `
          <li class="flex items-start gap-2.5 text-sm text-slate-300">
            <span class="text-cyan-400 mt-0.5">▹</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>

      <h4 class="text-sm font-mono uppercase tracking-wider text-slate-400 mb-2">// Tech Stack</h4>
      <div class="flex flex-wrap gap-2 mb-8">
        ${project.tags.map(tag => `
          <span class="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-cyan-400 border border-cyan-500/30">
            ${tag}
          </span>
        `).join('')}
      </div>

      <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
        <a href="${project.liveUrl}" target="_blank" class="btn-cyber-primary text-sm flex-1 justify-center">
          <i data-lucide="external-link" class="w-4 h-4"></i> Buka Demo Live
        </a>
        <a href="${project.githubUrl}" target="_blank" class="btn-cyber-outline text-sm flex-1 justify-center">
          <i data-lucide="github" class="w-4 h-4"></i> Source Code
        </a>
      </div>
    </div>
  `;

  modalBackdrop.classList.remove('hidden');
  modalBackdrop.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) lucide.createIcons();
  refreshCursorHover();
};

window.closeProjectModal = function() {
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.add('hidden');
    modalBackdrop.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// Global Escape Key and Backdrop Click to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }
});

/* -------------------------------------------------------------------
 * 6. Education & Tech Journey Timeline
 * ------------------------------------------------------------------- */
function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container || !PORTFOLIO_DATA.timeline) return;

  container.innerHTML = PORTFOLIO_DATA.timeline.map((item, idx) => `
    <div class="relative pl-8 md:pl-10 pb-10 border-l border-cyan-500/30 last:pb-0 group">
      <!-- Glowing Node Indicator -->
      <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:border-purple-400 shadow-[0_0_10px_rgba(0,240,255,0.6)] group-hover:shadow-[0_0_15px_rgba(176,38,255,0.8)] transition-all"></div>

      <div class="cyber-glass p-6 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="text-xs font-mono px-3 py-0.5 rounded-full badge-neon-cyan">${item.year}</span>
          <span class="text-xs font-mono text-purple-400">// ${item.tag}</span>
        </div>
        <h4 class="text-lg font-orbitron font-bold text-white mb-1">${item.role}</h4>
        <p class="text-sm font-rajdhani font-semibold text-cyan-300/80 mb-3">${item.organization}</p>
        <p class="text-sm text-slate-300 leading-relaxed">${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------
 * 7. Interactive Cyber Terminal Console
 * ------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const runBtn = document.getElementById('terminal-run-btn');
  const chipButtons = document.querySelectorAll('.terminal-chip-btn');

  if (!input || !output) return;

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (window.cyberAudio) window.cyberAudio.playKeystroke();

    if (cmd === 'clear') {
      output.innerHTML = `
        <div class="text-slate-400">Cyber Terminal [Version 2.4.0-PGSD-EDTECH]</div>
        <div class="text-slate-500">Ketik <span class="text-cyan-400 font-semibold">'help'</span> untuk daftar perintah sistem.</div>
        <div class="my-2 border-b border-slate-800"></div>
      `;
      input.value = '';
      return;
    }

    const commandResponse = PORTFOLIO_DATA.terminalCommands[cmd] || 
      `Perintah tidak dikenal: '${cmd}'. Ketik 'help' untuk panduan perintah.`;

    const cmdEntry = document.createElement('div');
    cmdEntry.className = 'mb-2';
    cmdEntry.innerHTML = `
      <div class="flex items-center gap-2 text-cyan-400">
        <span class="text-purple-400">guest@cyber-portfolio:~$</span>
        <span>${rawCmd}</span>
      </div>
      <div class="text-slate-300 text-xs md:text-sm pl-4 mt-1 leading-relaxed ${cmd === 'matrix' ? 'text-emerald-400 font-semibold text-glow-emerald' : ''}">${commandResponse}</div>
    `;

    output.appendChild(cmdEntry);
    output.scrollTop = output.scrollHeight;
    input.value = '';
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
    }
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      executeCommand(input.value);
    });
  }

  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-command');
      input.value = command;
      executeCommand(command);
    });
  });
}

/* -------------------------------------------------------------------
 * 8. Contact Section & Interactive Form
 * ------------------------------------------------------------------- */
function initContactSection() {
  const c = PORTFOLIO_DATA.contact;

  const emailText = document.getElementById('contact-email-text');
  if (emailText) emailText.textContent = c.email;

  const waText = document.getElementById('contact-wa-text');
  if (waText) waText.textContent = c.whatsappDisplay || c.whatsapp;

  const waLink = document.getElementById('contact-wa-link');
  if (waLink) waLink.href = `https://wa.me/${c.whatsapp.replace(/\+/g, '')}`;

  const mailLink = document.getElementById('contact-mail-link');
  if (mailLink) mailLink.href = `mailto:${c.email}`;

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(c.email).then(() => {
        if (window.cyberAudio) window.cyberAudio.playSuccess();
        const copyLabel = document.getElementById('copy-email-label');
        if (copyLabel) {
          copyLabel.textContent = 'TERSALIN!';
          setTimeout(() => { copyLabel.textContent = 'SALIN EMAIL'; }, 2000);
        }
      });
    });
  }

  // Form Submit Handler
  const contactForm = document.getElementById('contact-form');
  const alertContainer = document.getElementById('form-feedback-alert');

  if (contactForm && alertContainer) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          MENGIRIM PESAN KE KONSOL...
        `;
      }

      setTimeout(() => {
        if (window.cyberAudio) window.cyberAudio.playSuccess();

        alertContainer.innerHTML = `
          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs md:text-sm flex items-center gap-3">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
            <span>Pesan transmisi berhasil dikirim! Saya akan segera merespons via email/WhatsApp.</span>
          </div>
        `;
        alertContainer.classList.remove('hidden');

        if (window.lucide) lucide.createIcons();

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <i data-lucide="send" class="w-4 h-4"></i> TRANSMIT MESSAGE
          `;
          if (window.lucide) lucide.createIcons();
        }
      }, 1000);
    });
  }
}

/* -------------------------------------------------------------------
 * 9. Custom Cyber Cursor
 * ------------------------------------------------------------------- */
function refreshCursorHover() {
  if (window.innerWidth < 1024) return;
  const hoverElements = 'a, button, input, textarea, .cyber-card, .skill-tab-btn, .project-tab-btn';
  document.querySelectorAll(hoverElements).forEach(el => {
    el.removeEventListener('mouseenter', onCursorEnter);
    el.removeEventListener('mouseleave', onCursorLeave);
    el.addEventListener('mouseenter', onCursorEnter);
    el.addEventListener('mouseleave', onCursorLeave);
  });
}

function onCursorEnter() {
  document.body.classList.add('cursor-hover');
}

function onCursorLeave() {
  document.body.classList.remove('cursor-hover');
}

function initCustomCursor() {
  if (window.innerWidth < 1024) return; // Desktop only

  const dot = document.createElement('div');
  dot.className = 'cyber-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'cyber-cursor-ring';
  document.body.appendChild(ring);

  window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  refreshCursorHover();
}

/* -------------------------------------------------------------------
 * 10. ScrollSpy & Floating Dock Navigation
 * ------------------------------------------------------------------- */
function initScrollSpyAndNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-cyber');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
}

/* -------------------------------------------------------------------
 * 11. Intersection Observer (Scroll Reveal)
 * ------------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------------
 * 12. Card Spotlight Tracker & 3D Tilt Effect
 * ------------------------------------------------------------------- */
function initCardSpotlightAndTilt() {
  document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (card.hasAttribute('data-tilt') && window.innerWidth >= 1024) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.hasAttribute('data-tilt')) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    });
  });
}

/* -------------------------------------------------------------------
 * 13. Sound Hook Events for Buttons & Interactive Links
 * ------------------------------------------------------------------- */
function initSoundHooks() {
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, a, .cyber-card, input, textarea')) {
      if (window.cyberAudio) window.cyberAudio.playHover();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('button, a')) {
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
  });
}

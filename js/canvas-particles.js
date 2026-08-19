/**
 * ===================================================================
 * CANVAS-PARTICLES.JS - High Performance Interactive Cyber Particles
 * ===================================================================
 * Renders an interactive 60fps constellation particle web with
 * neon cyan/purple glowing nodes, connecting grid lines, and mouse reaction.
 */

class CyberParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.burstParticles = [];
    this.mouse = {
      x: null,
      y: null,
      radius: 160
    };
    
    this.colors = [
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 176, g: 38, b: 255 },   // Neon Purple
      { r: 0, g: 255, b: 159 },   // Neon Emerald
      { r: 0, g: 180, b: 255 }    // Electric Blue
    ];

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Adjust density based on screen size
    const count = Math.floor((this.width * this.height) / 14000);
    const particleCount = Math.min(Math.max(count, 45), 100);

    for (let i = 0; i < particleCount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2 + 1,
        baseSize: Math.random() * 2 + 1,
        color: color,
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Particle burst on click
    window.addEventListener('click', (e) => {
      this.createBurst(e.clientX, e.clientY);
    });
  }

  createBurst(x, y) {
    const burstCount = 12;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount;
      const speed = Math.random() * 2.5 + 1.5;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        color: color,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02
      });
    }
  }

  drawConnections() {
    const maxDistance = 140;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      }

      // Connect to mouse if near
      if (this.mouse.x !== null) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const alpha = (1 - dist / this.mouse.radius) * 0.35;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(176, 38, 255, ${alpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw background subtle mouse halo
    if (this.mouse.x !== null) {
      const gradient = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, 220
      );
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.04)');
      gradient.addColorStop(0.5, 'rgba(176, 38, 255, 0.02)');
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 220, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw regular particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Pulse size & glow
      p.pulseVal += p.pulseSpeed;
      const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.15;

      // Bounce off screen borders
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse reaction (subtle push away)
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      // Draw particle circle with neon halo
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(currentAlpha, 0.1)})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }

    // Draw connection lines
    this.drawConnections();

    // Draw burst particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];
      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.alpha -= bp.decay;

      if (bp.alpha <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${bp.color.r}, ${bp.color.g}, ${bp.color.b}, ${bp.alpha})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgba(${bp.color.r}, ${bp.color.g}, ${bp.color.b}, 1)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Auto instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new CyberParticleCanvas('particle-canvas');
});

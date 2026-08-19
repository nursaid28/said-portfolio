/**
 * ===================================================================
 * AUDIO-SYNTH.JS - Web Audio API Procedural Sci-Fi Sound Effects
 * ===================================================================
 * Synthesizes pure sci-fi interface audio effects directly in browser
 * without loading external sound files. Includes toggle switch and persistent state.
 */

class CyberAudioSystem {
  constructor() {
    this.ctx = null;
    this.isEnabled = localStorage.getItem('cyber_audio_enabled') === 'true';
    this.initHUD();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.ensureContext();
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('cyber_audio_enabled', this.isEnabled);
    this.updateHUD();
    if (this.isEnabled) {
      this.playSuccess();
    }
    return this.isEnabled;
  }

  updateHUD() {
    const btn = document.getElementById('audio-toggle-btn');
    const label = document.getElementById('audio-status-label');
    const visualizer = document.getElementById('audio-visualizer');
    
    if (btn) {
      if (this.isEnabled) {
        btn.classList.add('border-cyan-400', 'text-cyan-300');
        btn.classList.remove('border-slate-700', 'text-slate-500');
        if (label) label.textContent = 'SFX: ON';
        if (visualizer) visualizer.classList.add('audio-playing');
      } else {
        btn.classList.remove('border-cyan-400', 'text-cyan-300');
        btn.classList.add('border-slate-700', 'text-slate-500');
        if (label) label.textContent = 'SFX: OFF';
        if (visualizer) visualizer.classList.remove('audio-playing');
      }
    }
  }

  initHUD() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateHUD();
      const btn = document.getElementById('audio-toggle-btn');
      if (btn) {
        btn.addEventListener('click', () => this.toggle());
      }
    });
  }

  // Futuristic hover blip
  playHover() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context policy catch
    }
  }

  // Futuristic click pulse
  playClick() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // Terminal keystroke click
  playKeystroke() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  // Modal open sci-fi swoosh
  playModal() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  // Success chime (Cyber arpeggio)
  playSuccess() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {}
      }, i * 65);
    });
  }
}

// Global audio singleton
window.cyberAudio = new CyberAudioSystem();

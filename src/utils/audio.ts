// Web Audio API Sound Generator for Horizon AI
// Generates synth effects and procedural lo-fi ambient tracks dynamically without external assets

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false; // Start muted, let user toggle or start on interaction
  private ambientInterval: number | null = null;
  private ambientGain: GainNode | null = null;
  private activeOscillators: { osc: OscillatorNode; gainNode: GainNode }[] = [];

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(state?: boolean) {
    this.enabled = state !== undefined ? state : !this.enabled;
    this.init();
    if (this.enabled) {
      this.playAmbient();
    } else {
      this.stopAmbient();
    }
    return this.enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.005, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(550, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.08 + 0.02);
      gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }

  public playMatch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.4);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(224, now);
    osc2.frequency.exponentialRampToValueAtTime(884, now + 0.4);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  // Typewriter keyboard sound simulation
  public playType() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    // Randomize pitch slightly to simulate different keys
    const pitch = 300 + Math.random() * 200;
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(5, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Procedural warm ambient synth loop arpeggio pad
  public playAmbient() {
    if (this.ambientInterval) return;
    this.init();
    if (!this.ctx) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.02, this.ctx.currentTime); // Soft background pad volume
    this.ambientGain.connect(this.ctx.destination);

    let step = 0;
    // Chords: Cmaj7, Am7, Fmaj7, G7 (Root, Third, Fifth, Seventh, arpeggiated)
    const chords = [
      [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3 (Cmaj7)
      [110.00, 130.81, 164.81, 196.00], // A2, C3, E3, G3 (Am7)
      [87.31, 130.81, 174.61, 220.00],  // F2, C3, F3, A3 (Fmaj7)
      [98.00, 146.83, 196.00, 246.94]   // G2, D3, G3, B3 (G7)
    ];

    const playChord = () => {
      if (!this.ctx || !this.ambientGain || !this.enabled) return;
      const now = this.ctx.currentTime;
      const chord = chords[step % chords.length];

      chord.forEach((freq, index) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        // Add arpeggio offset
        const delay = index * 0.25;
        osc.frequency.setValueAtTime(freq, now + delay);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now); // Warmer, deep cutoff at 250Hz

        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.setValueAtTime(0, now + delay);
        oscGain.gain.linearRampToValueAtTime(0.25, now + delay + 1.5); // slow fade-in
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 7.0); // slow fade-out

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(this.ambientGain);

        osc.start(now + delay);
        osc.stop(now + delay + 7.5);

        this.activeOscillators.push({ osc, gainNode: oscGain });
      });

      // Cleanup finished oscillator references
      this.activeOscillators = this.activeOscillators.filter(item => {
        return this.ctx && this.ctx.currentTime < (item.osc.context.currentTime + 9);
      });

      step++;
    };

    playChord();
    this.ambientInterval = window.setInterval(playChord, 8000);
  }

  public stopAmbient() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      } catch (e) {}
    }
    this.activeOscillators.forEach(item => {
      try {
        item.osc.stop();
      } catch (e) {}
    });
    this.activeOscillators = [];
  }
}

export const sound = new SoundManager();

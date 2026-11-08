// Tiny WebAudio synth: no audio files. Off by default, opt-in via the nav toggle.
let ctx: AudioContext | null = null;
let enabled = false;
let master: GainNode | null = null;
let drone: { stop: () => void } | null = null;
const KEY = 'sound-on';

const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

const tone = (freq: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) => {
  if (!enabled) return;
  const c = getCtx();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, c.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.connect(g).connect(master);
  o.start();
  o.stop(c.currentTime + dur + 0.02);
};

const startDrone = () => {
  const c = getCtx();
  if (!c || !master || drone) return;
  const g = c.createGain();
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.05, c.currentTime + 2);
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 220;
  const lfo = c.createOscillator();
  const lfoGain = c.createGain();
  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 90;
  lfo.connect(lfoGain).connect(lp.frequency);
  const oscs = [55, 82.41, 110.3].map((f) => {
    const o = c.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    o.connect(lp);
    o.start();
    return o;
  });
  lp.connect(g).connect(master);
  lfo.start();
  drone = {
    stop: () => {
      g.gain.cancelScheduledValues(c.currentTime);
      g.gain.linearRampToValueAtTime(0, c.currentTime + 0.5);
      setTimeout(() => {
        oscs.forEach((o) => o.stop());
        lfo.stop();
      }, 600);
      drone = null;
    },
  };
};

export const isSoundOn = () => enabled;

export const setSound = (on: boolean) => {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
  if (on) {
    getCtx();
    startDrone();
    tone(660, 0.12, 'sine', 0.06, 990);
  } else drone?.stop();
};

// Restore the saved preference on the first user gesture (autoplay policy)
export const initSound = (onRestore: () => void) => {
  let saved = false;
  try {
    saved = localStorage.getItem(KEY) === '1';
  } catch {
    /* ignore */
  }
  if (!saved) return;
  const once = () => {
    window.removeEventListener('pointerdown', once);
    window.removeEventListener('keydown', once);
    enabled = true;
    getCtx();
    startDrone();
    onRestore();
  };
  window.addEventListener('pointerdown', once);
  window.addEventListener('keydown', once);
};

export const sfx = {
  hover: () => tone(1200, 0.035, 'sine', 0.012),
  click: () => tone(520, 0.08, 'triangle', 0.05, 260),
  pulse: () => {
    tone(140, 0.7, 'sine', 0.12, 40);
    tone(880, 0.4, 'sine', 0.03, 1760);
  },
  flip: () => tone(300, 0.18, 'sawtooth', 0.025, 900),
};

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  return audioContext;
}

export function playHeroClickSound() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "sine";
  clickOsc.frequency.setValueAtTime(720, now);
  clickOsc.frequency.exponentialRampToValueAtTime(420, now + 0.08);

  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.055, now + 0.015);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.14);

  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();
  popOsc.type = "triangle";
  popOsc.frequency.setValueAtTime(280, now + 0.01);
  popOsc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

  popGain.gain.setValueAtTime(0.0001, now + 0.01);
  popGain.gain.exponentialRampToValueAtTime(0.035, now + 0.03);
  popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  popOsc.connect(popGain);
  popGain.connect(ctx.destination);
  popOsc.start(now + 0.01);
  popOsc.stop(now + 0.17);
}

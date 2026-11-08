import Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export const lockScroll = (lock: boolean) => {
  if (lock) instance?.stop();
  else instance?.start();
  document.body.style.overflow = lock ? 'hidden' : '';
};

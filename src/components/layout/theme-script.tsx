export function ThemeScript() {
  const script = `
    (() => {
      try {
        const raw = window.localStorage.getItem('pashugyan-app-store');
        const parsed = raw ? JSON.parse(raw) : null;
        const state = parsed?.state ?? {};
        const pref = state.theme ?? 'system';
        const lang = state.language ?? 'en';
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const resolved = pref === 'system' ? system : pref;
        document.documentElement.classList.toggle('dark', resolved === 'dark');
        document.documentElement.dataset.theme = resolved;
        document.documentElement.style.colorScheme = resolved;
        document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
      } catch (error) {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

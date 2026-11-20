export const THEME_STORAGE_KEY = "julia-theme";

/**
 * Runs in <head> before first paint: applies the saved theme or the system
 * preference, so the page never flashes the wrong palette.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

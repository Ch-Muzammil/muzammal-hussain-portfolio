/** localStorage key for the public theme. Values are JSON: "dark" | "light". */
export const THEME_STORAGE_KEY = "portfolio-theme";

/** Runs before paint so a saved light theme does not flash espresso. */
export const themeInitScript = `(function(){try{var raw=localStorage.getItem("${THEME_STORAGE_KEY}");var theme=raw?JSON.parse(raw):"dark";var root=document.documentElement;if(theme==="light"){root.classList.remove("dark")}else{root.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

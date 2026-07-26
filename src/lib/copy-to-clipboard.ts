/**
 * USE CASE: Copy text (invite link, code, email) to the user's clipboard.
 *
 * HOW TO USE:
 *   const ok = await copyToClipboard("https://example.com/invite")
 *   if (ok) toast.success("Copied")
 *
 * Safe: returns false on server / denied permission / unsupported browser.
 * Do not copy secrets/tokens to the clipboard.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof text !== "string" || text.length === 0) return false;

  // Modern API
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy
    }
  }

  // Legacy fallback (older browsers)
  if (typeof document === "undefined") return false;

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  el.style.top = "0";

  document.body.appendChild(el);
  el.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    document.body.removeChild(el);
  }
}

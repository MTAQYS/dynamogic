export const PREF_REDUCE_MOTION = "dynamogic-os-reduce-motion";
export const PREF_DND = "dynamogic-os-dnd";
export const PREF_COMPACT_DOCK = "dynamogic-os-compact-dock";

export function readPref(key: string): boolean {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function writePref(key: string, value: boolean) {
  try {
    if (value) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(
      new CustomEvent("dynamogic-os-prefs", { detail: { key, value } })
    );
  } catch {
    /* ignore */
  }
}

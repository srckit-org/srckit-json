export function formatJSON(input: string, indent: number): string {
  return JSON.stringify(JSON.parse(input), null, indent);
}
export function minifyJSON(input: string): string {
  return JSON.stringify(JSON.parse(input));
}
export function validateJSON(input: string): { valid: boolean; error?: string; line?: number; col?: number } {
  try { JSON.parse(input); return { valid: true }; }
  catch (e: unknown) { const m = (e as Error).message; const pos = m.match(/position (\d+)/); return { valid: false, error: m, line: pos ? Math.round(Number(pos[1]) / 40) + 1 : undefined }; }
}
export function jsonPath(input: string, path: string): unknown {
  const data = JSON.parse(input);
  const parts = path.split('.').filter(Boolean);
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || typeof current !== 'object') return undefined;
    const arrMatch = part.match(/^(\w+)\[(\d+)\]$/);
    if (arrMatch) { current = (current as Record<string,unknown>)[arrMatch[1]]; if (Array.isArray(current)) current = current[Number(arrMatch[2])]; }
    else { current = (current as Record<string,unknown>)[part]; }
  }
  return current;
}
export function sortJSON(input: string): string {
  const sortKeys = (obj: unknown): unknown => {
    if (Array.isArray(obj)) return obj.map(sortKeys);
    if (obj && typeof obj === 'object') {
      return Object.keys(obj as Record<string,unknown>).sort().reduce((acc, k) => { acc[k] = sortKeys((obj as Record<string,unknown>)[k]); return acc; }, {} as Record<string,unknown>);
    }
    return obj;
  };
  return JSON.stringify(sortKeys(JSON.parse(input)), null, 2);
}
export function countStats(input: string): { keys: number; arrays: number; depth: number; size: string } {
  const data = JSON.parse(input);
  let keys = 0, arrays = 0, maxDepth = 0;
  const walk = (obj: unknown, depth: number) => {
    if (depth > maxDepth) maxDepth = depth;
    if (Array.isArray(obj)) { arrays++; obj.forEach(v => walk(v, depth + 1)); }
    else if (obj && typeof obj === 'object') { keys += Object.keys(obj as object).length; Object.values(obj as object).forEach(v => walk(v, depth + 1)); }
  };
  walk(data, 0);
  return { keys, arrays, depth: maxDepth, size: `${(new TextEncoder().encode(input).length / 1024).toFixed(1)} KB` };
}

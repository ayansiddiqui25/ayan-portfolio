export const PROJECT_RETURN_KEY = 'portfolio:project-return';

export function readProjectReturn(storage) {
  try {
    const value = JSON.parse(storage.getItem(PROJECT_RETURN_KEY));
    if (!value || !Number.isFinite(value.y) || value.y < 0 ||
        !Number.isFinite(value.offset) || typeof value.anchor !== 'string' ||
        !/^(projects|project-[a-z0-9-]+)$/.test(value.anchor)) return null;
    return value;
  } catch { return null; }
}

export function projectReturnY(saved, anchorTop) {
  return Math.max(0, Number.isFinite(anchorTop) ? anchorTop - saved.offset : saved.y);
}

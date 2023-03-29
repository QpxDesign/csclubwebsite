export function FormatTime(s: any) {
  if (s === null || s === undefined) return;
  s = parseInt(s);
  const date = new Date(s);
  const dateFormat = date.toLocaleDateString();
  const timeFormat = date.toLocaleTimeString();
  return dateFormat + " - " + timeFormat;
}

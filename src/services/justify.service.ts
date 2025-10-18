const LINE_WIDTH = 80;

export function justifyText(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  const lines: string[] = [];
  let current: string[] = [];
  let currentLen = 0;

  for (const word of words) {
    // Vérifie si le mot peut entrer dans la ligne actuelle
    if (currentLen + word.length + current.length <= LINE_WIDTH) {
      current.push(word);
      currentLen += word.length;
    } else {
      lines.push(justifyLine(current));
      current = [word];
      currentLen = word.length;
    }
  }

  // dernière ligne : non justifiée
  lines.push(current.join(" "));
  return lines.join("\n");
}

function justifyLine(words: string[]): string {
  if (words.length === 0) return "";

  // Si un seul mot, on le retourne + padding
  const lone = words[0];
  if (lone === undefined) return ""; 

  if (words.length === 1) {
    return lone + " ".repeat(Math.max(0, LINE_WIDTH - lone.length));
  }

  const totalWordsLen = words.reduce((a, w) => a + w.length, 0);
  const spacesNeeded = LINE_WIDTH - totalWordsLen;
  const gaps = words.length - 1;
  const base = Math.floor(spacesNeeded / gaps);
  let extra = spacesNeeded % gaps;

  const parts: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word === undefined) continue; 

    parts.push(word);

    if (i < gaps) {
      const sp = base + (extra > 0 ? 1 : 0);
      parts.push(" ".repeat(sp));
      if (extra > 0) extra--;
    }
  }

  return parts.join("");
}

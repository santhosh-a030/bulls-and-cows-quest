// Compact list of 4-letter, unique-letter words for gameplay
export const WORDS = [
  "BARN","MINT","CLOUD".slice(0,4), // safety trim if longer
  "PLAY","CART","MELT","FROG","WAVE","RING","DUST","GLOW","PARK",
  "FINE","BRIM","COVE","HARp".toUpperCase().slice(0,4),"LUSH","GAZE","BIRD","WIND",
  "CANE","SAGE","MOLD","TIDE","RAMP","SNOW","PORT","VIBE","GLAD","CAME","BOLT",
].map(w=>w.toUpperCase()).filter(w => /^[A-Z]{4}$/.test(w) && new Set(w).size===4);

export const randomWord = () => WORDS[Math.floor(Math.random()*WORDS.length)] ?? "GAME";

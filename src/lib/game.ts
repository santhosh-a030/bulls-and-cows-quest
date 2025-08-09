export type CheckResult = { bulls: number; cows: number; correct: boolean };

export const hasUniqueLetters = (word: string) => {
  const s = word.toUpperCase();
  if (!/^[A-Z]{4}$/.test(s)) return false;
  return new Set(s.split("")).size === 4;
};

export const computeBullsCows = (secret: string, guess: string): CheckResult => {
  const S = secret.toUpperCase();
  const G = guess.toUpperCase();
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (G[i] === S[i]) bulls++;
    else if (S.includes(G[i])) cows++;
  }
  return { bulls, cows, correct: bulls === 4 };
};

// Simulated API endpoint. Swap with a real Edge Function later.
export const postCheckWord = async (
  guess: string,
  secret: string
): Promise<CheckResult> => {
  await new Promise((r) => setTimeout(r, 200)); // simulate latency
  return computeBullsCows(secret, guess);
};

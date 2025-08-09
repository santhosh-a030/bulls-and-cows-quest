import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import GuessRow from "@/components/game/GuessRow";
import { hasUniqueLetters, postCheckWord, type CheckResult } from "@/lib/game";
import { randomWord } from "@/lib/words";

interface HistoryItem extends CheckResult { guess: string }

const Index = () => {
  // Secret word lives client-side for now; can move to Edge Function later.
  const [secret, setSecret] = useState<string>(randomWord());
  const [guess, setGuess] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [won, setWon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Bull and Cow – 4‑Letter Word Game";
  }, []);

  const tries = history.length;

  const handleSubmit = async () => {
    const g = guess.trim().toUpperCase();
    if (!/^[A-Z]{4}$/.test(g)) {
      toast({ title: "Invalid guess", description: "Enter 4 letters (A–Z)." });
      return;
    }
    if (!hasUniqueLetters(g)) {
      toast({ title: "No duplicates", description: "All letters must be unique." });
      return;
    }
    const res = await postCheckWord(g, secret);
    const item: HistoryItem = { ...res, guess: g };
    setHistory((h) => [item, ...h]);
    setGuess("");
    if (res.correct) {
      setWon(true);
      toast({ title: "You guessed correct", description: `Solved in ${tries + 1} tries!` });
    } else {
      inputRef.current?.focus();
    }
  };

  const handleReset = () => {
    setSecret(randomWord());
    setHistory([]);
    setWon(false);
    setGuess("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <main className="w-full max-w-xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Bull and Cow</h1>
          <p className="text-muted-foreground mt-2">Guess the secret 4-letter word. Bulls = correct letter & spot, Cows = correct letter wrong spot.</p>
        </header>

        <Card className="hero-surface glow-on-hover">
          <CardHeader>
            <CardTitle>Make a guess</CardTitle>
            <CardDescription>Type a 4-letter word with unique letters.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                placeholder="e.g. MINT"
                maxLength={4}
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                aria-label="Enter your 4-letter guess"
                className="tracking-widest text-lg"
              />
              <Button variant="hero" onClick={handleSubmit} disabled={won} className="animate-soft-glow">
                Submit
              </Button>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">Tries: {tries}</div>
            {won && (
              <div className="mt-4">
                <Button variant="soft" onClick={handleReset}>Play again</Button>
              </div>
            )}

            <Separator className="my-6" />

            <section aria-label="Guess history">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No guesses yet. Give it a try!</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((h, i) => (
                    <GuessRow key={i} guess={h.guess} bulls={h.bulls} cows={h.cows} index={history.length - 1 - i} />
                  ))}
                </ul>
              )}
            </section>
          </CardContent>
        </Card>

        <footer className="sr-only">
          <p>Calm pastel word game built with React.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;

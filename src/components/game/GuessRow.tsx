import { Badge } from "@/components/ui/badge";

export interface GuessRowProps {
  guess: string;
  bulls: number;
  cows: number;
  index: number;
}

export const GuessRow = ({ guess, bulls, cows, index }: GuessRowProps) => {
  return (
    <li className="flex items-center justify-between gap-4 py-2 px-3 rounded-md bg-surface/60 border border-border">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">#{index + 1}</span>
        <span className="font-semibold tracking-wider">{guess.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-brand/10 text-foreground border-border">Bulls: {bulls}</Badge>
        <Badge variant="secondary" className="bg-accent/40 text-foreground border-border">Cows: {cows}</Badge>
      </div>
    </li>
  );
};

export default GuessRow;

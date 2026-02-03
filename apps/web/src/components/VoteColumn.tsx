import { IconButton } from "../ui/IconButton";

type Props = {
  score: number;
  onUp?: () => void;
  onDown?: () => void;
  disabled?: boolean;
  size?: "md" | "sm";
};

export function VoteColumn({ score, onUp, onDown, disabled, size = "md" }: Props) {
  return (
    <div className="g-voteCol" aria-label="vote column">
      <IconButton
        icon="north"
        label="Upvote"
        disabled={disabled || !onUp}
        onClick={onUp}
        size={size === "sm" ? 18 : 20}
      />
      <div className="g-voteScore">{score}</div>
      <IconButton
        icon="south"
        label="Downvote"
        disabled={disabled || !onDown}
        onClick={onDown}
        size={size === "sm" ? 18 : 20}
      />
    </div>
  );
}


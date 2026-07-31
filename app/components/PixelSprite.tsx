type PixelSpriteProps = {
  pattern: string[];
  className?: string;
  label: string;
};

export function PixelSprite({
  pattern,
  className = "",
  label,
}: PixelSpriteProps) {
  const columns = pattern[0]?.length ?? 1;

  return (
    <div
      className={`sprite ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      role="img"
      aria-label={label}
    >
      {pattern.join("").split("").map((pixel, index) => (
        <span
          className={`sprite__pixel ${pixel === "." ? "" : `pixel-${pixel}`}`}
          key={index}
        />
      ))}
    </div>
  );
}

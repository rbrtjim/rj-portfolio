interface Props {
  variant?: "default" | "subtle" | "strong";
}

export function SectionBackground({ variant = "default" }: Props) {
  const opacity =
    variant === "subtle" ? "opacity-40" : variant === "strong" ? "opacity-80" : "opacity-60";
  return (
    <div className={`gradient-mesh ${opacity}`} aria-hidden="true" />
  );
}

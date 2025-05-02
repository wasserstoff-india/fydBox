type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
};

export default function Marquee({ children, className = "", direction = "left" }: MarqueeProps) {
  return (
    <div className={`relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base ${className}`}>
      <div className={`py-12 whitespace-nowrap animate-marquee-${direction}`}>
        {children}
      </div>
      <div className={`absolute top-0 py-12 whitespace-nowrap animate-marquee2-${direction}`}>
        {children}
      </div>
    </div>
  );
}

import { Marquee } from "@devnomic/marquee";
import * as React from "react";
import { cn } from "@/lib/utils";

export default function HeroComponents({
  className,
  reverse,
}: {
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-full w-[340px] absolute top-[70px] pointer-events-none overflow-y-hidden",
        className
      )}
    >
      <Marquee
        direction="up"
        reverse={reverse}
        pauseOnHover={false}
        className="flex flex-col w-full max-w-full h-full overflow-hidden pr-3 [&>*]:gap-[20px]"
      >
        <Card />
        <Poll />
        <Card />
        <Poll />
        <Card />
        <Poll />
      </Marquee>
    </div>
  );
}

// Card component
const Card = () => (
  <div className="rounded-base h-[150px] w-full text-main-foreground border-2 border-border bg-main p-4 shadow-shadow overflow-hidden">
    Jokester began sneaking into the castle in the middle of the night and
    leaving jokes all over the place: under the king&apos;s pillow, in his soup,
    even in the royal toilet. The king was furious, but he couldn&apos;t seem to
    stop Jokester. And then, one day, the people of the kingdom discovered that
    the jokes left by Jokester were so funny that they couldn&apos;t help but
    laugh. And once they started laughing, they couldn&apos;t stop.
  </div>
);

// Poll component
const Poll = () => (
  <div className="rounded-base h-[150px] w-full text-main-foreground border-2 border-border bg-muted p-4 shadow-shadow overflow-hidden flex flex-col justify-between">
    <div className="font-semibold">What’s your favorite season?</div>
    <div className="flex flex-col gap-1 text-sm mt-2">
      <label>
        <input type="radio" name="poll1" /> Spring
      </label>
      <label>
        <input type="radio" name="poll1" /> Summer
      </label>
      <label>
        <input type="radio" name="poll1" /> Fall
      </label>
      <label>
        <input type="radio" name="poll1" /> Winter
      </label>
    </div>
  </div>
);

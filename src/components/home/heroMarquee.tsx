import Star11 from "../stars/s11";
import Star22 from "../stars/s22";
import Star26 from "../stars/s26";
import Star32 from "../stars/s32";
import { Marquee } from "@devnomic/marquee";

export default function HeroMarquee() {
  return (
    <Marquee
      className="border-t-4 border-border md:[&_.animate-marquee-left]:gap-[50px]! [&_.animate-marquee-left]:gap-[35px]! bg-secondary-background md:py-4 py-3"
      direction="left"
    >
      {Array.from({ length: 7 }).map((_, id) => {
        return (
          <div
            className="flex items-center md:gap-[50px] gap-[35px] xl:[&_span]:text-3xl md:[&_span]:text-2xl sm:[&_span]:text-xl [&_span]:text-base lg:[&_svg]:size-[50px] md:[&_svg]:size-10 [&_svg]:size-[30px]"
            key={id}
          >
            <span>Suggestions</span>
            <Star32 className="text-foreground" />
            <span>Anonymous</span>
            <Star22 stroke="black" strokeWidth={6} color="var(--main)" />
            <span>Decentralised</span>
            <Star11 className="text-foreground" />
            <span>Secure</span>
            <Star26 color="var(--main)" stroke="black" strokeWidth={7} />
          </div>
        );
      })}
    </Marquee>
  );
}

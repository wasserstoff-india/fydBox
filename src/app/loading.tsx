import { Loader2 } from "lucide-react";

export default function () {
  return (
    <div className="text-foreground max-h-[100dvh] h-[100dvh] portrait:max-h-[100dvh] portrait:h-[100dvh] w-full flex items-center justify-center bg-background prose-headings:font-heading prose-h1:md:text-5xl prose-h1:text-3xl">
      <Loader2 className="animate-spin text-main" size={50} />
    </div>
  );
}

import {  Github } from "lucide-react";
import Link from "next/link";

export default function OpenSource() {
  return (
    <section className="inset-0 w-full flex flex-col items-center justify-center bg-main  bg-[linear-gradient(to_right,#00000033_1px,transparent_1px),linear-gradient(to_bottom,#00000033_1px,transparent_1px)] bg-[size:70px_70px] px-5 lg:py-[200px] md:py-[150px] sm:py-[100px] py-[100px]">
      <h2 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-white mb-6">
        Built in Public. Powered by You.
      </h2>

      <Link
        className="flex items-center gap-2.5 w-max text-foreground rounded-base border-2 border-border bg-background dark:bg-secondary-background md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        href={"/docs"}
      >
        Contribute to the project
        <Github className="md:size-[30px] size-5" />
      </Link>
    </section>
  );
}

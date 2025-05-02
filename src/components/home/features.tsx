import { ShieldCheck, UserPlus, Link2, EyeOff } from "lucide-react";

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-t-4 border-border ">
      <section className="border-b-4 md:border-r-4 border-border md:bg-background bg-main text-main-foreground md:text-foreground 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7">
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="size-10 sm:size-12 lg:size-[55px] xl:size-[70px] flex items-center justify-center">
            <ShieldCheck className="w-full h-full" />
          </div>
          <h3 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-main-foreground">Blockchain Secured</h3>
        </div>
        <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
          Every suggestion and response is securely stored on the blockchain,
          ensuring transparency, permanence, and data integrity.
        </p>
      </section>

      <section className="border-b-4 border-border md:bg-main bg-background text-main-foreground md:text-main-foreground md:dark:text-main-foreground dark:text-foreground 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7">
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="size-10 sm:size-12 lg:size-[55px] xl:size-[70px] flex items-center justify-center">
            <UserPlus className="w-full h-full text-white" />
          </div>
          <h3 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-white">Connect with Web3</h3>
        </div>
        <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base text-white">
          Users can easily connect their MetaMask wallet to create suggestion
          boxes or polls—no signup or email required.
        </p>
      </section>

      <section className="md:border-r-4 border-b-4 border-border bg-main dark:text-main-foreground 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7">
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="size-10 sm:size-12 lg:size-[55px] xl:size-[70px] flex items-center justify-center">
            <Link2 className="w-full h-full text-white" />
          </div>
          <h3 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-white">Share with Anyone</h3>
        </div>
        <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base text-white">
          Instantly share topics via link or QR code. Anyone can respond—no
          wallet needed on the responder side.
        </p>
      </section>

      <section className="bg-background 2xl:p-14 2xl:py-16 xl:p-10 xl:py-10 lg:p-8 lg:py-10 p-5 py-7">
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="size-10 sm:size-12 lg:size-[55px] xl:size-[70px] flex items-center justify-center">
            <EyeOff className="w-full h-full" />
          </div>
          <h3 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-main-foreground">Fully Anonymous</h3>
        </div>
        <p className="2xl:text-2xl xl:text-xl md:text-base sm:text-lg text-base">
          Suggestions and responses are anonymous by default—creators can&apos;t see
          who submitted what, ensuring honest and open feedback.
        </p>
      </section>
    </div>
  );
}

import Star14 from "../stars/s14";
import Star20 from "../stars/s20";

const reviews = [
  {
    fullName: "Alice Johnson",
    jobTitle: "Product Manager at DevHub",
    pfp: { src: "https://i.pravatar.cc/150?img=1" },
    review:
      "This tool helped us collect completely anonymous feedback during our internal sprint. The privacy-first approach really made people open up.",
  },
  {
    fullName: "Raj Mehta",
    jobTitle: "Blockchain Developer",
    pfp: { src: "https://i.pravatar.cc/150?img=2" },
    review:
      "Love the integration with MetaMask. It’s smooth and lets me create feedback sessions without any hassle.",
  },
  {
    fullName: "Sophia Kim",
    jobTitle: "Team Lead at OpenCollective",
    pfp: { src: "https://i.pravatar.cc/150?img=3" },
    review:
      "We ran a team poll for roadmap planning and the anonymity led to much more honest inputs than usual. Impressive UX too!",
  },
  {
    fullName: "Liam Wright",
    jobTitle: "Design Researcher",
    pfp: { src: "https://i.pravatar.cc/150?img=4" },
    review:
      "I use this for collecting design feedback during usability testing. Easy to share, and participants love the anonymity.",
  },
  {
    fullName: "Mina Youssef",
    jobTitle: "Founder @FeedbackDAO",
    pfp: { src: "https://i.pravatar.cc/150?img=5" },
    review:
      "Finally a feedback tool that’s built for web3 teams. Love the open source ethos and community-first mindset.",
  },
  {
    fullName: "Carlos Fernández",
    jobTitle: "Engineering Manager",
    pfp: { src: "https://i.pravatar.cc/150?img=6" },
    review:
      "Sleek interface, secure, and very easy to use. Our remote team adopted it in no time.",
  },
  {
    fullName: "Emily Zhao",
    jobTitle: "HR Specialist",
    pfp: { src: "https://i.pravatar.cc/150?img=7" },
    review:
      "We use this app for monthly employee feedback. Anonymity encourages more authentic responses. Love the QR code sharing!",
  },
];

export default function Community() {
  return (
    <section className="inset-0 flex relative overflow-hidden w-full px-5 flex-col items-center justify-center bg-secondary-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] z-0">
      <Star20
        color="var(--main)"
        stroke="black"
        strokeWidth={3}
        size={250}
        className="absolute top-[120px] lg:block hidden -left-[125px] -z-10"
      />
      <Star14
        color="var(--main)"
        stroke="black"
        strokeWidth={3}
        size={250}
        className="absolute bottom-[120px] lg:block hidden -right-[125px] -z-10"
      />
      <div className="mx-auto w-[1300px] max-w-full py-16 lg:py-[100px]">
        <h2 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-main-foreground mb-12">Loved by the community</h2>
        <div className="grid-cols-1 grid lg:grid-cols-3 gap-0 lg:gap-8">
          {[
            [reviews[0], reviews[1]],
            [reviews[2], reviews[3], reviews[4]],
            [reviews[5], reviews[6]],
          ].map((card, index) => (
            <div className="group flex flex-col justify-center" key={index}>
              {card.map(({ jobTitle, pfp, fullName, review }, index) => (
                <div
                  className="min-h-20 sm:w-[500px] w-full mx-auto mb-4 lg:min-h-48 lg:mb-8 lg:w-full rounded-base border-2 border-border bg-background p-5 shadow-shadow"
                  key={index}
                >
                  <div className="flex items-center sm:gap-5 gap-3">
                    <img
                      className="size-10 sm:size-12 rounded-base border-2 border-border"
                      src={`${pfp.src}`}
                      alt="pfp"
                    />

                    <div>
                      <h4 className="sm:text-lg text-base font-heading">
                        {fullName}
                      </h4>
                      <p className="text-xs sm:text-sm ">{jobTitle}</p>
                    </div>
                  </div>
                  <div className="sm:mt-5 mt-3 sm:text-base text-sm break-words">
                    {review}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

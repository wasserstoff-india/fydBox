import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "It's a blockchain-powered suggestion and polling tool that allows you to collect anonymous feedback from your team or audience.",
  },
  {
    question: "Do I need a wallet to use it?",
    answer:
      "Only creators need a wallet like MetaMask to create a suggestion box or poll. Respondents do not need any wallet to submit feedback.",
  },
  {
    question: "Is it really anonymous?",
    answer:
      "Yes. Responses are not tied to any wallet or identity, and creators can't see who submitted what—ensuring full anonymity.",
  },
  {
    question: "Can I customize my suggestion box?",
    answer:
      "Yes, you can customize the title, description, visibility settings, and choose whether you're collecting suggestions or running a poll.",
  },
  {
    question: "How do I share my box with others?",
    answer:
      "After creating a topic, you’ll get a unique link and QR code you can share anywhere—via email, social, or messaging apps.",
  },
  {
    question: "Is it open source?",
    answer:
      "Absolutely! This project is open source and available on GitHub. You're welcome to contribute, suggest features, or report issues.",
  },
];

export default function FAQS() {
  return (
    <section className="border-t-4 z-0 border-t-border border-b-4 border-b-border bg-background py-16 lg:py-[100px]">
      <h2 className="text-center font-heading not-prose 2xl:text-5xl xl:text-5xl md:text-4xl sm:text-3xl text-[22px] text-main-foreground mb-12">
        Frequently asked questions
      </h2>

      <div className="mx-auto not-prose grid w-[700px] max-w-full px-5">
        <Accordion className="text-base sm:text-lg" type="single" collapsible>
          {faqs.map((faq, idx) => (
            <AccordionItem className="mb-2" key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-left text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

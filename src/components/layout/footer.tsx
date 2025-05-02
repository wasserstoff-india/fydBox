export default function Footer() {
  return (
    <footer className="z-30 border-t-4 border-border bg-secondary-background px-5 py-2 text-center sm:text-base text-sm">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 max-h-16 md:flex-row mx-auto">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Suggestion Box. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}

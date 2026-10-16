import { Check, FileText, GitCommitHorizontal, Send } from "lucide-react";

/** Illustrative phone mock-ups for the products page (not screenshots). */

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative mx-auto w-[260px] rounded-[44px] border-[10px] border-navy bg-navy shadow-float" role="img" aria-label={label}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-navy" aria-hidden />
      <div className="h-[520px] overflow-hidden rounded-[34px] bg-background" aria-hidden>
        {children}
      </div>
    </div>
  );
}

export function ChatMock() {
  return (
    <Phone label="Illustration of the NotelineAI chat screen">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-4 pb-3 pt-9">
          <p className="text-sm font-bold">NotelineAI</p>
          <p className="text-[11px] text-muted-foreground">3 files in your library</p>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-3 py-4 text-[12px] leading-snug">
          <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-royal px-3 py-2 text-white">What are the key dates in the project brief?</p>
          <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2">
            Kick-off is on 4 March, the first review on 18 March, and launch is planned for 2 May.
            <span className="mt-2 flex items-center gap-1.5 rounded-lg bg-accent px-2 py-1 text-[10px] font-semibold text-primary">
              <FileText className="size-3" /> project-brief.pdf · p. 2
            </span>
          </div>
          <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-royal px-3 py-2 text-white">Who approves the budget?</p>
          <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2 text-muted-foreground">
            I couldn&apos;t find that in your library.
          </div>
        </div>
        <div className="m-3 flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-4 pr-1.5 text-[12px] text-muted-foreground">
          Ask your notes…
          <span className="ml-auto inline-flex size-7 items-center justify-center rounded-full bg-navy text-white">
            <Send className="size-3.5" />
          </span>
        </div>
      </div>
    </Phone>
  );
}

const commits = [
  ["Set up project repo", true],
  ["Design onboarding screens", true],
  ["Build task timeline", true],
  ["Write release notes", false],
  ["Publish to Play Store", false],
] as const;

export function ListMock() {
  return (
    <Phone label="Illustration of the CommitList task timeline">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-4 pb-3 pt-9">
          <p className="text-sm font-bold">My side project</p>
          <p className="text-[11px] text-muted-foreground">3 of 5 commits done</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full w-3/5 rounded-full bg-success" />
          </div>
        </div>
        <ol className="relative flex-1 px-4 py-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-0.5 before:bg-border">
          {commits.map(([t, done]) => (
            <li key={t} className="relative flex items-center gap-3 py-2.5 text-[12px]">
              <span
                className={
                  done
                    ? "relative z-10 inline-flex size-6 items-center justify-center rounded-full bg-success text-white"
                    : "relative z-10 inline-flex size-6 items-center justify-center rounded-full border-2 border-border bg-background text-muted-foreground"
                }
              >
                {done ? <Check className="size-3.5" /> : <GitCommitHorizontal className="size-3.5" />}
              </span>
              <span className={done ? "font-medium" : "text-muted-foreground"}>{t}</span>
            </li>
          ))}
        </ol>
        <div className="m-3 rounded-2xl bg-navy py-3 text-center text-[12px] font-semibold text-white">+ New commit</div>
      </div>
    </Phone>
  );
}

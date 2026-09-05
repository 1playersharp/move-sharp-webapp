import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/ui/Header";
import { Button } from "@/components/ui/Button";
import { ErrorText } from "@/components/ui/Field";
import { requirePlayer } from "@/lib/auth";
import { QUIZ_QUESTIONS } from "@/lib/constants/quiz";
import { submitQuiz } from "@/app/actions/quiz";

const POSITION_KEY_MAP: Record<string, string> = {
  goalkeeper: "goalkeeper",
  right_back: "fullback",
  left_back: "fullback",
  centre_back: "centreback",
  defensive_mid: "midfielder",
  central_mid: "midfielder",
  attacking_mid: "midfielder",
  right_wing: "winger",
  left_wing: "winger",
  striker: "striker",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function QuizPage({ searchParams }: Props) {
  const user = await requirePlayer();
  const { error } = await searchParams;

  const prefill = {
    position: user.player.position ? POSITION_KEY_MAP[user.player.position] ?? "" : "",
    trainingContext: user.player.trainingContext,
  };

  return (
    <AppShell>
      <Header
        title="Build your own"
        subtitle="Ten quick questions. We build the 6-week block from your answers."
      />

      <form action={submitQuiz} className="space-y-6 shell-gutter pb-16">
        {error ? <ErrorText>{error}</ErrorText> : null}

        {QUIZ_QUESTIONS.map((q, i) => {
          const defaultValue =
            q.prefillFrom === "position" ? prefill.position :
            q.prefillFrom === "trainingContext" ? prefill.trainingContext :
            "";

          return (
            <fieldset key={q.key} className="rounded-card border border-white/5 bg-ink-850 p-4 shadow-card">
              <legend className="px-1 font-display uppercase tracking-display text-mint-400 text-xs">
                Q{i + 1} / {QUIZ_QUESTIONS.length}
              </legend>
              <p className="font-display uppercase tracking-display text-white text-base leading-tight">
                {q.prompt}
              </p>
              {q.help ? <p className="mt-1 text-xs text-muted">{q.help}</p> : null}
              <div className="mt-3 space-y-2">
                {q.options.map((opt) => {
                  const isDefault = defaultValue === opt.key;
                  const id = `${q.key}_${opt.key}`;
                  return (
                    <label
                      key={opt.key}
                      htmlFor={id}
                      className="flex cursor-pointer items-start gap-3 rounded-md border border-white/5 bg-ink-900/60 p-3 hover:border-mint/30 has-[:checked]:border-mint has-[:checked]:bg-mint/10"
                    >
                      <input
                        id={id}
                        type="radio"
                        name={q.key}
                        value={opt.key}
                        defaultChecked={isDefault}
                        required
                        className="mt-0.5 h-4 w-4 accent-mint"
                      />
                      <span className="min-w-0">
                        <span className="block text-sm text-white">{opt.label}</span>
                        {opt.blurb ? (
                          <span className="block text-xs text-muted mt-0.5">{opt.blurb}</span>
                        ) : null}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        <Button type="submit" size="lg" className="w-full">
          Build my programme
        </Button>
      </form>
    </AppShell>
  );
}

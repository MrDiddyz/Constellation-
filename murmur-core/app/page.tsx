const checkpoints = [
  "Quality gate coverage: lint, typecheck, test, build",
  "Security posture: dependency audit, secret scan, static analysis",
  "Performance guardrails: bundle analysis + Lighthouse assertions",
  "Operational reliability: health checks, structured logs, env parity",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-6 py-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-amber-300">MURMUR</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Build optimized. Strength-checked. Weakness-hardened.
        </h1>
        <p className="max-w-3xl text-zinc-300">
          This baseline ships with guardrails for code quality, security, and performance so
          the constellation can evolve with confidence.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="mb-4 text-xl font-medium">Baseline readiness checklist</h2>
        <ul className="space-y-2 text-zinc-300">
          {checkpoints.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

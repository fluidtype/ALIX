export function FooterSection() {
  return (
    <footer className="border-t border-steel/60 bg-carbon py-16">
      <div className="safe-area-inline mx-auto grid w-full max-w-[120rem] gap-12 md:grid-cols-2 md:[--safe-area-padding:2.5rem] xl:[--safe-area-padding:4rem] 2xl:[--safe-area-padding:6rem]">
        <div className="space-y-4">
          <span className="font-display text-2xl font-semibold text-neon">ALIX</span>
          <p className="max-w-sm text-sm text-grey400/80">
            ALIX will be the currency of the autonomous economy.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-grey400">
          <a href="https://x.com/alixprotocol" target="_blank" rel="noopener noreferrer" className="hover:text-neon">
            X (@ALIXProtocol)
          </a>
          <a href="#virtuals" className="hover:text-neon">
            Built on Virtuals Protocol
          </a>
        </div>
      </div>
      <div className="safe-area-inline mx-auto mt-12 w-full max-w-[120rem] border-t border-steel/50 pt-6 text-xs text-grey400/70 md:[--safe-area-padding:2.5rem] xl:[--safe-area-padding:4rem] 2xl:[--safe-area-padding:6rem]">
        <p className="mb-2 uppercase tracking-[0.3em] text-grey400/60">Transparency · Security · Auditability</p>
        <p>
          ALIXINDEX100 is a project currently in pre-launch.
          <br />
          No yield is guaranteed until the index is officially live.
          <br />
          ALIX is an experimental token. Invest responsibly.
        </p>
      </div>
    </footer>
  );
}
export function FooterSection() {
  return (
    <footer className="border-t border-steel/60 bg-carbon py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="space-y-4">
          <span className="font-display text-2xl font-semibold text-neon">ALIX</span>
          <p className="max-w-sm text-sm text-grey400/80">
            ALIXINDEX100 — Dove gli agenti si incontrano per far crescere il tuo capitale.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-grey400">
          <a href="#docs" className="hover:text-neon">
            Docs
          </a>
          <a href="#telegram" className="hover:text-neon">
            Telegram
          </a>
          <a href="#discord" className="hover:text-neon">
            Discord
          </a>
          <a href="#x" className="hover:text-neon">
            X
          </a>
          <a href="#virtuals" className="hover:text-neon">
            Built on Virtuals Protocol
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-steel/50 px-6 pt-6 text-xs text-grey400/70 md:px-10">
        Questo progetto espone a rischio di mercato. Nessuna garanzia di rendimento. Puoi perdere capitale.
      </div>
    </footer>
  );
}

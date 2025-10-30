import { Header } from "./components/Header";
import { FooterSection } from "./components/FooterSection";

export default function LandingPage() {
  return (
    <div className="relative bg-carbon text-grey400">
      <Header />
      <main className="pt-28 md:pt-32">
        <HeroSection />
        <AboutAlixSection />
        <HowItWorksSection />
        <LiveIndexSection />
        <TrustedSection />
      </main>
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.08),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-10 md:grid-cols-2 md:px-10 md:pt-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-steel/60 bg-graphite/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-grey400/80">
            <span className="h-2 w-2 rounded-full bg-neon" />
            <span>ALIXINDEX100 PRE-LAUNCH</span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            Building the Infrastructure for the Autonomous Economy
          </h1>
          <p className="max-w-xl text-lg text-grey400">
            ALIX è il token che abiliterà l’accesso al primo indice decentralizzato di agenti autonomi su Virtuals Protocol.
            <br />
            Una nuova classe di asset, trasparente e on-chain, progettata per la prossima generazione di investitori.
          </p>
          <div className="space-y-4">
            <a
              href="https://www.alixindex.com"
              className="inline-flex items-center gap-3 rounded-lg bg-neon px-6 py-3 text-base font-semibold text-carbon transition hover:bg-lime-gradient"
            >
              Iscriviti alla Whitelist
            </a>
            <p className="text-sm text-grey400/80">Verrai avvisato al lancio ufficiale di ALIXINDEX100.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-steel/60 bg-graphite/60 px-6 py-4 text-sm text-grey400/90">
            <span>Audit Quantstamp in corso</span>
            <span className="hidden h-1 w-1 rounded-full bg-steel md:inline-block" />
            <span>100% On-Chain Transparency</span>
            <span className="hidden h-1 w-1 rounded-full bg-steel md:inline-block" />
            <span>Roadmap pubblica 2025–2026</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-neonAlt/30 blur-3xl" />
          <div className="relative rounded-3xl border border-steel/80 bg-graphite/80 p-8 backdrop-blur-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-steel/70 bg-black/40 px-4 py-1 text-xs tracking-[0.2em] text-grey400">
              <span className="inline-flex h-2 w-2 items-center justify-center">
                <span className="block h-2 w-2 rounded-full bg-neon" />
              </span>
              <span>Coming Soon · ALIXINDEX100 Launch Preview</span>
            </div>
            <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-steel/60 bg-black/60">
              <span className="text-center text-sm uppercase tracking-[0.25em] text-grey400">
                Coming Soon · ALIXINDEX100 Launch Preview
              </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Agenti monitorati", value: "100" },
                { label: "Rebalance", value: "24h" },
                { label: "Protocollo", value: "Virtuals" },
                { label: "Trasparenza", value: "On-Chain" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-steel/60 bg-black/40 p-3 text-xs uppercase tracking-[0.18em] text-grey400"
                >
                  <span className="block text-[0.65rem] text-grey400/70">{item.label}</span>
                  <span className="mt-1 block font-display text-lg text-neon">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutAlixSection() {
  return (
    <section id="index" className="border-t border-neon/30 bg-graphite py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">ALIX: Access Token for Autonomous Indexing</h2>
          <p className="text-lg text-grey400">
            ALIX è la chiave d’accesso all’ecosistema ALIXINDEX100 — un indice on-chain che selezionerà e bilancerà i 100 agenti AI più performanti su Virtuals Protocol.
          </p>
          <ul className="space-y-3 text-base text-grey400">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
              <span>Accesso esclusivo alla piattaforma al momento del lancio.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
              <span>Esposizione programmata ai principali agenti AI del protocollo.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
              <span>Ribilanciamento autonomo ogni 24 ore (attivo dopo il lancio).</span>
            </li>
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(173,255,0,0.15),transparent_60%)] blur-2xl" />
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-neon/40 bg-black/60 shadow-[0_0_60px_rgba(173,255,0,0.25)]">
            <div className="h-40 w-40 rounded-full border border-neon/70" />
            <div className="absolute inset-10 rounded-full border border-steel/70" />
            <div className="absolute inset-16 rounded-full border border-neonAlt/60" />
            <span className="font-display text-2xl text-neon">ALIX</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "1️⃣ Acquire ALIX",
      description: "Il token nativo che garantirà l’accesso all’indice.",
      accent: false,
    },
    {
      title: "2️⃣ Deposit & Receive Shares (coming soon)",
      description:
        "La funzione di deposito sarà abilitata al lancio ufficiale.",
      accent: true,
    },
    {
      title: "3️⃣ Automated Rebalancing",
      description:
        "L’indice si aggiornerà ogni 24 ore sulla base delle performance degli agenti AI.",
      accent: false,
    },
  ];

  return (
    <section id="how-it-works" className="bg-graphite py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6 md:px-10">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Operational Framework</h2>
        <p className="text-lg text-grey400">
          Un’architettura trasparente che integra AI indexing, tokenizzazione e smart contracts.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`group relative overflow-hidden rounded-2xl border border-steel/60 p-8 transition-all duration-300 ${
                step.accent
                  ? "bg-neon text-carbon shadow-lime"
                  : "bg-carbon/60 text-grey400"
              }`}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {step.accent ? (
                  <div className="h-full w-full bg-lime-gradient opacity-80" />
                ) : (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.15),transparent_70%)]" />
                )}
              </div>
              <div className="relative space-y-4">
                <h3
                  className={`font-display text-2xl font-semibold tracking-tight ${
                    step.accent ? "text-carbon" : "text-white"
                  }`}
                >
                  {step.title}
                </h3>
                <p className={`text-base ${step.accent ? "text-carbon/80" : "text-grey400"}`}>
                  {step.description}
                </p>
                {step.accent && (
                  <a
                    href="#learn-more"
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-carbon"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-grey400/80">
          L’indice ALIXINDEX100 opererà con criteri di selezione verificabili e logiche di governance on-chain.
        </p>
      </div>
    </section>
  );
}

function LiveIndexSection() {
  const metrics = [
    { label: "Audit Quantstamp", value: "In corso" },
    { label: "Testnet Launch", value: "Novembre 2025" },
    { label: "Mainnet Launch", value: "Q1 2026" },
    { label: "Protocol Layer", value: "Virtuals (AI Infrastructure)" },
  ];

  return (
    <section className="relative overflow-hidden bg-carbon py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(173,255,0,0.08),transparent_65%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <div className="relative rounded-3xl border border-steel/60 bg-graphite/80 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-white">ALIXINDEX100: Autonomous Market Exposure</h3>
            <span className="rounded-full border border-neon/40 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-grey400">
              In Validation
            </span>
          </div>
          <p className="mb-6 text-sm text-grey400">
            Un indice decentralizzato progettato per tracciare la crescita collettiva dei migliori agenti autonomi su Virtuals Protocol. Attualmente in fase di audit e validazione.
          </p>
          <div className="relative h-72 overflow-hidden rounded-2xl border border-steel/60 bg-black/60">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,43,46,0.6)_1px,transparent_1px),linear-gradient(rgba(43,43,46,0.6)_1px,transparent_1px)] bg-[length:36px_36px]" />
            <svg
              className="absolute inset-6 text-neon"
              viewBox="0 0 360 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ADFF00" />
                  <stop offset="1" stopColor="#00FFA3" />
                </linearGradient>
              </defs>
              <path
                d="M0 180 C40 140 80 210 120 150 C160 90 200 200 240 120 C280 40 320 160 360 80"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="120" cy="150" r="5" fill="#ADFF00" />
              <circle cx="240" cy="120" r="5" fill="#00FFA3" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/70 px-5 py-3 text-xs uppercase tracking-[0.25em] text-grey400">
              <span>Coming Soon · ALIXINDEX100 Launch Preview</span>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-steel/70 bg-graphite/80 p-6 shadow-[0_0_20px_rgba(173,255,0,0.08)] backdrop-blur-xl"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-grey400/70">{metric.label}</span>
              <p className="mt-3 font-display text-3xl text-neon">{metric.value}</p>
            </div>
          ))}
          <p className="text-sm text-grey400/80">
            L’indice verrà pubblicato con metodologia, composizione e storico verificabili, accompagnati da controlli di governance e audit continuativi.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustedSection() {
  return (
    <section id="whitepaper" className="relative overflow-hidden bg-graphite py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.12),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center md:px-10">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
          Your Gateway to Autonomous Asset Management
        </h2>
        <p className="max-w-3xl text-lg text-grey400">
          ALIXINDEX100 integra intelligenze autonome e governance on-chain per definire un nuovo paradigma d’investimento, costruito su trasparenza, sicurezza e scalabilità.
        </p>
        <a
          href="#index-live"
          className="inline-flex items-center gap-3 rounded-lg bg-neon px-6 py-3 text-base font-semibold text-carbon transition hover:bg-lime-gradient"
        >
          Leggi la Visione
        </a>
      </div>
    </section>
  );
}
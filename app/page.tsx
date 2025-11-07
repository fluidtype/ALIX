import Image from "next/image";
import Link from "next/link";

import { Header } from "./components/Header";
import { FooterSection } from "./components/FooterSection";
import { LaunchPreviewVideo } from "./components/LaunchPreviewVideo";

export default function LandingPage() {
  return (
    <div className="relative bg-carbon text-grey400">
      <Header />
      <main className="px-6 pt-24 md:px-0 md:pt-28">
        <HeroSection />
        <AboutAlixSection />
        <HowItWorksSection />
        <LiveIndexSection />
        <TrustedSection />
        <RoadmapInvestorsSection />
      </main>
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.08),transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-[120rem] items-center gap-16 px-0 pb-16 pt-10 md:grid-cols-2 md:px-10 md:pt-16 xl:px-16 2xl:px-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-steel/60 bg-graphite/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-grey400/80">
            <span className="h-2 w-2 rounded-full bg-neon" />
            <span>ALIXINDEX100 PRE-LAUNCH</span>
          </div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="block">Own the market,</span>
            <span className="block">don&apos;t chase it.</span>
          </h1>
          <p className="max-w-xl text-lg text-grey400">
            ALIXINDEX100 is the first decentralized index that tracks the top 100 autonomous currencies in the Virtuals ecosystem.
            <br />
            One token delivers diversified exposure, automatically rebalanced every 24 hours with on-chain data.
          </p>
          <div className="space-y-4">
            <a
              href="https://www.alixindex.com"
              className="inline-flex items-center gap-3 rounded-lg bg-neon px-6 py-3 text-base font-semibold text-carbon transition hover:bg-lime-gradient"
            >
              Join the presale
            </a>
            <p className="text-sm text-grey400/80">You&apos;ll be notified when ALIXINDEX100 officially launches.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-steel/60 bg-graphite/60 px-6 py-4 text-sm text-grey400/90">
            <span>Quantstamp audit in progress</span>
            <span className="hidden h-1 w-1 rounded-full bg-steel md:inline-block" />
            <span>100% On-Chain Transparency</span>
            <span className="hidden h-1 w-1 rounded-full bg-steel md:inline-block" />
            <span>Public roadmap 2025–2026</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-24 w-24 rounded-full bg-neonAlt/30 blur-3xl" />
          <div className="relative w-full max-w-[34rem] rounded-3xl border border-steel/80 bg-graphite/80 p-8 backdrop-blur-xl md:ml-[7rem]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-steel/70 bg-black/40 px-4 py-1 text-xs tracking-[0.2em] text-grey400">
              <span className="inline-flex h-2 w-2 items-center justify-center">
                <span className="block h-2 w-2 rounded-full bg-neon" />
              </span>
              <span>Coming Soon · ALIXINDEX100 Launch Preview</span>
            </div>
          <LaunchPreviewVideo />
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Tracked Assets", value: "100" },
                { label: "Rebalance", value: "24h" },
                { label: "Protocol", value: "Virtuals" },
                { label: "Transparency", value: "On-Chain" },
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
    <section id="index" className="border-t border-neon/30 bg-graphite py-16">
      <div className="mx-auto w-full max-w-[120rem] px-0 md:px-10 xl:px-16 2xl:px-24">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="max-w-2xl space-y-6 md:max-w-none">
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">The Role of $ALIX: Governance and Deflationary Utility</h2>
            <p className="text-lg text-grey400">
              $ALIX is the governance and rewards token of the ecosystem. Every deposit into the index generates a 1% fee used to buy back and burn $ALIX, creating a deflationary mechanism that rewards token holders.
            </p>
            <div className="relative mx-auto mt-6 mb-8 w-full max-w-[26rem] -rotate-2 overflow-hidden rounded-[2.25rem] border border-steel/60 bg-black/40 shadow-[0_40px_90px_-50px_rgba(173,255,0,0.55)] transition-all duration-500 hover:rotate-0 hover:shadow-[0_50px_110px_-60px_rgba(173,255,0,0.65)] md:mx-0">
              <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] border border-white/5" />
              <Image
                src="/mockup.png"
                alt="ALIX mobile app mockup"
                width={768}
                height={1024}
                className="relative z-10 h-auto w-full object-contain"
                priority
              />
            </div>
            <ul className="space-y-3 text-base text-grey400">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                <span>Protocol governance: Take part in key decisions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                <span>Deflationary utility: Benefit from the buyback &amp; burn mechanism.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                <span>Exclusive access: Unlock future thematic indexes.</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end md:pl-6">
            <div className="group relative w-full max-w-[34rem] rounded-3xl border border-steel/80 bg-graphite/80 p-8 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.75)] transition-shadow duration-500 backdrop-blur-xl md:max-w-[30rem] lg:max-w-[34rem]">
              <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-neon/15 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-neonAlt/20 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-steel/70 bg-black/40 px-4 py-1 text-[0.7rem] uppercase tracking-[0.28em] text-grey400">
                  <span className="inline-flex h-2 w-2 items-center justify-center">
                    <span className="block h-2 w-2 rounded-full bg-neon" />
                  </span>
                  <span>Rebalance Engine — Preview</span>
                </div>
                <div className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-steel/60">
                  <div className="aspect-[16/9] w-full">
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label="Preview of the ALIX rebalance engine interface"
                    >
                      <source src="/rebalance.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="text-sm text-grey400/70">24h on-chain rebalance • Transparent • Autonomous</p>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5 transition duration-500 group-hover:border-neon/60" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_0_0_rgba(173,255,0,0.0)] transition duration-500 group-hover:shadow-[0_0_60px_rgba(173,255,0,0.25)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: "1️⃣ Deposit $VIRTUALS",
      description: "Deposit the protocol&apos;s native currency, $VIRTUALS, into the decentralized vault.",
      accent: false,
    },
    {
      title: "2️⃣ Receive Index Shares",
      description:
        "The vault instantly mints ALIXINDEX100 shares that represent your exposure to the basket of 100 assets.",
      accent: true,
    },
    {
      title: "3️⃣ Redeem in $VIRTUALS",
      description:
        "Redeem your shares at any time and receive the equivalent in $VIRTUALS at net asset value (NAV).",
      accent: false,
    },
  ];

  return (
    <section id="how-it-works" className="bg-graphite py-16">
      <div className="mx-auto w-full max-w-[120rem] space-y-10 px-0 md:px-10 xl:px-16 2xl:px-24">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">How It Works: A Simple, Autonomous Loop</h2>
        <p className="text-lg text-grey400">
          The mechanism is designed to be intuitive, symmetric, and fully on-chain: Virtuals in → ALIXINDEX100 → Virtuals out.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-steel/60 p-8 transition-all duration-300 ${
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
              <div className="relative flex flex-1 flex-col space-y-4">
                <div>
                  <h3
                    className={`font-display text-2xl font-semibold tracking-tight ${
                      step.accent ? "text-carbon" : "text-white"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <div className="flex-grow">
                  <p className={`text-base ${step.accent ? "text-carbon/80" : "text-grey400"}`}>
                    {step.description}
                  </p>
                </div>
                {step.accent && (
                  <div className="pt-2">
                    <a
                      href="#learn-more"
                      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-carbon"
                    >
                      Learn more →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-grey400/80">
          The ALIXINDEX100 index will operate with verifiable selection criteria and on-chain governance logic.
        </p>
      </div>
    </section>
  );
}

function LiveIndexSection() {
  const metrics = [
    { label: "Quantstamp Audit", value: "In progress" },
    { label: "Testnet Launch", value: "November 2025" },
    { label: "Mainnet Launch", value: "Q1 2026" },
    { label: "Protocol Layer", value: "Virtuals (AI Infrastructure)" },
  ];

  return (
    <section className="relative overflow-hidden bg-carbon py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(173,255,0,0.08),transparent_65%)]" />
      <div className="relative mx-auto grid w-full max-w-[120rem] items-center gap-16 px-0 md:grid-cols-2 md:px-10 xl:px-16 2xl:px-24">
        <div className="relative rounded-3xl border border-steel/60 bg-graphite/80 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-2xl font-semibold text-white">The Index: Selection Criteria &amp; Weights</h3>
            <span className="rounded-full border border-neon/40 bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-grey400">
              In Validation
            </span>
          </div>
          <p className="mb-6 text-sm text-grey400">
            ALIXINDEX100 selects the top 100 tokens in the Virtuals ecosystem using a transparent weighted formula, pulling data from CoinGecko, CoinMarketCap, and Virtuals APIs.
          </p>
          <div className="relative overflow-hidden rounded-2xl border border-steel/60 bg-black/60">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,43,46,0.6)_1px,transparent_1px),linear-gradient(rgba(43,43,46,0.6)_1px,transparent_1px)] bg-[length:36px_36px]" />
            <div className="relative flex aspect-[18/11] w-full items-center justify-center p-6">
              <svg
                className="h-full w-full text-neon"
                viewBox="0 0 360 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
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
            </div>
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
            Weighting is calculated dynamically: 60% market capitalization, 30% trading volume, and 10% liquidity depth.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustedSection() {
  return (
    <section id="whitepaper" className="relative overflow-hidden bg-graphite py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.12),transparent_70%)]" />
      <div className="relative mx-auto flex w-full max-w-[100rem] flex-col items-center gap-8 px-0 text-center md:px-10 xl:px-16 2xl:px-24">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
          The Vision: The Decentralized Exchange of Intelligence
        </h2>
        <p className="max-w-3xl text-lg text-grey400">
          ALIX aims to become a network of autonomous indexes that blends automation, transparency, and community. Not just data to own, but an ecosystem to belong to.
        </p>
        <Link
          href="/whitepaper"
          className="inline-flex items-center gap-3 rounded-lg bg-neon px-6 py-3 text-base font-semibold text-carbon transition hover:bg-lime-gradient"
        >
          Read the Whitepaper
        </Link>
      </div>
    </section>
  );
}

function RoadmapInvestorsSection() {
  const timeline = [
    {
      period: "Day 0",
      objective: "Deploy smart contract & dashboard",
      details: [],
    },
    {
      period: "Week 1",
      objective: "Quantstamp audit + mainnet launch",
      details: [],
    },
    {
      period: "Week 2",
      objective: "Daily snapshots & automated rebalancing",
      details: [],
    },
    {
      period: "Week 3",
      objective: "Integration with the Virtuals Protocol",
      details: [],
    },
  ];

  const launchParameters = [
    { label: "Platform", value: "Virtuals Protocol IAO (Base chain)" },
    { label: "Fixed Supply", value: "1 billion ALIX" },
    { label: "Liquidity", value: "Paired with $VIRTUAL – LP locked 10 years" },
    { label: "Deposit Fee", value: "1% (used for $ALIX buyback & burn)" },
    { label: "Fair Launch", value: "No pre-mine · No insiders · Community-only" },
  ];

  const security = [
    { label: "Audit", value: "Quantstamp – Public report Day 14" },
    {
      label: "Smart Contract",
      value: "Public GitHub (github.com/alix-index) · Verified on Base + Virtuals SDK",
    },
    {
      label: "Closed Loop",
      value: "Index entry and exit exclusively in $VIRTUALS.",
    },
  ];

  const nextPhases = [
    {
      phase: "Phase 2 (2026-2027) — Thematic ETFs",
      timeline: "",
      objective: "Expansion into specialized portfolios such as ALIXMEME50, ALIXGAME30, and ALIXTECH20.",
    },
    {
      phase: "Phase 3 (2027-2028) — User-Created ETFs",
      timeline: "",
      objective: "A platform to build and monetize custom algorithmic indexes.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-steel/60 bg-carbon py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(173,255,0,0.12),transparent_75%)]" />
      <div className="relative mx-auto w-full max-w-[120rem] space-y-12 px-0 md:px-10 xl:px-16 2xl:px-24">
        <div className="pt-12 pb-8">
          <div className="h-1 w-20 bg-lime-gradient" />
          <div className="mt-6">
            <h2 className="font-display text-[1.4rem] font-semibold text-lime-400 md:text-[1.6rem]">
              Evolution Roadmap: From Index to ETF Factory
            </h2>
            <p className="mt-4 max-w-[900px] text-sm leading-relaxed text-neutral-300 md:text-base">
              Fair launch on Virtuals Protocol – IAO Day 30 · Quantstamp audit in progress · Tokenized on Base
            </p>
            <div className="h-px w-full bg-neutral-800/60 mt-6 mb-8" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display text-2xl text-white">Phase 1 — ALIXINDEX100 (2025)</h3>
          </div>
          <div className="flex space-x-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 pb-4 md:grid md:gap-4 md:space-x-0 md:overflow-visible md:p-6 md:pb-6 md:grid-cols-5">
            {timeline.map((item) => (
              <div
                key={item.period}
                className="flex min-w-[250px] flex-col gap-3 rounded-xl border border-neutral-800 bg-black/40 p-4 md:min-w-0"
              >
                <div className="space-y-2">
                  <div className="h-px w-8 bg-lime-400/30" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                    {item.period.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">{item.objective}</h4>
                <div className="space-y-1 text-sm leading-relaxed text-neutral-300">
                  {item.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex w-full justify-center mb-12">
            <div className="inline-flex items-center rounded-full border border-lime-400/40 bg-black/60 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-lime-300">
              DAY 30 • IAO ALIX ACTIVE • INDEX100 LIVE
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Launch Parameters</h3>
            <dl className="space-y-4 text-sm">
              {launchParameters.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">{item.label}</dt>
                  <dd className="text-sm leading-relaxed text-neutral-100">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="text-lg font-medium text-white mb-4">Transparency &amp; Security – Zero Compromises</h3>
            <dl className="space-y-4 text-sm">
              {security.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-neutral-400">{item.label}</dt>
                  <dd className="text-sm leading-relaxed text-neutral-100">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-2xl text-white">Next Phases</h3>
          <div className="divide-y divide-steel/40 overflow-hidden rounded-2xl border border-steel/60 bg-graphite/80">
            {nextPhases.map((item) => (
              <div
                key={item.phase}
                className="flex flex-col gap-3 px-6 py-5 md:grid md:grid-cols-[0.25fr_0.25fr_1fr] md:gap-4"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-neon/80">{item.phase}</span>
                <span className="text-sm uppercase tracking-[0.2em] text-grey400/70">{item.timeline}</span>
                <span className="text-base text-grey400 md:mt-0">{item.objective}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] tracking-wide text-neutral-300">
          <span className="rounded-full border border-neutral-700 bg-black/40 px-3 py-1">Audit: Quantstamp</span>
          <span className="rounded-full border border-neutral-700 bg-black/40 px-3 py-1">LP locked 10 years</span>
          <span className="rounded-full border border-neutral-700 bg-black/40 px-3 py-1">No pre-mine · No insiders</span>
        </div>

      </div>
    </section>
  );
}
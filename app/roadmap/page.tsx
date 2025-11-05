import { FooterSection } from "../components/FooterSection";
import { Header } from "../components/Header";

const containerClass = "mx-auto max-w-6xl px-6 md:px-10";
const cardClass =
  "rounded-2xl border border-steel/70 bg-[rgba(22,22,23,0.82)] p-6 shadow-[0_0_25px_rgba(173,255,0,0.08)] backdrop-blur-xl";
const tableBaseClass = "min-w-full text-left text-sm text-grey400";

const tokenLaunchRows = [
  { parameter: "Platform", detail: "Virtuals Protocol IAO (Base chain)" },
  { parameter: "Fixed Supply", detail: "1 billion ALIX" },
  { parameter: "Liquidity", detail: "Paired with $VIRTUAL – LP locked 10 years" },
  { parameter: "Trading Fee", detail: "1% on every trade (inference + GPU)" },
  { parameter: "Launch", detail: "Day 30: Bonding curve → Graduation → Uniswap LP" },
  { parameter: "Fair Launch", detail: "No pre-mine · No insiders · Community-only" },
];

const transparencyRows = [
  {
    parameter: "Official Audit",
    detail: "Quantstamp (Global top 3) – Public report Day 14",
  },
  {
    parameter: "Smart Contract",
    detail: "Public GitHub (github.com/alix-index) · Verified on Base + Virtuals SDK",
  },
  {
    parameter: "Virtuals Integration",
    detail: "Native IAO: 100 $VIRTUAL fee · 1% fee on agent ops",
  },
];

const roadmapRows = [
  {
    week: "Day 0",
    objective: "IAO preparation",
    milestones: "Agent profile setup · 100 $VIRTUAL fee · Deploy IAO page",
  },
  {
    week: "Week 1",
    objective: "Build the core protocol",
    milestones: "Vault on Base · 1inch Fusion Router · Gelato Keeper · Weight Engine (0.6 MC + 0.3 Vol + 0.1 Liq)",
  },
  {
    week: "Week 2",
    objective: "Security & testnet",
    milestones: "Quantstamp audit · Private beta with 100 testers · Bonding curve tests",
  },
  {
    week: "Week 3",
    objective: "Official IAO launch",
    milestones: "ALIX token minted by Virtuals · Vault deployed · INDEX100 live (top 100 agents feed)",
  },
  {
    week: "Week 4",
    objective: "Activate fees + staking",
    milestones: "1% trading fee + 0.3% protocol fee · Live NAV · Automatic rebalance · ALIX staking active",
  },
];

const day30Rows = [
  {
    feature: "Wallet Gating",
    status: "Access granted only with ≥1 ALIX (on Base)",
  },
  {
    feature: "Deposito ALIX",
    status: "Approve + Deposit → receive INDEX shares",
  },
  {
    feature: "NAV in tempo reale",
    status: "Updated every block (Top 100 Virtuals Agents)",
  },
  {
    feature: "Rebalance automatico",
    status: "Gelato Keeper · trigger >2.5% deviation",
  },
  {
    feature: "Riscatto in ALIX",
    status: "1inch Fusion · MEV-protected · slippage <1.5%",
  },
  {
    feature: "Snapshot storico",
    status: "IPFS + Arweave · immutable",
  },
  {
    feature: "Dashboard v3.0",
    status: "Charts, top 100 agents, personal history, dark neon UI",
  },
  {
    feature: "Virtuals Revenue",
    status: "1% trading fee → agent wallet (inference + GPU)",
  },
];

const feeRows = [
  {
    fee: "0.3% on deposit/redeem",
    destination: "100% to the ALIX Treasury",
  },
  {
    fee: "1% trading fee (Virtuals)",
    destination: "Agent wallet (inference revenue + buyback)",
  },
  {
    fee: "Automatic $ALIX buyback",
    destination: "Day 31 – powered by fees + $VIRTUAL pair",
  },
  {
    fee: "$ALIX staking",
    destination: "50% of fees redistributed to stakers → Real APY",
  },
];

const tvlRows = [
  { tvl: "$5M", reward: "1% of supply" },
  { tvl: "$10M", reward: "2% of supply" },
  { tvl: "$25M", reward: "3% of supply + \"Whale Club\" NFT (Virtuals marketplace)" },
];

const nextStepsRows = [
  {
    phase: "Phase 2",
    timeline: "Month 2–4",
    goal: "MEME100 · TRADE100 · GAME100 – thematic indexes based on Virtuals Agents",
  },
  {
    phase: "Phase 3",
    timeline: "Month 5–8",
    goal: "User-generated index – Build your own on Virtuals IAO (0.1% fee + inference revenue)",
  },
  {
    phase: "Phase 4",
    timeline: "Month 9–12",
    goal: "Cross-chain (Solana) · 2x leverage · Staking v2 with GAME SDK",
  },
];

const investRows = [
  {
    reason: "One of a kind",
    detail: "First decentralized index of autonomous agents on Virtuals",
  },
  {
    reason: "ALIX = Access + Revenue",
    detail: "Access token + 1% fee + governance + staking",
  },
  {
    reason: "Buyback Day 31",
    detail: "0.3% + 1% fee → Treasury → Scarcer ALIX",
  },
  {
    reason: "Quantstamp audit",
    detail: "Bank-grade security on Base",
  },
  {
    reason: "TVL targets",
    detail: "$5M in 30 days · $25M in 90 days",
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-carbon text-grey400">
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="py-16">
          <div className={`${containerClass} space-y-6`}>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              ALIXINDEX100 – PUBLIC ROADMAP FOR INVESTORS
            </h1>
            <div className="space-y-2 text-sm uppercase tracking-[0.25em] text-grey400/80 sm:text-base sm:tracking-[0.35em]">
              <p>
                FAIR LAUNCH ON VIRTUALS PROTOCOL – <span className="text-neon">IAO DAY 30</span>
              </p>
              <p>
                <span className="text-neon">ALIX IN → ALIX OUT</span> – ALWAYS. TOKENIZED AS AN AI AGENT ON BASE.
              </p>
            </div>
            <div className="h-px w-full bg-steel/60" />
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-8`}>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">VISION</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-grey400">
              <p>
                <strong className="text-white">ALIXINDEX100</strong> is the first decentralized index of autonomous agents on
                Virtuals Protocol. It is a self-governing, transparent fund audited by <span className="text-neon">Quantstamp</span>
                that gives anyone holding <span className="text-neon">ALIX</span> (the AI Agent Token on Virtuals, fixed supply 1B)
                exposure to the protocol&apos;s top 100 AI agents – with entry and exit exclusively in
                <span className="text-neon"> ALIX</span>.
              </p>
              <p>
                Virtuals Protocol mints the <span className="text-neon">ALIX</span> token through an Initial Agent Offering (IAO):
                a bonding curve paired with $VIRTUAL, LP locked for 10 years, and a 1% trading fee covering inference/GPU.
                <span className="font-semibold text-neon"> Fair launch – no insiders, no pre-mine.</span>
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-steel/70 bg-[rgba(15,15,16,0.85)] p-6">
              <div className="absolute inset-y-0 left-0 w-1 bg-neon" aria-hidden="true" />
              <div className="relative space-y-3 text-sm text-grey400">
                <p>
                  <span className="font-semibold text-white">Today:</span> IAO preparation (100 $VIRTUAL fee).
                </p>
                <p>
                  <span className="font-semibold text-white">In 30 days:</span> ALIX IAO live + INDEX100 operating + fees active.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                TOKEN LAUNCH – FAIR IAO ON VIRTUALS
              </h2>
              <a
                href="https://www.alixindex.com"
                className="inline-flex text-neon underline decoration-transparent underline-offset-4 transition hover:decoration-neon"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.alixindex.com
              </a>
            </div>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[600px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Parameter</th>
                      <th className="px-5 py-4 font-medium text-grey400">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenLaunchRows.map((row) => (
                      <tr key={row.parameter} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-medium text-white">{row.parameter}</td>
                        <td className="px-5 py-4 text-grey400">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-grey400/70">TGE = Day 30 – IAO live + INDEX100 active.</p>
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              TRANSPARENCY &amp; SECURITY – ZERO COMPROMISES
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[520px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Parameter</th>
                      <th className="px-5 py-4 font-medium text-grey400">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transparencyRows.map((row) => (
                      <tr key={row.parameter} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-medium text-white">{row.parameter}</td>
                        <td className="px-5 py-4 text-grey400">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              30-DAY ROADMAP – AUDITED, NATIVE IAO, ON BASE
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[720px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">WEEK</th>
                      <th className="px-5 py-4 font-medium text-grey400">PRIMARY OBJECTIVE</th>
                      <th className="px-5 py-4 font-medium text-grey400">KEY MILESTONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadmapRows.map((row) => (
                      <tr key={row.week} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-semibold text-white">{row.week}</td>
                        <td className="px-5 py-4 text-grey400">{row.objective}</td>
                        <td className="px-5 py-4 text-grey400">{row.milestones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                DAY 30 – ALIX IAO + INDEX100 ARE LIVE AND PROFITABLE
              </h2>
              <h3 className="font-display text-xl font-semibold text-white">Active Features</h3>
            </div>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[620px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Feature</th>
                      <th className="px-5 py-4 font-medium text-grey400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day30Rows.map((row) => (
                      <tr key={row.feature} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-medium text-white">{row.feature}</td>
                        <td className="px-5 py-4 text-grey400">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold text-white">
                Protocol Fees – ACTIVE FROM DAY 30
              </h3>
              <div className={cardClass}>
                <div className="overflow-x-auto">
                  <table className={`${tableBaseClass} min-w-[520px]`}>
                    <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                      <tr>
                        <th className="px-5 py-4 font-medium text-grey400">Fee</th>
                        <th className="px-5 py-4 font-medium text-grey400">Destination</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeRows.map((row) => (
                        <tr key={row.fee} className="border-b border-steel/40 last:border-b-0">
                          <td className="px-5 py-4 font-medium text-white">{row.fee}</td>
                          <td className="px-5 py-4 text-grey400">{row.destination}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              TVL MILESTONE BONUS – COLLECTIVE INCENTIVE
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[480px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">TVL Achieved</th>
                      <th className="px-5 py-4 font-medium text-grey400">ALIX Airdrop (from Treasury)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tvlRows.map((row) => (
                      <tr key={row.tvl} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-medium text-white">{row.tvl}</td>
                        <td className="px-5 py-4 text-grey400">{row.reward}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-grey400/70">
              Airdrop to ALIX holders (snapshot at milestone achievement).
            </p>
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              NEXT STAGES – BEYOND 30 DAYS
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[680px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Phase</th>
                      <th className="px-5 py-4 font-medium text-grey400">Timeline</th>
                      <th className="px-5 py-4 font-medium text-grey400">Goal + Upside</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nextStepsRows.map((row) => (
                      <tr key={row.phase} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-semibold text-white">{row.phase}</td>
                        <td className="px-5 py-4 text-grey400">{row.timeline}</td>
                        <td className="px-5 py-4 text-grey400">{row.goal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-grey400/70">
              Funded by fees → ALIX buyback → growing, <span className="text-neon">deflationary</span> value.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              WHY INVEST TODAY
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[520px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Reason</th>
                      <th className="px-5 py-4 font-medium text-grey400">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investRows.map((row) => (
                      <tr key={row.reason} className="border-b border-steel/40 last:border-b-0">
                        <td className="px-5 py-4 font-medium text-white">{row.reason}</td>
                        <td className="px-5 py-4 text-grey400">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[rgba(11,11,12,0.9)] py-16">
          <div className={containerClass}>
            <div className="rounded-3xl border border-neon/40 bg-[rgba(12,12,13,0.92)] p-10 shadow-[0_0_35px_rgba(173,255,0,0.18)]">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
                  JOIN THE IAO
                </h2>
                <ul className="space-y-4 border-l border-neon/50 pl-6 text-sm text-grey400">
                  <li>
                    <span className="font-semibold text-white">Day 0:</span> Preparation
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 30:</span> ALIX IAO + INDEX100 live + fees + staking
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 31:</span> Uniswap LP + buyback active
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 365:</span> ALIX becomes the BlackRock of DeFi AI on Virtuals
                  </li>
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href="https://www.alixindex.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-neon px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-carbon shadow-lime transition hover:bg-lime-gradient"
                  >
                    Go to the Presale
                  </a>
                  <p className="text-xs text-grey400/70 sm:text-right">
                    ALIX is not just a token. It&apos;s a tokenized AI Agent on Virtuals – access to the future of decentralized intelligence.
                    Own the index. Earn forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

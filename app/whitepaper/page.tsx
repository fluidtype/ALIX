import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

const containerClass = "mx-auto max-w-6xl px-6 md:px-10";
const cardClass =
  "rounded-2xl border border-steel/70 bg-[rgba(22,22,23,0.82)] p-6 shadow-[0_0_25px_rgba(173,255,0,0.08)] backdrop-blur-xl";
const tableBaseClass = "min-w-full text-left text-sm text-grey400";

const workflowModules = [
  {
    module: "Vault Smart Contract",
    function: "Manages Virtuals deposits and mints/burns ALIXINDEX100 shares.",
  },
  {
    module: "Scheduler (Gelato)",
    function: "Automates the daily autonomous rebalance cycle.",
  },
  {
    module: "Data Fetcher",
    function: "Aggregates market metrics from CoinGecko, CoinMarketCap, and Virtuals API.",
  },
  {
    module: "Weight Calculator",
    function: "Computes the 0.6 / 0.3 / 0.1 weighting model for the index.",
  },
  {
    module: "Rebalancer (1inch Fusion)",
    function: "Executes optimized swaps to realign holdings with targets.",
  },
  {
    module: "Snapshot Manager",
    function: "Publishes timestamped snapshots to Postgres and IPFS.",
  },
  {
    module: "FailSafe Guardian",
    function: "Pauses the system automatically in case of anomalies.",
  },
];

const dailyCycleRows = [
  { time: "00:00", action: "Fetch token data" },
  { time: "00:05", action: "Compute new weights" },
  { time: "00:10", action: "Save public snapshot" },
  { time: "00:15", action: "Update vault targets" },
  { time: "00:20", action: "Execute rebalancing (≤10 swaps)" },
  { time: "00:30", action: "Notify users and refresh UI" },
];

const securityParams = [
  "Maximum slippage: 0.5%",
  "Maximum weight per token: 10%",
  "Minimum liquidity requirement: $50,000",
  "Rebalance deviation threshold: 2.5%",
  "Auto-pause triggered on feed discrepancies or liquidity failure",
];

const currentStatusRows = [
  { phase: "Vault Smart Contract", status: "✅ Completed" },
  { phase: "Autonomous Backend", status: "✅ Stable & tested" },
  { phase: "Web Dashboard", status: "🚧 In development (Next.js + Tailwind)" },
  { phase: "Quantstamp Audit", status: "🕓 In progress" },
  { phase: "Testnet Launch", status: "🔜 Scheduled for November 2025" },
  { phase: "Mainnet Launch", status: "🔜 Following audit completion" },
];

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-carbon text-grey400">
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="border-b border-steel/60 py-16">
          <div className={`${containerClass} space-y-6`}>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              🧠 ALIX — Whitepaper v1.0
            </h1>
            <div className="h-px w-full bg-steel/60" />
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Abstract</h2>
              <p>
                <strong className="text-white">ALIXINDEX100</strong> represents the first fully decentralized index of
                autonomous digital assets, developed and executed on the <span className="text-neon">Virtuals Protocol</span>.
                Its purpose is to provide investors with transparent, algorithmic exposure to the top 100 performing tokens
                within the Virtuals ecosystem — ranked, weighted, and rebalanced automatically using real-time on-chain and
                market data.
              </p>
              <p>The operating logic is straightforward:</p>
              <blockquote className={`${cardClass} border-l-4 border-neon text-base text-grey400`}>
                <p className="font-display text-lg text-white">Virtuals In → ALIXINDEX100 → Virtuals Out</p>
                <p>Entry, management, and exit — all handled autonomously.</p>
              </blockquote>
              <p>
                When a user deposits Virtuals, <strong className="text-white">1%</strong> of the amount is automatically
                allocated to buy back and burn <strong className="text-white">$ALIX</strong>, creating a continuous deflationary
                mechanism. The remaining 99% is deployed to construct and maintain proportional exposure to the top 100 assets
                in the ecosystem.
              </p>
              <p>Index weights are dynamically computed according to the following formula:</p>
              <ul className="space-y-2 text-base leading-relaxed">
                <li>• <strong className="text-white">60%</strong> Market Capitalization</li>
                <li>• <strong className="text-white">30%</strong> Trading Volume</li>
                <li>• <strong className="text-white">10%</strong> Liquidity Depth</li>
              </ul>
              <p>All processes occur autonomously and are fully verifiable on-chain.</p>
            </div>
            <div className="h-px w-full bg-steel/60" />
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">1. Vision</h2>
                <blockquote className="rounded-2xl border border-steel/70 bg-black/40 p-6 text-lg font-semibold text-white">
                  “Own the market, don’t chase it.”
                </blockquote>
                <p>
                  The cryptocurrency landscape evolves at a speed no individual can realistically track. Every day, dozens of
                  tokens emerge, peak, and fade — making active selection both time-consuming and capital-intensive.
                </p>
                <p>
                  <strong className="text-white">ALIXINDEX100</strong> eliminates the need for constant monitoring by offering
                  a single asset that provides diversified, algorithmically balanced exposure to the most relevant, liquid, and
                  active tokens in the Virtuals ecosystem.
                </p>
                <p>
                  In the long term, <strong className="text-white">ALIX</strong> seeks to evolve into a
                  <strong className="text-white"> modular index factory</strong>, enabling users to design, launch, and govern
                  their own algorithmic ETFs. The journey begins with <strong className="text-white">ALIXINDEX100</strong> — the
                  foundational layer for decentralized indexing.
                </p>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">2. Token Model</h2>
              <p>The system operates through two primary assets:</p>
              <ul className="space-y-3 text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Virtuals:</strong> the base currency and entry point of the platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">$ALIX:</strong> the deflationary governance and reward token that benefits
                    from all ecosystem activity.
                  </span>
                </li>
              </ul>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Operational Flow</h3>
                <ol className="space-y-3 text-base leading-relaxed">
                  <li>1. <strong className="text-white">Deposit</strong> — Users deposit Virtuals into the Vault.</li>
                  <li>
                    2. <strong className="text-white">Fee Allocation</strong> — 1% of each deposit is automatically used to buy
                    back and burn $ALIX.
                  </li>
                  <li>
                    3. <strong className="text-white">Minting</strong> — The Vault issues ALIXINDEX100 shares reflecting the live
                    value of the underlying basket.
                  </li>
                  <li>
                    4. <strong className="text-white">Rebalancing</strong> — Asset weights are auto-adjusted daily according to
                    updated index parameters.
                  </li>
                  <li>
                    5. <strong className="text-white">Redemption</strong> — Holders can redeem their shares for Virtuals at the
                    current Net Asset Value (NAV).
                  </li>
                </ol>
                <p>
                  This structure forms a <strong className="text-white">closed, self-sustaining economic loop</strong>, with no
                  reliance on stablecoins or external bridges. Every transaction remains transparent and traceable on-chain.
                </p>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">3. Core Functionality</h2>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🎯 Objective</h3>
                  <p>
                    To create a fully autonomous, on-chain ETF that accurately tracks the top 100 tokens across the Virtuals
                    ecosystem based on liquidity and market relevance.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🔍 Mechanism</h3>
                  <ol className="space-y-3 text-base leading-relaxed">
                    <li>1. Collects market data from CoinGecko, CoinMarketCap, and Virtuals API.</li>
                    <li>2. Ranks all eligible tokens by market capitalization, trading volume, and liquidity depth.</li>
                    <li>3. Selects the top 100 tokens.</li>
                    <li>4. Calculates proportional weights using the 0.6 / 0.3 / 0.1 model.</li>
                    <li>5. Executes optimized swaps through 1inch Fusion to rebalance the Vault.</li>
                    <li>6. Publishes a verifiable snapshot of the new state (timestamp + IPFS hash).</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">📊 User Journey</h3>
                  <ul className="space-y-3 text-base leading-relaxed">
                    <li>• Deposit Virtuals and receive ALIXINDEX100 shares.</li>
                    <li>• Monitor portfolio performance, composition, and NAV via a real-time dashboard.</li>
                    <li>• Redeem shares at any moment to reclaim Virtuals at market value.</li>
                  </ul>
                  <p>Each ALIXINDEX100 token represents a verifiable, fractional exposure to the evolving top-100 basket.</p>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">4. User Interface</h2>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Landing Page</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Hero Section: “Own the market, don’t chase it.”</li>
                  <li>• Connect Wallet button for authentication.</li>
                  <li>• If the wallet contains no Virtuals → access restricted with message prompt.</li>
                  <li>• If Virtuals are present → dashboard access is granted.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Dashboard Features</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• <strong className="text-white">Live NAV</strong>, updated every 15 seconds.</li>
                  <li>• <strong className="text-white">Top-100 composition</strong>: token name, weight %, 24h performance, and market cap.</li>
                  <li>• <strong className="text-white">Deposit Module</strong>: input amount and preview expected shares.</li>
                  <li>• <strong className="text-white">Redemption Module</strong>: instant withdrawal via MEV-protected 1inch Fusion.</li>
                  <li>• <strong className="text-white">User History</strong>: complete record of deposits, withdrawals, P/L %, and transaction hashes.</li>
                  <li>• <strong className="text-white">Public Backend Data</strong>: daily snapshots and transparent vault updates.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">User Notifications</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Visible alerts for deposits, rebalances, and vault status changes.</li>
                  <li>• Daily cycle prompts highlighting key automation steps.</li>
                </ul>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">5. Technical Workflow</h2>
              <div className={`${cardClass} space-y-6`}>
                <h3 className="font-display text-xl font-semibold text-white">Core Modules</h3>
                <div className="overflow-x-auto">
                  <table className={`${tableBaseClass}`}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/2 px-4 py-3 font-semibold text-white">Module</th>
                        <th className="px-4 py-3 font-semibold text-white">Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel/40">
                      {workflowModules.map((row) => (
                        <tr key={row.module} className="hover:bg-black/30">
                          <td className="px-4 py-3 font-semibold text-white">{row.module}</td>
                          <td className="px-4 py-3">{row.function}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${cardClass} space-y-6`}>
                <h3 className="font-display text-xl font-semibold text-white">Daily Cycle (UTC)</h3>
                <div className="overflow-x-auto">
                  <table className={tableBaseClass}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/3 px-4 py-3 font-semibold text-white">Time</th>
                        <th className="px-4 py-3 font-semibold text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel/40">
                      {dailyCycleRows.map((row) => (
                        <tr key={row.time} className="hover:bg-black/30">
                          <td className="px-4 py-3 font-semibold text-white">{row.time}</td>
                          <td className="px-4 py-3">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`${cardClass} space-y-4`}>
                <h3 className="font-display text-xl font-semibold text-white">Security Parameters</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  {securityParams.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">6. Design Principles</h2>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>• <strong className="text-white">Autonomous</strong> — Entirely self-operating with zero manual intervention.</li>
                <li>• <strong className="text-white">Transparent</strong> — Every transaction, swap, and rebalance is traceable on-chain.</li>
                <li>• <strong className="text-white">Accessible</strong> — Open participation for any Virtuals holder.</li>
                <li>• <strong className="text-white">Deflationary</strong> — Continuous $ALIX buybacks driven by system fees.</li>
                <li>• <strong className="text-white">Symmetric</strong> — All operations — entry and exit — occur exclusively in Virtuals.</li>
              </ul>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">7. Evolution Roadmap</h2>
                <div className={`${cardClass} space-y-6`}>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Phase 1 — ALIXINDEX100 (2025)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      Launch of the autonomous top-100 crypto index.
                    </blockquote>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• Deployment of smart contracts and user dashboard.</li>
                      <li>• Quantstamp audit and mainnet rollout.</li>
                      <li>• Automated rebalancing and public snapshot system.</li>
                      <li>• Integration with the Virtuals Protocol infrastructure.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Phase 2 — Thematic ETFs (2026–2027)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      Expansion into specialized algorithmic portfolios.
                    </blockquote>
                    <p>Each index follows the same Virtuals-In → ALIXINDEX-Out operational model:</p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• <strong className="text-white">ALIXMEME50</strong> — Focused on high-traction meme tokens.</li>
                      <li>• <strong className="text-white">ALIXGAME30</strong> — Covering metaverse and gaming projects.</li>
                      <li>• <strong className="text-white">ALIXTECH20</strong> — Dedicated to AI and infrastructure assets.</li>
                      <li>• <strong className="text-white">ALIXDEGEN10</strong> — Experimental high-volatility portfolio.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Phase 3 — User-Generated ETFs (2027–2028)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      Empowering individuals and institutions to launch their own on-chain ETFs.
                    </blockquote>
                    <p>Users will be able to:</p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• Define selection logic (e.g., “top 20 gaming tokens”).</li>
                      <li>• Deploy their ETF on-chain with a single transaction.</li>
                      <li>• Earn protocol fees each time others invest in their index.</li>
                    </ul>
                    <p>
                      This phase transforms ALIX from a single product into a <strong className="text-white">decentralized indexing ecosystem</strong>.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">8. Long-Term Vision</h2>
              <p>
                <strong className="text-white">ALIX</strong> aspires to become the <strong className="text-white">Decentralized Stock Exchange of Intelligence</strong> — a global network of self-governing, algorithmic indexes merging automation, transparency, and collective governance.
              </p>
              <p>
                From AI agents to macro crypto assets, each index under ALIX symbolizes a new form of collective intelligence: a living ecosystem where information, capital, and computation converge.
              </p>
              <p>
                In this vision, <strong className="text-white">ALIX</strong> evolves beyond a protocol — it becomes the native currency of the
                <strong className="text-white"> autonomous digital economy</strong>.
              </p>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">9. Current Development Status</h2>
              <div className={`${cardClass} overflow-hidden`}>
                <div className="overflow-x-auto">
                  <table className={tableBaseClass}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/2 px-4 py-3 font-semibold text-white">Component</th>
                        <th className="px-4 py-3 font-semibold text-white">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel/40">
                      {currentStatusRows.map((row) => (
                        <tr key={row.phase} className="hover:bg-black/30">
                          <td className="px-4 py-3 font-semibold text-white">{row.phase}</td>
                          <td className="px-4 py-3">{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

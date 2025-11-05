import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

const containerClass = "mx-auto max-w-6xl px-6 md:px-10";
const cardClass =
  "rounded-2xl border border-steel/70 bg-[rgba(22,22,23,0.82)] p-6 shadow-[0_0_25px_rgba(173,255,0,0.08)] backdrop-blur-xl";
const tableBaseClass = "min-w-full text-left text-sm text-grey400";

const workflowModules = [
  { module: "Vault Smart Contract", function: "Safekeeps tokens, mints/burns shares." },
  { module: "Scheduler (Gelato)", function: "Starts the autonomous daily cycle." },
  { module: "Data Fetcher", function: "Pulls prices and market caps from APIs." },
  { module: "Weight Calculator", function: "Determines weights based on market cap and volume." },
  { module: "Rebalancer (1inch Fusion)", function: "Realigns the vault with a handful of batch swaps." },
  { module: "Snapshot Manager", function: "Records data on Postgres + IPFS." },
  { module: "FailSafe Guardian", function: "Pauses the system in case of errors or anomalies." },
];

const dailyCycleRows = [
  { time: "00:00 UTC", action: "Fetch token data on Virtuals." },
  { time: "00:05", action: "Calculate new weights." },
  { time: "00:10", action: "Snapshot and publish." },
  { time: "00:15", action: "Update targets in the vault." },
  { time: "00:20", action: "Automatic rebalance (max 10 swaps)." },
  { time: "00:30", action: "Notify users and refresh the UI." },
];

const securityParams = [
  "Max slippage: 0.5%",
  "Max weight per token: 10%",
  "Minimum liquidity: $50k",
  "Rebalance deviation: 2.5%",
  "Automatic pause: triggered by feed errors or thin liquidity.",
];

const currentStatusRows = [
  { phase: "Smart Contract Vault", status: "✅ Completed" },
  { phase: "Autonomous Backend", status: "✅ Stable and tested" },
  { phase: "Web Dashboard", status: "🚧 In development (Next.js + Tailwind)" },
  { phase: "Quantstamp Audit", status: "🕓 In progress" },
  { phase: "Testnet Launch", status: "🔜 November 2025" },
  { phase: "Mainnet Launch", status: "🔜 After final audit" },
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
                <strong className="text-white">ALIXINDEX100</strong> is the first <strong className="text-white">decentralized index of autonomous agents</strong>, built on the
                <span className="text-neon"> Virtuals Protocol</span>. It gives anyone holding the <span className="text-neon">ALIX</span> token direct exposure to the
                <strong className="text-white"> top 100 AI agents</strong> in the ecosystem, ranked by market capitalization and automatically rebalanced every day.
              </p>
              <p>
                ALIXINDEX100 introduces a simple and transparent model:
              </p>
              <blockquote className={`${cardClass} border-l-4 border-neon text-base text-grey400`}> 
                <p className="font-display text-lg text-white">ALIX in → ALIXINDEX100 → ALIX out</p>
                <p>Entry, management, and exit — all in a single token.</p>
              </blockquote>
              <p>
                In this initial phase, the project focuses on one goal: building a <strong className="text-white">fully autonomous on-chain ETF</strong> that tracks the real evolution of the agent market on Virtuals Protocol.
              </p>
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
                  “Own intelligence, don&apos;t chase it.”
                </blockquote>
                <p>
                  In emerging ecosystems like Virtuals, dozens of autonomous agents launch and sunset every day. Finding the best performers is complex, expensive, and time-consuming. ALIXINDEX100 exists to <strong className="text-white">simplify that access</strong>: one token, one action, and automatic exposure to the top 100 AI agents at any given moment.
                </p>
                <p>
                  In the long run, ALIX aims to become an <strong className="text-white">open platform for intelligent ETFs</strong>, where anyone can create and operate a personalized index. The first step — the foundation of everything — is <strong className="text-white">ALIXINDEX100</strong>.
                </p>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">2. The ALIX Token</h2>
              <p>
                <span className="text-neon font-semibold">ALIX</span> is the protocol&apos;s native currency and the only medium of interaction. Every step of the cycle happens in ALIX:
              </p>
              <ul className="space-y-3 text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Deposit:</strong> the user sends ALIX to the vault.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Share issuance:</strong> the vault returns <strong className="text-white">ALIXINDEX100</strong> tokens equivalent to the basket&apos;s current value.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Redeem:</strong> the user returns shares and receives ALIX back at the current NAV.
                  </span>
                </li>
              </ul>
              <p>
                No stablecoins, external assets, or bridges. The entire system is closed, transparent, and measurable on-chain.
              </p>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">3. What ALIXINDEX100 Does (initial phase)</h2>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🎯 Scopo</h3>
                  <p>Build a <strong className="text-white">self-driving ETF</strong> that mirrors the 100 strongest agents on Virtuals Protocol.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🔍 Meccanismo</h3>
                  <ol className="space-y-3 text-base leading-relaxed">
                    <li>1. Every day, an on-chain engine queries CoinGecko and the Virtuals API.</li>
                    <li>2. It sorts all agent-tokens by <strong className="text-white">market cap and liquidity</strong>.</li>
                    <li>3. It selects the <strong className="text-white">top 100</strong>.</li>
                    <li>4. It calculates each token&apos;s percentage weight.</li>
                    <li>5. It updates the vault composition (automated buys/sells).</li>
                    <li>6. It stores a <strong className="text-white">public snapshot</strong> with timestamp, weights, and verifiable hash.</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">📊 Per l’utente</h3>
                  <ul className="space-y-3 text-base leading-relaxed">
                    <li>• Deposit ALIX → receive ALIXINDEX100 shares.</li>
                    <li>• View NAV, top 100 agents, and 24h performance in the dashboard.</li>
                    <li>• Redeem at any time → receive ALIX back.</li>
                  </ul>
                  <p>Each share represents <strong className="text-white">a real fraction of the basket</strong>, which grows or shrinks with the performance of the agent tokens.</p>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">4. User Experience (Frontend)</h2>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Landing Page</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Hero: “Own intelligence, don&apos;t chase it.”</li>
                  <li>• Button: “Connect Wallet”.</li>
                  <li>• If the wallet lacks ALIX → message “Access reserved for ALIX holders.”</li>
                  <li>• Otherwise → access to the platform.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Dashboard</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• <strong className="text-white">Live NAV</strong> (updated every 15s).</li>
                  <li>• <strong className="text-white">Index composition:</strong> table of the top 100 agents, weight %, change, market cap.</li>
                  <li>• <strong className="text-white">ALIX deposit:</strong> modal with amount and estimated shares.</li>
                  <li>• <strong className="text-white">Redeem:</strong> instant ALIX redemption via 1inch Fusion (MEV-protected).</li>
                  <li>• <strong className="text-white">Personal history:</strong> transactions, return %, on-chain links.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">User-facing backend signals</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Daily public snapshots.</li>
                  <li>• “Index updated” banner every 24h.</li>
                  <li>• Live notifications (deposit completed, rebalance executed, vault paused, etc.).</li>
                </ul>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">5. Workflow Tecnico</h2>
              <div className={`${cardClass} space-y-6`}>
                <h3 className="font-display text-xl font-semibold text-white">Core Components</h3>
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
                <h3 className="font-display text-xl font-semibold text-white">Daily Cycle</h3>
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
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">6. Design Philosophy</h2>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>• <strong className="text-white">Autonomous:</strong> everything happens without human intervention.</li>
                <li>• <strong className="text-white">Transparent:</strong> every weight, swap, and rebalance is visible on-chain.</li>
                <li>• <strong className="text-white">Accessible:</strong> owning ALIX is all you need to participate.</li>
                <li>• <strong className="text-white">Resilient:</strong> 24/7 guardian with pause capability.</li>
                <li>• <strong className="text-white">Symmetric:</strong> every entry in ALIX → exit in ALIX.</li>
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
                      The index of autonomous agents.
                    </blockquote>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• Deploy smart contract and dashboard.</li>
                      <li>• Quantstamp audit and mainnet launch.</li>
                      <li>• Public snapshots and daily rebalancing.</li>
                      <li>• Partnership with the Virtuals Protocol.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Phase 2 — Sector ETFs (2026–2027)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      From the autonomous mind to on-chain diversification.
                    </blockquote>
                    <p>
                      Creation of thematic ETFs, all built on the same ALIX in/out logic:
                    </p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• <strong className="text-white">ALIXMEME50</strong> — high-virality memecoins and trends.</li>
                      <li>• <strong className="text-white">ALIXGAME30</strong> — gaming and metaverse projects.</li>
                      <li>• <strong className="text-white">ALIXTECH20</strong> — AI infrastructure and base protocols.</li>
                      <li>• <strong className="text-white">ALIXDEGEN10</strong> — daily high-volatility portfolio.</li>
                    </ul>
                    <p>
                      Each ETF rebalanced on-chain with autonomous logic, all accessible only through ALIX.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Phase 3 — User-Created ETFs (2027–2028)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      “Anyone can create their own index. And earn.”
                    </blockquote>
                    <p>
                      ALIX will evolve into an <strong className="text-white">open-index</strong> platform where anyone can:
                    </p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• create their own ETF,</li>
                      <li>• define selection rules (e.g., top 20 gaming agents, top memecoins of the week),</li>
                      <li>• deploy it on-chain with a click,</li>
                      <li>• and earn <strong className="text-white">automatic fees</strong> from every user who buys shares of their ETF.</li>
                    </ul>
                    <p>
                      The more people invest in a user&apos;s index, the more fees its creator earns. This unlocks an <strong className="text-white">ecosystem of autonomous, self-managed ETFs</strong>, powered entirely by ALIX.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">8. Final Vision</h2>
              <p>
                ALIX aims to become the <strong className="text-white">Decentralized Exchange of Intelligence</strong>: a network of indexes blending automation, transparency, and community.
              </p>
              <p>
                From <strong className="text-white">autonomous agents</strong> to <strong className="text-white">social trends</strong> and <strong className="text-white">emerging markets</strong>, every ETF built on ALIX will embody a new form of collective on-chain intelligence.
              </p>
              <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-6 text-base text-grey400">
                Where intelligence isn&apos;t just an asset to buy,
                <br /> but an ecosystem to participate in.
              </blockquote>
              <p className="font-display text-xl font-semibold text-white">ALIX will be the currency of the new autonomous economy.</p>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">9. Current Status</h2>
              <div className={`${cardClass} overflow-hidden`}> 
                <div className="overflow-x-auto">
                  <table className={tableBaseClass}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/2 px-4 py-3 font-semibold text-white">Phase</th>
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
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">10. Contact</h2>
              <div className={`${cardClass} space-y-4 text-base leading-relaxed`}> 
                <p>
                  🌐 <strong className="text-white">alixindex100.ai</strong>
                </p>
                <p>
                  💬 Telegram / Discord: <strong className="text-white">@ALIXProtocol</strong>
                </p>
                <p>
                  📜 Docs: <strong className="text-white">docs.alixindex100.ai</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}


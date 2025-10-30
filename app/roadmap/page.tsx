import { FooterSection } from "../components/FooterSection";
import { Header } from "../components/Header";

const containerClass = "mx-auto max-w-6xl px-6 md:px-10";
const cardClass =
  "rounded-2xl border border-steel/70 bg-[rgba(22,22,23,0.82)] p-6 shadow-[0_0_25px_rgba(173,255,0,0.08)] backdrop-blur-xl";
const tableBaseClass = "min-w-full text-left text-sm text-grey400";

const tokenLaunchRows = [
  { parameter: "Piattaforma", detail: "Virtuals Protocol IAO (Base chain)" },
  { parameter: "Supply Fisso", detail: "1 miliardo ALIX" },
  { parameter: "Liquidity", detail: "Paired con $VIRTUAL – LP locked 10 anni" },
  { parameter: "Trading Fee", detail: "1% su ogni trade (inference + GPU)" },
  { parameter: "Launch", detail: "Day 30: Bonding curve → Graduation → Uniswap LP" },
  { parameter: "Fair Launch", detail: "No pre-mine · No insiders · Community-only" },
];

const transparencyRows = [
  {
    parameter: "Audit Ufficiale",
    detail: "Quantstamp (Top 3 mondiale) – Report pubblico Day 14",
  },
  {
    parameter: "Smart Contract",
    detail: "GitHub pubblico (github.com/alix-index) · Verified su Base + Virtuals SDK",
  },
  {
    parameter: "Virtuals Integration",
    detail: "IAO nativo: 100 $VIRTUAL fee · 1% fee su agent ops",
  },
];

const roadmapRows = [
  {
    week: "Day 0",
    objective: "Preparazione IAO",
    milestones: "Setup profilo agente · 100 $VIRTUAL fee · Deploy pagina IAO",
  },
  {
    week: "Settimana 1",
    objective: "Costruzione del Core Protocol",
    milestones: "Vault su Base · 1inch Fusion Router · Gelato Keeper · Weight Engine (0.6 MC + 0.3 Vol + 0.1 Liq)",
  },
  {
    week: "Settimana 2",
    objective: "Sicurezza & Testnet",
    milestones: "Audit Quantstamp · Beta privata con 100 tester · Test bonding curve",
  },
  {
    week: "Settimana 3",
    objective: "Lancio Ufficiale IAO",
    milestones: "Token ALIX generato da Virtuals · Deploy Vault · INDEX100 live (feed top 100 agents)",
  },
  {
    week: "Settimana 4",
    objective: "Attivazione Fee + Staking",
    milestones: "1% trading fee + 0.3% protocol fee · NAV live · Rebalance automatico · Staking ALIX attivo",
  },
];

const day30Rows = [
  {
    feature: "Wallet Gating",
    status: "Accesso solo con ≥1 ALIX (su Base)",
  },
  {
    feature: "Deposito ALIX",
    status: "Approve + Deposit → ricevi quote INDEX",
  },
  {
    feature: "NAV in tempo reale",
    status: "Aggiornato ogni blocco (Top 100 Virtuals Agents)",
  },
  {
    feature: "Rebalance automatico",
    status: "Gelato Keeper · trigger >2.5% deviazione",
  },
  {
    feature: "Riscatto in ALIX",
    status: "1inch Fusion · MEV-protected · slippage <1.5%",
  },
  {
    feature: "Snapshot storico",
    status: "IPFS + Arweave · immutabile",
  },
  {
    feature: "Dashboard v3.0",
    status: "Grafici, top 100 agenti, storico personale, dark neon UI",
  },
  {
    feature: "Virtuals Revenue",
    status: "1% trading fee → agent wallet (inference + GPU)",
  },
];

const feeRows = [
  {
    fee: "0.3% su deposito/redeem",
    destination: "100% al Treasury ALIX",
  },
  {
    fee: "1% trading fee (Virtuals)",
    destination: "Agent wallet (inference revenue + buyback)",
  },
  {
    fee: "Buyback automatico ALIX",
    destination: "Day 31 – alimentato da fee + $VIRTUAL pair",
  },
  {
    fee: "Staking ALIX",
    destination: "50% delle fee redistribuite agli staker → APY reale",
  },
];

const tvlRows = [
  { tvl: "$5M", reward: "1% del supply" },
  { tvl: "$10M", reward: "2% del supply" },
  { tvl: "$25M", reward: "3% del supply + NFT \"Whale Club\" (Virtuals marketplace)" },
];

const nextStepsRows = [
  {
    phase: "Fase 2",
    timeline: "Mese 2–4",
    goal: "MEME100 · TRADE100 · GAME100 – indici tematici basati su Virtuals Agents",
  },
  {
    phase: "Fase 3",
    timeline: "Mese 5–8",
    goal: "User-Generated Index – Crea il tuo indice su Virtuals IAO (0.1% fee + inference revenue)",
  },
  {
    phase: "Fase 4",
    timeline: "Mese 9–12",
    goal: "Cross-chain (Solana) · Leverage 2x · Staking v2 con GAME SDK",
  },
];

const investRows = [
  {
    reason: "Unico al mondo",
    detail: "Primo indice decentralizzato di agenti autonomi su Virtuals",
  },
  {
    reason: "ALIX = Access + Revenue",
    detail: "Token di accesso + 1% fee + governance + staking",
  },
  {
    reason: "Buyback Day 31",
    detail: "0.3% + 1% fee → Treasury → ALIX più scarso",
  },
  {
    reason: "Audit Quantstamp",
    detail: "Sicurezza bancaria su Base",
  },
  {
    reason: "TVL Target",
    detail: "$5M in 30 gg · $25M in 90 gg",
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
              ALIXINDEX100 – ROADMAP PUBBLICA PER INVESTITORI
            </h1>
            <div className="space-y-2 text-sm uppercase tracking-[0.25em] text-grey400/80 sm:text-base sm:tracking-[0.35em]">
              <p>
                FAIR LAUNCH SU VIRTUALS PROTOCOL – <span className="text-neon">IAO DAY 30</span>
              </p>
              <p>
                <span className="text-neon">ALIX IN → ALIX OUT</span> – SEMPRE. TOKENIZZATO COME AI AGENT SU BASE.
              </p>
            </div>
            <div className="h-px w-full bg-steel/60" />
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-8`}>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">VISIONE</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-grey400">
              <p>
                <strong className="text-white">ALIXINDEX100</strong> è il primo indice decentralizzato di agenti autonomi su
                Virtuals Protocol. Un fondo autonomo, trasparente, auditato da <span className="text-neon">Quantstamp</span>, che
                permette a chiunque possieda <span className="text-neon">ALIX</span> (AI Agent Token su Virtuals, supply fisso 1B)
                di ottenere esposizione ai 100 migliori agenti AI del protocollo – con entrata e uscita esclusivamente in
                <span className="text-neon"> ALIX</span>.
              </p>
              <p>
                Virtuals Protocol genera il token <span className="text-neon">ALIX</span> tramite Initial Agent Offering (IAO):
                bonding curve paired con $VIRTUAL, LP locked 10 anni, 1% trading fee per inference/GPU.
                <span className="font-semibold text-neon"> Fair launch – no insiders, no pre-mine.</span>
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-steel/70 bg-[rgba(15,15,16,0.85)] p-6">
              <div className="absolute inset-y-0 left-0 w-1 bg-neon" aria-hidden="true" />
              <div className="relative space-y-3 text-sm text-grey400">
                <p>
                  <span className="font-semibold text-white">Oggi:</span> Preparazione IAO (100 $VIRTUAL fee).
                </p>
                <p>
                  <span className="font-semibold text-white">Tra 30 giorni:</span> IAO ALIX live + INDEX100 operativo + fee attive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                TOKEN LAUNCH – FAIR IAO SU VIRTUALS
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
                      <th className="px-5 py-4 font-medium text-grey400">Parametro</th>
                      <th className="px-5 py-4 font-medium text-grey400">Dettaglio</th>
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
            <p className="text-xs uppercase tracking-[0.2em] text-grey400/70">TGE = Day 30 – IAO live + INDEX100 attivo.</p>
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              TRASPARENZA &amp; SICUREZZA – ZERO COMPROMESSI
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[520px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Parametro</th>
                      <th className="px-5 py-4 font-medium text-grey400">Dettaglio</th>
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
              ROADMAP 30 GIORNI – AUDITATA, IAO NATIVE, SU BASE
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[720px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">SETTIMANA</th>
                      <th className="px-5 py-4 font-medium text-grey400">OBIETTIVO PRINCIPALE</th>
                      <th className="px-5 py-4 font-medium text-grey400">MILESTONE CHIAVE</th>
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
                DAY 30 – IAO ALIX + INDEX100 È LIVE E REDDITIZIO
              </h2>
              <h3 className="font-display text-xl font-semibold text-white">Funzionalità Attive</h3>
            </div>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[620px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Funzionalità</th>
                      <th className="px-5 py-4 font-medium text-grey400">Stato</th>
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
                Fee del Protocollo – ATTIVE DAL DAY 30
              </h3>
              <div className={cardClass}>
                <div className="overflow-x-auto">
                  <table className={`${tableBaseClass} min-w-[520px]`}>
                    <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                      <tr>
                        <th className="px-5 py-4 font-medium text-grey400">Fee</th>
                        <th className="px-5 py-4 font-medium text-grey400">Destinazione</th>
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
              TVL MILESTONE BONUS – INCENTIVO COLLETTIVO
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[480px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">TVL Raggiunto</th>
                      <th className="px-5 py-4 font-medium text-grey400">Airdrop ALIX (dal Treasury)</th>
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
              Airdrop ai detentori ALIX (snapshot al raggiungimento).
            </p>
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              PROSSIME FASI – OLTRE I 30 GIORNI
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[680px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Fase</th>
                      <th className="px-5 py-4 font-medium text-grey400">Timeline</th>
                      <th className="px-5 py-4 font-medium text-grey400">Obiettivo + Upside</th>
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
              Finanziato da fee → buyback ALIX → valore crescente e <span className="text-neon">deflattivo</span>.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className={`${containerClass} space-y-6`}>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              PERCHÉ INVESTIRE OGGI
            </h2>
            <div className={cardClass}>
              <div className="overflow-x-auto">
                <table className={`${tableBaseClass} min-w-[520px]`}>
                  <thead className="bg-graphite/80 text-xs uppercase tracking-[0.25em] text-grey400/80">
                    <tr>
                      <th className="px-5 py-4 font-medium text-grey400">Motivo</th>
                      <th className="px-5 py-4 font-medium text-grey400">Dettaglio</th>
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
                  PARTECIPA ALL&rsquo;IAO
                </h2>
                <ul className="space-y-4 border-l border-neon/50 pl-6 text-sm text-grey400">
                  <li>
                    <span className="font-semibold text-white">Day 0:</span> Preparazione
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 30:</span> IAO ALIX + INDEX100 live + fee + staking
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 31:</span> LP Uniswap + buyback attivo
                  </li>
                  <li>
                    <span className="font-semibold text-white">Day 365:</span> ALIX = il BlackRock della DeFi AI su Virtuals
                  </li>
                </ul>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href="https://www.alixindex.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-neon px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-carbon shadow-lime transition hover:bg-lime-gradient"
                  >
                    Vai alla Prevendita
                  </a>
                  <p className="text-xs text-grey400/70 sm:text-right">
                    ALIX non è un token. È un AI Agent tokenizzato su Virtuals – accesso al futuro dell’intelligenza decentralizzata.
                    Possiedi l’indice. Guadagna per sempre.
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

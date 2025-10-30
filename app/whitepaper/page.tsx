import { Header } from "../components/Header";
import { FooterSection } from "../components/FooterSection";

const containerClass = "mx-auto max-w-6xl px-6 md:px-10";
const cardClass =
  "rounded-2xl border border-steel/70 bg-[rgba(22,22,23,0.82)] p-6 shadow-[0_0_25px_rgba(173,255,0,0.08)] backdrop-blur-xl";
const tableBaseClass = "min-w-full text-left text-sm text-grey400";

const workflowModules = [
  { module: "Vault Smart Contract", function: "Custodisce token, emette/brucia quote." },
  { module: "Scheduler (Gelato)", function: "Avvia ciclo giornaliero automatico." },
  { module: "Data Fetcher", function: "Recupera prezzi e market cap da API." },
  { module: "Weight Calculator", function: "Determina pesi in base a capitalizzazione e volume." },
  { module: "Rebalancer (1inch Fusion)", function: "Riallinea il Vault con pochi swap batch." },
  { module: "Snapshot Manager", function: "Registra i dati su Postgres + IPFS." },
  { module: "FailSafe Guardian", function: "Pausa il sistema in caso di errore o anomalia." },
];

const dailyCycleRows = [
  { time: "00:00 UTC", action: "Fetch dati token su Virtuals." },
  { time: "00:05", action: "Calcolo pesi nuovi." },
  { time: "00:10", action: "Snapshot e salvataggio pubblico." },
  { time: "00:15", action: "Aggiornamento target nel Vault." },
  { time: "00:20", action: "Rebalance automatico (max 10 swap)." },
  { time: "00:30", action: "Notifica utenti e aggiornamento UI." },
];

const securityParams = [
  "Slippage max: 0.5%",
  "Peso max per token: 10%",
  "Liquidità minima: $50k",
  "Deviazione rebalance: 2.5%",
  "Pausa automatica: in caso di errore feed o bassa liquidità.",
];

const currentStatusRows = [
  { phase: "Smart Contract Vault", status: "✅ Completato" },
  { phase: "Backend Autonomo", status: "✅ Stabile e testato" },
  { phase: "Dashboard Web", status: "🚧 In sviluppo (Next.js + Tailwind)" },
  { phase: "Audit Quantstamp", status: "🕓 In corso" },
  { phase: "Testnet Launch", status: "🔜 Novembre 2025" },
  { phase: "Mainnet Launch", status: "🔜 Dopo audit finale" },
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
                <strong className="text-white">ALIXINDEX100</strong> è il primo <strong className="text-white">indice decentralizzato di agenti autonomi</strong>, costruito su
                <span className="text-neon"> Virtuals Protocol</span>. Permette a chi possiede il token <span className="text-neon">ALIX</span> di ottenere esposizione diretta ai
                <strong className="text-white"> 100 migliori agenti AI</strong> dell’ecosistema, ordinati per capitalizzazione e ribilanciati automaticamente ogni giorno.
              </p>
              <p>
                ALIXINDEX100 introduce un modello semplice e trasparente:
              </p>
              <blockquote className={`${cardClass} border-l-4 border-neon text-base text-grey400`}> 
                <p className="font-display text-lg text-white">ALIX in → ALIXINDEX100 → ALIX out</p>
                <p>Entrata, gestione e uscita — tutto in un unico token.</p>
              </blockquote>
              <p>
                In questa fase iniziale, il progetto si concentra su un solo obiettivo: creare un <strong className="text-white">ETF on-chain completamente autonomo</strong> che segua l’evoluzione reale del mercato degli agenti su Virtuals Protocol.
              </p>
            </div>
            <div className="h-px w-full bg-steel/60" />
          </div>
        </section>

        <section className="border-y border-steel/60 bg-graphite/60 py-16">
          <div className={`${containerClass} space-y-8`}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">1. Visione</h2>
                <blockquote className="rounded-2xl border border-steel/70 bg-black/40 p-6 text-lg font-semibold text-white">
                  “Possiedi l’intelligenza, non inseguirla.”
                </blockquote>
                <p>
                  Negli ecosistemi emergenti come Virtuals, ogni giorno nascono e muoiono decine di agenti autonomi. Individuare quelli migliori è complesso, costoso e dispersivo. ALIXINDEX100 nasce per <strong className="text-white">semplificare questo accesso</strong>: un solo token, una sola azione, e l’esposizione automatica ai 100 migliori agenti AI del momento.
                </p>
                <p>
                  A lungo termine, ALIX mira a trasformarsi in una <strong className="text-white">piattaforma aperta di ETF intelligenti</strong>, dove chiunque potrà creare e gestire il proprio indice personalizzato. Ma il primo passo — la base di tutto — è <strong className="text-white">ALIXINDEX100</strong>.
                </p>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">2. Il Token ALIX</h2>
              <p>
                <span className="text-neon font-semibold">ALIX</span> è la valuta nativa del protocollo e l’unico mezzo di interazione. Ogni fase del ciclo avviene in ALIX:
              </p>
              <ul className="space-y-3 text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Deposito:</strong> l’utente invia ALIX al Vault.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Emissione quote:</strong> il Vault restituisce token <strong className="text-white">ALIXINDEX100</strong> equivalenti al valore attuale del paniere.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-neon" />
                  <span>
                    <strong className="text-white">Riscatto:</strong> l’utente restituisce le quote e riceve ALIX indietro al valore NAV del momento.
                  </span>
                </li>
              </ul>
              <p>
                Non esistono stablecoin, asset esterni o bridge. L’intero sistema è chiuso, trasparente e misurabile on-chain.
              </p>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">3. Cosa Fa ALIXINDEX100 (fase iniziale)</h2>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🎯 Scopo</h3>
                  <p>Creare un <strong className="text-white">ETF autonomo</strong> che replica i 100 agenti più forti su Virtuals Protocol.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">🔍 Meccanismo</h3>
                  <ol className="space-y-3 text-base leading-relaxed">
                    <li>1. Ogni giorno, un motore on-chain interroga CoinGecko e l’API Virtuals.</li>
                    <li>2. Ordina tutti i token-agenti per <strong className="text-white">market cap e liquidità</strong>.</li>
                    <li>3. Seleziona i <strong className="text-white">top 100</strong>.</li>
                    <li>4. Calcola il peso percentuale di ciascun token.</li>
                    <li>5. Aggiorna la composizione del Vault (acquisti/vendite automatiche).</li>
                    <li>6. Salva uno <strong className="text-white">snapshot pubblico</strong> con timestamp, pesi e hash verificabile.</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-white">📊 Per l’utente</h3>
                  <ul className="space-y-3 text-base leading-relaxed">
                    <li>• Deposita ALIX → riceve quote ALIXINDEX100.</li>
                    <li>• Vede in dashboard il NAV, i 100 agenti in portafoglio e la loro variazione 24h.</li>
                    <li>• Può riscattare in qualsiasi momento → riceve di nuovo ALIX.</li>
                  </ul>
                  <p>Ogni quota rappresenta <strong className="text-white">una frazione reale del paniere</strong>, che cresce o diminuisce con l’andamento dei token-agenti.</p>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">4. Esperienza Utente (Frontend)</h2>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Landing Page</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Hero: “Possiedi l’intelligenza, non inseguirla.”</li>
                  <li>• Pulsante “Connetti Wallet”.</li>
                  <li>• Se il wallet non possiede ALIX → messaggio “Accesso riservato ai possessori di ALIX.”</li>
                  <li>• Se sì → accesso alla piattaforma.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Dashboard</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• <strong className="text-white">NAV live</strong> (aggiornato ogni 15s).</li>
                  <li>• <strong className="text-white">Composizione dell’indice:</strong> tabella top 100 agenti, peso %, variazione, market cap.</li>
                  <li>• <strong className="text-white">Deposito ALIX:</strong> modale con quantità e stima quote.</li>
                  <li>• <strong className="text-white">Riscatto:</strong> redeem immediato in ALIX via 1inch Fusion (MEV-protected).</li>
                  <li>• <strong className="text-white">Storico personale:</strong> transazioni, rendimento %, link on-chain.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-white">Backend visibile all’utente</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>• Snapshot giornalieri pubblici.</li>
                  <li>• Banner “Indice aggiornato” ogni 24h.</li>
                  <li>• Notifiche live (deposito completato, rebalance eseguito, vault in pausa, ecc.).</li>
                </ul>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">5. Workflow Tecnico</h2>
              <div className={`${cardClass} space-y-6`}>
                <h3 className="font-display text-xl font-semibold text-white">Composizione Principale</h3>
                <div className="overflow-x-auto">
                  <table className={`${tableBaseClass}`}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/2 px-4 py-3 font-semibold text-white">Modulo</th>
                        <th className="px-4 py-3 font-semibold text-white">Funzione</th>
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
                <h3 className="font-display text-xl font-semibold text-white">Ciclo Giornaliero</h3>
                <div className="overflow-x-auto">
                  <table className={tableBaseClass}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/3 px-4 py-3 font-semibold text-white">Orario</th>
                        <th className="px-4 py-3 font-semibold text-white">Azione</th>
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
                <h3 className="font-display text-xl font-semibold text-white">Parametri di Sicurezza</h3>
                <ul className="space-y-2 text-base leading-relaxed">
                  {securityParams.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">6. Filosofia di Design</h2>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>• <strong className="text-white">Autonomo:</strong> tutto accade senza intervento umano.</li>
                <li>• <strong className="text-white">Trasparente:</strong> ogni peso, swap e rebalance è visibile on-chain.</li>
                <li>• <strong className="text-white">Accessibile:</strong> basta possedere ALIX per partecipare.</li>
                <li>• <strong className="text-white">Resiliente:</strong> guardian attivo h24 con funzione di pausa.</li>
                <li>• <strong className="text-white">Simmetrico:</strong> ogni entrata in ALIX → uscita in ALIX.</li>
              </ul>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">7. Roadmap Evolutiva</h2>
                <div className={`${cardClass} space-y-6`}>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Fase 1 — ALIXINDEX100 (2025)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      L’indice degli agenti autonomi.
                    </blockquote>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• Deploy smart contract e dashboard.</li>
                      <li>• Audit Quantstamp e lancio mainnet.</li>
                      <li>• Snapshot pubblici e ribilanciamento giornaliero.</li>
                      <li>• Partnership con Virtuals Protocol.</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Fase 2 — ETF Settoriali (2026–2027)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      Dalla mente autonoma alla diversificazione on-chain.
                    </blockquote>
                    <p>
                      Creazione di nuovi ETF tematici, tutti basati sulla stessa logica ALIX in/out:
                    </p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• <strong className="text-white">ALIXMEME50</strong> — memecoin e trend ad alta viralità.</li>
                      <li>• <strong className="text-white">ALIXGAME30</strong> — progetti di gaming e metaverso.</li>
                      <li>• <strong className="text-white">ALIXTECH20</strong> — infrastrutture AI e protocolli di base.</li>
                      <li>• <strong className="text-white">ALIXDEGEN10</strong> — portafoglio high-volatility giornaliero.</li>
                    </ul>
                    <p>
                      Ogni ETF ribilanciato on-chain con logica autonoma, tutti accessibili solo tramite ALIX.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-white">Fase 3 — ETF Creati dagli Utenti (2027–2028)</h3>
                    <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-5 text-base text-grey400">
                      “Chiunque può creare il proprio indice. E guadagnare.”
                    </blockquote>
                    <p>
                      ALIX evolverà in una piattaforma <strong className="text-white">open-index</strong>, dove chiunque potrà:
                    </p>
                    <ul className="space-y-2 text-base leading-relaxed">
                      <li>• creare il proprio ETF,</li>
                      <li>• definire le regole di selezione (es. top 20 agenti gaming, top memecoin di settimana),</li>
                      <li>• deployarlo on-chain con un click,</li>
                      <li>• e guadagnare <strong className="text-white">fee automatiche</strong> da ogni utente che acquista quote del proprio ETF.</li>
                    </ul>
                    <p>
                      Più persone investono nell’indice dell’utente, più fee l’autore guadagna. Nascerà così un <strong className="text-white">ecosistema di ETF autonomi e auto-gestiti</strong>, alimentato interamente da ALIX.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">8. Visione Finale</h2>
              <p>
                ALIX punta a diventare la <strong className="text-white">Borsa Decentralizzata dell’intelligenza</strong>: una rete di indici che unisce automazione, trasparenza e community.
              </p>
              <p>
                Dagli <strong className="text-white">agenti autonomi</strong>, ai <strong className="text-white">trend sociali</strong>, fino ai <strong className="text-white">mercati emergenti</strong>, ogni ETF creato su ALIX rappresenterà una nuova forma di intelligenza collettiva on-chain.
              </p>
              <blockquote className="rounded-2xl border border-steel/60 bg-black/40 p-6 text-base text-grey400">
                Dove l’intelligenza non è un asset da comprare,
                <br /> ma un ecosistema in cui partecipare.
              </blockquote>
              <p className="font-display text-xl font-semibold text-white">ALIX sarà la moneta della nuova economia autonoma.</p>
              <div className="h-px w-full bg-steel/60" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">9. Stato Attuale</h2>
              <div className={`${cardClass} overflow-hidden`}> 
                <div className="overflow-x-auto">
                  <table className={tableBaseClass}>
                    <thead className="text-xs uppercase tracking-[0.25em] text-grey400">
                      <tr className="bg-graphite/80 text-grey400">
                        <th className="w-1/2 px-4 py-3 font-semibold text-white">Fase</th>
                        <th className="px-4 py-3 font-semibold text-white">Stato</th>
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
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">10. Contatti</h2>
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


# ALIX

## Panoramica del Progetto
ALIXINDEX100 è una piattaforma decentralizzata che permette ai possessori del token ALIX di ottenere esposizione ai 100 migliori agenti autonomi sul mercato. L'intero flusso, dall'accesso al riscatto, è pensato per garantire un'esperienza "ALIX in ingresso → ALIX in uscita" senza eccezioni.

Questa documentazione descrive il workflow completo (versione 3.0) che guiderà lo sviluppo dell'applicazione frontend e dell'infrastruttura backend. Manteniamo questo README come riferimento principale in modo che tutto il team abbia sempre chiaro il funzionamento previsto di ALIX.

---

## Workflow Completo — ALIXINDEX100 User Journey (v3.0)

### Fase 0 — L'Ingresso (Landing Pubblica)
**Situazione:** l'utente visita il sito ufficiale senza aver ancora collegato il wallet.

**Cosa vede:**
1. **Hero Section**
   - Titolo: "Possiedi l'intelligenza, non inseguirla."
   - Sottotitolo: "Indice dei 100 migliori agenti autonomi. Accesso riservato ai possessori di ALIX."
   - Pulsante primario: "Partecipa alla Prevendita" (se in prevendita) oppure "Accedi alla piattaforma" (se live).
   - Microtesto: "Accesso riservato ai possessori di ALIX."
   - Contatore live aggiornato ogni 30 secondi: "12.847 detentori · NAV: 1.027 ALIX · TVL: $12.4M".
2. **Navigazione superiore (Header)**
   - Logo ALIX (lime neon, cliccabile → home).
   - Menu: Home · Indice · Come funziona · Whitepaper.
   - Pulsante "Connetti Wallet" sempre visibile che, dopo la connessione, mostra l'indirizzo accorciato.
3. **Sezioni successive**
   - "Cos'è ALIXINDEX100": spiegazione del token e dell'indice.
   - "Come funziona": tre step visuali (Acquista ALIX → Deposita nel Vault → Riscatta in ALIX).
   - "Indice in azione": grafico NAV 30 giorni, top 5 agenti, dati reali.
   - "Trusted Platform": call-to-action "Esplora l'indice live".
4. **Footer** con link a Docs, Telegram, Discord, X e disclaimer legale.

### Fase 1 — Connessione (Wallet Connect + Gating)
**Obiettivo:** consentire l'accesso solo ai wallet con almeno 1 ALIX.

**Flow:**
1. Click su "Connetti Wallet" → modal (WalletConnect, MetaMask, ecc.).
2. Lettura `balanceOf(wallet, ALIX_ADDRESS)` su Virtuals Protocol.
3. Se il saldo è inferiore a 1 ALIX: overlay con messaggio "Accesso riservato ai possessori di ALIX" e pulsante "Acquista ALIX".
4. Se il saldo è uguale o superiore a 1 ALIX: accesso sbloccato, redirect automatico a `/app` e header con indirizzo abbreviato.

### Fase 2 — Dashboard (Home Interna dell'App)
Layout a tre colonne con sidebar di navigazione, vista principale e colonna destra per notifiche e stato sistema.

#### Stato iniziale (nessun deposito)
- Messaggio di benvenuto con pulsante "Deposita ALIX".
- NAV attuale, tooltip sul blocco NAV, grafico mini NAV 7 giorni, timestamp ultimo aggiornamento.

#### Composizione dell'indice
- Tabella con i 100 agenti principali (rank, token, peso %, variazione 24h, market cap) con sparkline.
- Informazioni su snapshot e prossimo aggiornamento; pulsante "Vedi storico" con dati su IPFS + Arweave.

#### Deposita ALIX (Modal)
1. Modale con input quantità, saldo disponibile, stima quote ricevute e NAV corrente.
2. Processo `approve()` + `deposit()` con stato di caricamento.
3. Messaggio di successo e aggiornamento della dashboard. Il NAV viene bloccato al blocco della transazione per evitare arbitraggio.

#### Utente con quota attiva
- Box con quote possedute, valore attuale in ALIX, variazione percentuale e pulsante "Riscatta in ALIX".
- Grafico NAV 30 giorni, informazioni su rebalance, slippage medio e token più pesante.

#### Riscatta Quote (sempre in ALIX)
- Modale di conferma con riepilogo quote e ALIX in uscita.
- Invocazione `redeem(shares)` con swap automatico verso ALIX tramite 1inch Fusion (MEV-protected, basso slippage).
- Messaggio di successo e quote bruciate.

#### Storico personale
- Tabella con data, tipo, importo ALIX, quote, NAV, rendimento %, link transazione.
- Grafico del rendimento personale e riepilogo totale depositato/rendimento netto.

### Fase 3 — Interazione quotidiana (Auto-update)
- Notifiche su aggiornamenti giornalieri, andamento NAV in tempo reale, rebalancing > 2.5%, esclusione token.

### Fase 4 — Uscita dalla piattaforma
- Dopo disconnessione o redeem completo: dashboard in sola visualizzazione con invito a riconnettere il wallet.

### Funzionalità secondarie
- Impostazioni (tema dark neon, lingua EN/IT, chain Virtuals Protocol, disconnessione wallet).
- Notifiche toast (deposito completato, redeem completato, nuovo snapshot, vault in pausa).
- Statistiche pubbliche (NAV totale, TVL, numero detentori, token più performante).

---

## Workflow Backend — "Il motore invisibile" (v3.0)
Sistema decentralizzato, sicuro ed efficiente che garantisce sempre il redeem in ALIX.

### Architettura logica
Scheduler, Data Fetcher, Weight Calculator, Snapshot Manager, Vault Manager, Keeper (Gelato), Rebalancer (1inch Fusion), Redeem Engine, FailSafe, Notifier.

### Fase 0 — Scheduler
Esegue `mainDailyCycle` ogni giorno a mezzanotte: fetch dati → calcolo pesi → snapshot → update target → keeper → rebalance → notify.

### Fase 1 — Data Fetching
Recupera market cap, volume 24h, liquidità, prezzo, indirizzo. Filtri: volume < 5% market cap, liquidità < 50k USD, whitelist manuale iniziale.

### Fase 2 — Weight Calculation
Punteggio: `score = 0.6*marketCap + 0.3*volume24h + 0.1*liquidity`. Peso normalizzato con cap 10% per token e redistribuzione eccessi.

### Fase 3 — Snapshot
Salvataggio su Postgres + IPFS + Arweave, cache in Redis per il frontend.

### Fase 4 — Update Vault
Funzione `setTargetWeights()` invocabile solo dal manager per aggiornare i target senza eseguire swap.

### Fase 5 — Rebalancing
Keeper esegue `rebalance()` se la deviazione massima supera il 2.5%. Fino a 10 swap per ciclo tramite 1inch Fusion con protezione MEV.

### Fase 6 — Redeem Engine
Funzione `_swapIndexTokensToALIX` vende la quota dell'utente in ALIX al NAV del blocco di redeem, senza necessità di riserve ALIX.

### Fase 7 — FailSafe
Possibilità di mettere in pausa il sistema con messaggio di avviso all'utente.

### Fase 8 — Frontend Sync
Aggiornamenti tramite SSE ogni 15 secondi per NAV, stato, snapshot, stato redeem.

### Cron Job Schema
```
00:00 → fetch data
00:05 → calculate weights
00:10 → save snapshot
00:15 → setTargetWeights()
→ Keeper → rebalance (if needed)
00:30 → notify users
```

### Filosofia finale (v3.0)
ALIXINDEX100 è un fondo autonomo, trasparente e resiliente. Entrata e uscita avvengono esclusivamente in ALIX, senza token intermedi o riserve complesse, grazie a swap on-demand con 1inch Fusion e un'esperienza utente fluida in stile neon.

---

**Stato:** Pronto per audit, testnet e lancio. Versione definitiva: ALIX IN → ALIX OUT. Sempre.

## 🖼️ Public Assets

All static images (logos, hero graphics, mockups, etc.) should be placed in `/public`.

Example:

```
/public/hero.png
/public/logo.svg
/public/bg-grid.png
```

When deploying on Vercel or GitHub Pages, the `/public` folder will be automatically included.

Confirm that your Next.js image imports follow this pattern:

```jsx
<Image src="/hero.png" alt="ALIX hero" width={1200} height={800} />
```

## 🔐 Environment

Create a `.env.local` file and provide your WalletConnect Cloud project identifier so that mobile browsers can establish a session via WalletConnect:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

You can generate a project ID from the [WalletConnect Cloud dashboard](https://cloud.walletconnect.com/). This is the **Project ID** value shown in the dashboard overview (a single ID shared by every platform), *not* the per-platform App IDs that you might configure for iOS or Android bundles. Restart the development server after updating environment variables so the value is available in the browser.


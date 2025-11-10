import { listAirdropEntries } from "@/lib/airdrop";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AirdropAdminPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const from = searchParams.from;
  const to = searchParams.to;
  const { entries, total } = await listAirdropEntries({ from, to });

  const query = new URLSearchParams();
  if (from) query.set("from", from);
  if (to) query.set("to", to);
  const exportHref = `/api/airdrop/export${query.toString() ? `?${query.toString()}` : ""}`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-6 py-16 text-white md:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Admin</p>
          <h1 className="font-display text-4xl font-semibold text-white">Iscritti Airdrop ALIX</h1>
          <p className="text-white/70">Totale partecipanti: <span className="font-semibold text-[#CDFF00]">{total}</span></p>
        </header>

        <form className="flex flex-col gap-4 rounded-2xl border border-[#CDFF00]/15 bg-[#1A1A1A]/50 p-6 md:flex-row md:items-end" method="get">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="from" className="text-sm text-white/70">
              Da data
            </label>
            <input
              className="h-11 rounded-lg border border-white/10 bg-[#0A0A0A] px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00]"
              type="date"
              id="from"
              name="from"
              defaultValue={from}
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="to" className="text-sm text-white/70">
              A data
            </label>
            <input
              className="h-11 rounded-lg border border-white/10 bg-[#0A0A0A] px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CDFF00]"
              type="date"
              id="to"
              name="to"
              defaultValue={to}
            />
          </div>
          <div className="flex gap-3 md:w-auto">
            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#CDFF00] px-6 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:bg-[#CDFF00]/90 md:mt-0"
            >
              Filtra
            </button>
            <a
              href="/admin/airdrop"
              className="mt-6 inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#CDFF00]/70 hover:text-[#CDFF00] md:mt-0"
            >
              Reset
            </a>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Elenco iscrizioni</h2>
          <a
            href={exportHref}
            className="inline-flex items-center justify-center rounded-lg border border-[#CDFF00]/40 px-5 py-2.5 text-sm font-semibold text-[#CDFF00] transition hover:border-[#CDFF00] hover:text-[#0A0A0A] hover:bg-[#CDFF00]"
          >
            Esporta CSV
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#CDFF00]/15 bg-[#0F0F0F] shadow-[0_0_50px_rgba(205,255,0,0.12)]">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-white/5 uppercase tracking-[0.2em] text-white/60">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Nome</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Wallet</th>
                <th scope="col" className="px-6 py-4">Firma</th>
                <th scope="col" className="px-6 py-4">Creato il</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-white/60">
                    Nessuna iscrizione trovata per il periodo selezionato.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-mono text-xs text-white/70">{entry.id}</td>
                    <td className="px-6 py-4 text-white">{entry.name ?? "—"}</td>
                    <td className="px-6 py-4 text-white">{entry.email}</td>
                    <td className="px-6 py-4 font-mono text-xs text-[#CDFF00]">{entry.walletAddress}</td>
                    <td className="px-6 py-4 font-mono text-xs text-white/70 truncate max-w-[12rem]">
                      {entry.signature}
                    </td>
                    <td className="px-6 py-4 text-white/70">
                      {new Date(entry.createdAt).toLocaleString("it-IT")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

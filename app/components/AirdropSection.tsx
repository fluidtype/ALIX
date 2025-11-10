"use client";

import { useMemo, useState, type ComponentType, type FormEvent } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Coins,
  Crown,
  Gift,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/lib/utils";

type BenefitIcon = ComponentType<{ className?: string }>;

type EthereumProvider = {
  request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
};

type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

const benefits: Benefit[] = [
  {
    title: "Token Gratuiti",
    description: "Ottieni token ALIX senza costi e avvia il tuo journey nell'ecosistema.",
    icon: Coins,
  },
  {
    title: "Accesso Anticipato",
    description: "Provare per primi le nuove funzionalità del protocollo e i drop riservati.",
    icon: Crown,
  },
  {
    title: "Governance",
    description: "Partecipa alle decisioni strategiche con diritto di voto on-chain.",
    icon: Users,
  },
  {
    title: "Rewards Esclusivi",
    description: "Sblocca missioni stagionali con reward potenziati per i primi utenti.",
    icon: Gift,
  },
  {
    title: "Deflationary Benefit",
    description: "Approfitta del burn del 1% che sostiene il valore del token.",
    icon: TrendingUp,
  },
  {
    title: "Community VIP",
    description: "Accedi alle stanze private della community e ai briefing settimanali.",
    icon: Sparkles,
  },
];

const stats = [
  { label: "Total Supply", value: "1B", description: "Total Supply ALIX" },
  { label: "Burn Fee", value: "1%", description: "Burn Fee" },
  { label: "Rebalance", value: "24h", description: "Rebalance Cycle" },
];

export function AirdropSection() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const walletConnected = Boolean(walletAddress);

  const messageToSign = useMemo(() => {
    if (!walletAddress) return "";
    return `Partecipo all'airdrop ALIX con l'indirizzo: ${walletAddress}`;
  }, [walletAddress]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setWalletAddress("");
    setTermsAccepted(false);
    setSuccessEmail(null);
    setIsSubmitting(false);
  };

  const handleConnectWallet = async () => {
    if (typeof window === "undefined") return;
    const ethereum = (window as typeof window & { ethereum?: EthereumProvider }).ethereum;
    if (!ethereum) {
      toast.error("Collega MetaMask per continuare");
      return;
    }

    try {
      const accounts = await ethereum.request<string[]>({ method: "eth_requestAccounts" });
      const account = accounts?.[0];
      if (!account) {
        toast.error("Nessun wallet selezionato");
        return;
      }
      setWalletAddress(account);
      toast.success("Wallet connesso");
    } catch (error) {
      console.error(error);
      toast.error("Connessione al wallet annullata");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Inserisci un'email valida");
      return;
    }
    if (!walletConnected) {
      toast.error("Connetti il wallet per continuare");
      return;
    }
    if (!termsAccepted) {
      toast.error("Accetta termini e condizioni");
      return;
    }

    if (typeof window === "undefined") return;
    const ethereum = (window as typeof window & { ethereum?: EthereumProvider }).ethereum;
    if (!ethereum) {
      toast.error("MetaMask non disponibile");
      return;
    }

    try {
      setIsSubmitting(true);
      const signature = await ethereum.request<string>({
        method: "personal_sign",
        params: [messageToSign, walletAddress],
      });

      const response = await fetch("/api/airdrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          walletAddress,
          signature,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Impossibile completare l'iscrizione");
      }

      setSuccessEmail(email.trim());
      toast.success("Iscrizione completata");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message ? error.message : "Errore inatteso";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    setOpen(nextOpen);
  };

  return (
    <section className="relative z-10 mx-auto mt-24 w-full max-w-[120rem] px-4 py-20 md:px-12 lg:px-20">
      <div className="relative overflow-hidden rounded-[3rem] border border-[#CDFF00]/15 bg-[#0A0A0A] px-6 py-16 shadow-[0_0_80px_rgba(205,255,0,0.12)] md:px-16 lg:px-24">
        <div className="absolute -top-20 right-12 h-48 w-48 rounded-full bg-[#CDFF00]/10 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-60 w-60 rounded-full bg-[#CDFF00]/6 blur-3xl" />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#CDFF00]/30 bg-[#1A1A1A]/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              <Sparkles className="h-4 w-4 text-[#CDFF00]" />
              Airdrop Live
            </span>
            <h2 className="font-display text-4xl font-semibold text-white md:text-5xl">
              Partecipa all&apos;Airdrop di ALIX
            </h2>
            <p className="max-w-2xl text-lg text-white/70">
              Ricevi token ALIX gratuitamente e diventa parte della rivoluzione dell&apos;intelligenza decentralizzata.
              Unisciti alla community di early adopters e sblocca vantaggi esclusivi.
            </p>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button className="text-base font-semibold" size="lg">
                  <Coins className="h-5 w-5" />
                  Partecipa all&apos;Airdrop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl gap-8 rounded-none p-6 sm:rounded-[2rem] sm:p-10">
                {successEmail ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <CheckCircle2 className="h-16 w-16 text-[#CDFF00]" />
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl font-semibold text-white">
                        Partecipazione Confermata!
                      </h3>
                      <p className="text-sm text-white/70">
                        Sei dentro! Ti abbiamo inviato un riepilogo a <span className="font-semibold text-white">{successEmail}</span>.
                      </p>
                    </div>
                    <ul className="w-full space-y-3 text-left text-sm text-white/70">
                      {[
                        "Controlla la tua email per gli step successivi",
                        "Unisciti al nostro Discord privato per gli update",
                        "Segui i social ufficiali per le call to action",
                        "Tieniti pronto per la distribuzione dei token",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#CDFF00]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-4"
                      onClick={() => handleOpenChange(false)}
                      type="button"
                    >
                      Chiudi
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <DialogHeader className="space-y-3 text-left">
                      <DialogTitle>Partecipa all&apos;Airdrop ALIX</DialogTitle>
                      <DialogDescription>
                        Compila il form, collega il tuo wallet e conferma la partecipazione firmando il messaggio.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="airdrop-name">Nome (opzionale)</Label>
                        <Input
                          id="airdrop-name"
                          placeholder="Inserisci il tuo nome"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          autoComplete="name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="airdrop-email">
                          Email <span className="text-[#CDFF00]">*</span>
                        </Label>
                        <Input
                          id="airdrop-email"
                          type="email"
                          placeholder="nome@email.com"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          autoComplete="email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="airdrop-wallet">Wallet Address</Label>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Input
                            id="airdrop-wallet"
                            placeholder="0x..."
                            value={walletAddress}
                            readOnly
                            className={cn("sm:flex-1", walletConnected ? "text-white" : "text-white/50")}
                          />
                          <Button
                            type="button"
                            onClick={handleConnectWallet}
                            className="sm:w-auto"
                            variant={walletConnected ? "outline" : "default"}
                          >
                            {walletConnected ? (
                              <>
                                <BadgeCheck className="h-4 w-4" />
                                {truncateAddress(walletAddress)}
                              </>
                            ) : (
                              <>
                                <Wallet className="h-4 w-4" />
                                Connect Wallet
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                        <Checkbox
                          id="airdrop-terms"
                          checked={termsAccepted}
                          onCheckedChange={(value) => setTermsAccepted(Boolean(value))}
                        />
                        <Label htmlFor="airdrop-terms" className="text-sm font-normal text-white/80">
                          Accetto i <a className="text-[#CDFF00] underline" href="/privacy" target="_blank" rel="noreferrer">termini e condizioni</a> e la privacy policy.
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-base"
                      disabled={isSubmitting || !walletConnected || !termsAccepted}
                    >
                      {isSubmitting ? "Invio in corso..." : "Conferma Partecipazione"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-10">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-[#CDFF00]/20 bg-[#1A1A1A]/90">
                  <CardHeader className="flex flex-col gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#CDFF00]/30 bg-[#0A0A0A] text-[#CDFF00] shadow-[0_0_20px_rgba(205,255,0,0.2)]">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                    <p className="text-sm text-white/70">{benefit.description}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 rounded-3xl border border-[#CDFF00]/15 bg-[#1A1A1A]/60 p-8 text-white sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
                  <p className="font-display text-3xl font-semibold text-[#CDFF00]">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function truncateAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

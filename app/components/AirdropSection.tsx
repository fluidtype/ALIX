"use client";

import { useEffect, useMemo, useState, type ComponentType, type FormEvent } from "react";
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
import { OPEN_AIRDROP_EVENT } from "@/lib/events";
import { cn } from "@/lib/utils";

type BenefitIcon = ComponentType<{ className?: string }>;

type Eip1193Provider = {
  request<T = unknown>(args: { method: string; params?: unknown[] }): Promise<T>;
  on?(event: string, listener: (...args: unknown[]) => void): void;
  off?(event: string, listener: (...args: unknown[]) => void): void;
  disconnect?: () => Promise<void> | void;
};

type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

const benefits: Benefit[] = [
  {
    title: "Free Tokens",
    description: "Collect ALIX tokens at no cost and kickstart your journey in the ecosystem.",
    icon: Coins,
  },
  {
    title: "Early Access",
    description: "Be the first to try new protocol features and members-only drops.",
    icon: Crown,
  },
  {
    title: "Governance",
    description: "Join strategic decisions with on-chain voting power.",
    icon: Users,
  },
  {
    title: "Exclusive Rewards",
    description: "Unlock seasonal quests with boosted rewards for early supporters.",
    icon: Gift,
  },
  {
    title: "Deflationary Benefit",
    description: "Benefit from the 1% burn that underpins the token's value.",
    icon: TrendingUp,
  },
  {
    title: "VIP Community",
    description: "Enter private community lounges and weekly briefings.",
    icon: Sparkles,
  },
];

const WALLETCONNECT_METHODS = [
  "eth_requestAccounts",
  "eth_accounts",
  "personal_sign",
  "eth_signTypedData",
  "eth_sendTransaction",
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
  const [provider, setProvider] = useState<Eip1193Provider | null>(null);

  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  const walletConnected = Boolean(walletAddress);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const ethereum = (window as typeof window & { ethereum?: Eip1193Provider }).ethereum;
    if (ethereum) {
      setProvider(ethereum);
    }

    const listener: EventListener = () => {
      setName("");
      setEmail("");
      setWalletAddress("");
      setTermsAccepted(false);
      setSuccessEmail(null);
      setIsSubmitting(false);
      setOpen(true);
    };

    window.addEventListener(OPEN_AIRDROP_EVENT, listener);
    return () => {
      window.removeEventListener(OPEN_AIRDROP_EVENT, listener);
    };
  }, []);

  useEffect(() => {
    if (!provider || typeof provider.on !== "function") {
      return;
    }

    const handleDisconnect = () => {
      setWalletAddress("");
      setProvider(null);
    };

    provider.on("disconnect", handleDisconnect);

    return () => {
      if (typeof provider.off === "function") {
        provider.off("disconnect", handleDisconnect);
      }
    };
  }, [provider]);

  const messageToSign = useMemo(() => {
    if (!walletAddress) return "";
    return `I am joining the ALIX airdrop with address: ${walletAddress}`;
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
    try {
      let activeProvider: Eip1193Provider | null = provider;

      if (!activeProvider) {
        const ethereum = (window as typeof window & { ethereum?: Eip1193Provider }).ethereum;

        if (ethereum) {
          activeProvider = ethereum;
          setProvider(ethereum);
        } else {
          if (!walletConnectProjectId) {
            toast.error("WalletConnect is not configured. Please contact support.");
            return;
          }

          const { EthereumProvider } = await import("@walletconnect/ethereum-provider");
          const walletConnectProvider = await EthereumProvider.init({
            projectId: walletConnectProjectId,
            chains: [1],
            showQrModal: true,
            methods: WALLETCONNECT_METHODS,
            optionalMethods: WALLETCONNECT_METHODS,
            metadata: {
              name: "ALIX",
              description: "ALIX airdrop registration",
              url: window.location.origin,
              icons: [new URL("/mockup.png", window.location.origin).toString()],
            },
          });

          activeProvider = walletConnectProvider;
          setProvider(walletConnectProvider);
        }
      }

      if (!activeProvider) {
        toast.error("No wallet provider available");
        return;
      }

      const accounts = await activeProvider.request<string[]>({ method: "eth_requestAccounts" });
      const account = accounts?.[0];
      if (!account) {
        toast.error("No wallet selected");
        return;
      }
      setWalletAddress(account);
      toast.success("Wallet connected");
    } catch (error) {
      console.error(error);
      toast.error("Wallet connection cancelled");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (!walletConnected) {
      toast.error("Connect your wallet to continue");
      return;
    }
    if (!termsAccepted) {
      toast.error("Accept the terms and conditions");
      return;
    }

    if (typeof window === "undefined") return;
    const activeProvider =
      provider ?? (window as typeof window & { ethereum?: Eip1193Provider }).ethereum ?? null;
    if (!activeProvider) {
      toast.error("Wallet provider not available. Please reconnect your wallet.");
      return;
    }

    try {
      setIsSubmitting(true);
      const signature = await activeProvider.request<string>({
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
        throw new Error(payload?.error ?? "Unable to complete the registration");
      }

      setSuccessEmail(email.trim());
      toast.success("Registration completed");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error && error.message ? error.message : "Unexpected error";
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
              Join the ALIX Airdrop
            </h2>
            <p className="max-w-2xl text-lg text-white/70">
              Receive ALIX tokens for free and become part of the decentralized intelligence revolution. Join the
              early-adopter community and unlock exclusive perks.
            </p>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger asChild>
                <Button className="text-base font-semibold" size="lg">
                  <Coins className="h-5 w-5" />
                  Join the Airdrop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl gap-8 rounded-none p-6 sm:rounded-[2rem] sm:p-10">
                {successEmail ? (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <CheckCircle2 className="h-16 w-16 text-[#CDFF00]" />
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl font-semibold text-white">
                        Participation Confirmed!
                      </h3>
                      <p className="text-sm text-white/70">
                        You&apos;re in! We sent a recap to <span className="font-semibold text-white">{successEmail}</span>.
                      </p>
                    </div>
                    <ul className="w-full space-y-3 text-left text-sm text-white/70">
                      {[
                        "Check your inbox for the next steps",
                        "Join our private Discord for updates",
                        "Follow the official socials for calls to action",
                        "Stay ready for the token distribution",
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
                      Close
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <DialogHeader className="space-y-3 text-left">
                      <DialogTitle>Join the ALIX Airdrop</DialogTitle>
                      <DialogDescription>
                        Fill in the form, connect your wallet, and confirm your participation by signing the message.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="airdrop-name">Name (optional)</Label>
                        <Input
                          id="airdrop-name"
                          placeholder="Enter your name"
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
                          placeholder="you@example.com"
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
                          I agree to the <a className="text-[#CDFF00] underline" href="/privacy" target="_blank" rel="noreferrer">terms and conditions</a> and privacy policy.
                        </Label>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-base"
                      disabled={isSubmitting || !walletConnected || !termsAccepted}
                    >
                      {isSubmitting ? "Submitting..." : "Confirm Participation"}
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

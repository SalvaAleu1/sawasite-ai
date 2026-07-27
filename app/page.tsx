"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  Zap,
  Globe,
  Smartphone,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Bot,
  Lock,
  Layers,
  Code,
  Check,
} from "lucide-react";

export default function SawaSiteLanding() {
  const [promptInput, setPromptInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [credits, setCredits] = useState(3); // Free tier credit limit
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    if (credits <= 0) {
      setShowAuthModal(true);
      return;
    }

    setIsGenerating(true);
    setGenerationStep("Analyzing user prompt & structuring database schema...");

    setTimeout(() => {
      setGenerationStep("Generating full-stack Next.js & Tailwind components...");
    }, 1500);

    setTimeout(() => {
      setGenerationStep("Provisioning API routes, payment webhooks & styling...");
    }, 3000);

    setTimeout(() => {
      setGeneratedResult({
        title: promptInput.split("slice")[0] || "Custom Full-Stack App",
        description: promptInput,
        filesCreated: [
          "app/page.tsx (Main Layout & UI)",
          "app/api/generate/route.ts (Backend Logic)",
          "lib/supabase/schema.sql (Database Tables)",
          "components/CheckoutButton.tsx (Payment Integration)"
        ]
      });
      setIsGenerating(false);
      setCredits(prev => prev - 1);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              SawaSite<span className="text-emerald-400">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#generator" className="hover:text-white transition-colors">AI Generator</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-400 hidden sm:block bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              Free Credits Left: <span className="text-emerald-400 font-bold">{credits}/3</span>
            </div>
            <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </a>
            <button
              onClick={handleGoogleSignIn}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> Full-Stack AI Website Generator Engine
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Build Production Full-Stack Apps <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Just from Your Plain Instructions.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe any web app or business portal. SawaSite AI instantly writes your code, builds components, provisions APIs, and links payment workflows.
          </p>

          {/* AI Prompt Input Bar */}
          <div id="generator" className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handlePromptSubmit} className="relative flex flex-col p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl focus-within:border-emerald-500/50 transition-all">
              <div className="flex items-center">
                <Bot className="w-6 h-6 text-emerald-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="e.g. Build an e-commerce marketplace for fresh farm produce with mobile money checkout..."
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-sm flex items-center gap-2 transition-all shrink-0 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Building...
                    </>
                  ) : (
                    <>
                      Generate App <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="text-xs text-slate-500">
            {credits > 0 ? `${credits} free generation credits remaining.` : "Free credits exhausted. Sign up or subscribe for unlimited access."}
          </div>
        </div>
      </section>

      {/* 3. GENERATION OUTPUT WORKSPACE */}
      {(isGenerating || generatedResult) && (
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden p-6">
            {isGenerating ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-white">Synthesizing Your Application...</h3>
                <p className="text-xs text-emerald-400 font-mono">{generationStep}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Application Generated Successfully!
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Prompt: &quot;{generatedResult.description}&quot;</p>
                  </div>
                  <a
                    href="/dashboard"
                    className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400 transition-all"
                  >
                    Open in Dashboard Builder
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Code className="w-4 h-4 text-emerald-400" /> Generated Architecture Files
                    </h4>
                    <ul className="space-y-2">
                      {generatedResult.filesCreated.map((file: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-400 font-mono bg-slate-900 p-2 rounded border border-slate-800/60 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> {file}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-400" /> Next Steps
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Your custom full-stack boilerplate has been compiled. Sign in with your Google account to deploy this app live to a custom domain with database connectivity.
                      </p>
                    </div>
                    <button
                      onClick={handleGoogleSignIn}
                      className="mt-4 w-full py-2.5 rounded-lg bg-white text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                    >
                      Continue with Google to Deploy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Unlock Unlimited Generation</h2>
            <p className="text-slate-400 text-sm mb-6">Upgrade your account when you exhaust your free credits.</p>

            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  billingCycle === "monthly" ? "bg-emerald-500 text-slate-950" : "text-slate-400"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  billingCycle === "annual" ? "bg-emerald-500 text-slate-950" : "text-slate-400"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Free Starter</h3>
                <p className="text-xs text-slate-400 mb-6">For testing core generator capabilities.</p>
                <div className="text-3xl font-extrabold text-white mb-6">$0 <span className="text-xs text-slate-500 font-normal">/ forever</span></div>
                <ul className="space-y-3 mb-8 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 Free Generation Credits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Code Preview</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Community Support</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all">
                Get Started Free
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/60 shadow-xl shadow-emerald-500/10 relative flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                Unlimited Pro
              </span>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Pro Builder</h3>
                <p className="text-xs text-slate-400 mb-6">For professional full-stack creators & founders.</p>
                <div className="text-3xl font-extrabold text-white mb-6">
                  {billingCycle === "monthly" ? "$19" : "$15"} <span className="text-xs text-slate-500 font-normal">/ month</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited AI Generations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Export Full-Stack Source Code</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom Domain & SSL Deployments</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority Server Processing</li>
                </ul>
              </div>
              <button onClick={handleGoogleSignIn} className="w-full py-3 rounded-xl font-semibold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AUTH PROMPT MODAL IF CREDITS EXHAUSTED */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Free Generation Limit Reached</h3>
            <p className="text-xs text-slate-400">
              You have used up your free credits. Sign in with your Google account to unlock more credits or subscribe to Pro.
            </p>
            <div className="pt-2 space-y-2">
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-2"
              >
                Sign In with Google
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
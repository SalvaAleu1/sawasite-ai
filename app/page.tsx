"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Globe,
  Smartphone,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Palette,
  Search,
  Bot,
  ChevronRight,
} from "lucide-react";

export default function SawaSiteLanding() {
  const [promptInput, setPromptInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  // Interactive Demo State
  const [demoSite, setDemoSite] = useState({
    title: "EcoHarvest Agribusiness",
    tagline: "Climate-Smart Farming & Produce Distribution Across East Africa",
    heroCta: "Explore Products",
    primaryColor: "emerald",
  });

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const input = promptInput.toLowerCase();
      if (input.includes("restaurant") || input.includes("cafe") || input.includes("food")) {
        setDemoSite({
          title: "Savanna Grill & Bistro",
          tagline: "Authentic African Fusion Cuisine & Artisan Coffee",
          heroCta: "Reserve a Table",
          primaryColor: "amber",
        });
      } else if (input.includes("fintech") || input.includes("pay") || input.includes("bank")) {
        setDemoSite({
          title: "SawaPay Logistics",
          tagline: "Instant Cross-Border Mobile Payments & Escrow Services",
          heroCta: "Open Account",
          primaryColor: "indigo",
        });
      } else {
        setDemoSite({
          title: promptInput.split(" ")[0].toUpperCase() + " Enterprise",
          tagline: promptInput,
          heroCta: "Get Started Free",
          primaryColor: "emerald",
        });
      }
      setIsGenerating(false);
    }, 1200);
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
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              SawaSite<span className="text-emerald-400">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#demo" className="hover:text-white transition-colors">AI Generator</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Sign In
            </a>
            <a
              href="#demo"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              Start Building
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> Next-Gen AI Website Builder for Global & African Businesses
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Build Production Websites in Seconds <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Just by Describing What You Want.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            SawaSite AI generates responsive HTML/CSS, copy, images, and SEO metadata in plain English. Integrated with M-Pesa, Flutterwave, and Stripe out of the box.
          </p>

          {/* AI Prompt Input Bar */}
          <form onSubmit={handlePromptSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl focus-within:border-emerald-500/50 transition-all">
              <Bot className="w-6 h-6 text-emerald-400 ml-3 shrink-0" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="e.g. Build an agribusiness website with product catalog and M-Pesa payments..."
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
                    Generating...
                  </>
                ) : (
                  <>
                    Generate <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. LIVE INTERACTIVE DEMO CANVAS */}
      <section id="demo" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 ml-2 font-mono">sawasite-ai-canvas.internal</span>
            </div>

            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === "preview" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === "code" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Generated Code
              </button>
            </div>
          </div>

          <div className="p-8 min-h-[420px] flex items-center justify-center">
            {activeTab === "preview" ? (
              <div className="w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/50">
                  <div className="font-bold text-white text-base">{demoSite.title}</div>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span>Home</span>
                    <span>About</span>
                    <span>Services</span>
                    <span>Contact</span>
                  </div>
                </div>

                <div className="p-10 text-center space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {demoSite.title}
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">{demoSite.tagline}</p>
                  <div className="pt-2">
                    <button className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-md transition-all">
                      {demoSite.heroCta}
                    </button>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-800/80 bg-slate-900/30 grid sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                      <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">
                        0{i}
                      </div>
                      <div className="text-xs font-semibold text-white">Automated Module {i}</div>
                      <div className="text-[11px] text-slate-400">Optimized layout generated by SawaSite AI engine.</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full font-mono text-xs text-slate-300 bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                <pre>{`// Generated by SawaSite AI Engine v2.4
export default function Site() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="px-6 py-4 border-b border-slate-800">
        <h1 className="font-bold text-lg">${demoSite.title}</h1>
      </header>
      <main className="p-12 text-center">
        <h2 className="text-3xl font-extrabold">${demoSite.title}</h2>
        <p className="text-slate-400 mt-2">${demoSite.tagline}</p>
        <button className="mt-6 px-6 py-2 bg-emerald-500 text-black font-semibold rounded">
          ${demoSite.heroCta}
        </button>
      </main>
    </div>
  );
}`}</pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM FEATURES */}
      <section id="features" className="py-20 px-6 border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Everything Needed to Build & Scale
            </h2>
            <p className="text-slate-400 text-sm">
              Engineered with world-class developer tools, combined with African regional payment infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="w-6 h-6 text-emerald-400" />}
              title="Full-Page AI Generator"
              description="Generates complete multi-page websites including copy, contact forms, legal terms, and images in seconds."
            />
            <FeatureCard
              icon={<CreditCard className="w-6 h-6 text-emerald-400" />}
              title="M-Pesa & Multi-Currency"
              description="Native integration with M-Pesa, Flutterwave, Paystack, PayPal, and Stripe for seamless checkout."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-emerald-400" />}
              title="95+ Google Lighthouse"
              description="Outputs clean Next.js/React code with dynamic image optimization and edge caching for instant load times."
            />
            <FeatureCard
              icon={<Search className="w-6 h-6 text-emerald-400" />}
              title="Automatic SEO Engine"
              description="Generates JSON-LD schema, dynamic Open Graph cards, sitemaps, and robots.txt automatically."
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-emerald-400" />}
              title="Custom Domains & SSL"
              description="Connect your own custom domains with automated Cloudflare SSL certificate provisioning."
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6 text-emerald-400" />}
              title="Mobile Responsive"
              description="Every section adapts fluently across mobile phones, tablets, and high-res desktops."
            />
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400 text-sm mb-6">Choose a plan designed for your growth stage.</p>

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

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              tier="Free"
              price="$0"
              description="Perfect for testing and small personal side-projects."
              features={[
                "SawaSite.ai Subdomain",
                "50 AI Generation Credits / mo",
                "Community Templates Access",
                "Standard Web Hosting",
              ]}
              buttonText="Start Free"
              highlighted={false}
            />
            <PricingCard
              tier="Starter / Business"
              price={billingCycle === "monthly" ? "$9" : "$7"}
              period="/ month"
              description="Ideal for local businesses, freelancers, and startups."
              features={[
                "Connect Custom Domain",
                "500 Monthly AI Credits",
                "M-Pesa & Stripe Checkout",
                "No SawaSite Branding",
                "Full SEO Metadata Optimization",
              ]}
              buttonText="Get Started"
              highlighted={true}
            />
            <PricingCard
              tier="Agency / Pro"
              price={billingCycle === "monthly" ? "$29" : "$23"}
              period="/ month"
              description="For developers, agencies, and high-traffic businesses."
              features={[
                "Unlimited Website Generation",
                "2,500 Monthly AI Credits",
                "White-Label Reselling",
                "Export Clean React/Next.js Source",
                "Priority 24/7 Live Support",
              ]}
              buttonText="Upgrade to Pro"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              S
            </div>
            <span className="font-semibold text-slate-300">SawaSite AI Platform</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Documentation</a>
            <a href="#" className="hover:text-slate-300">Support</a>
          </div>
          <div>© {new Date().getFullYear()} SawaSite AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  buttonText,
  highlighted,
}: {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-2xl border flex flex-col justify-between transition-all ${
        highlighted
          ? "bg-slate-900 border-emerald-500/60 shadow-xl shadow-emerald-500/10 relative"
          : "bg-slate-950 border-slate-800"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
          Most Popular
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold text-white mb-2">{tier}</h3>
        <p className="text-xs text-slate-400 mb-6">{description}</p>

        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          {period && <span className="text-xs text-slate-500">{period}</span>}
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-semibold text-xs transition-all ${
          highlighted
            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            : "bg-slate-800 hover:bg-slate-700 text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
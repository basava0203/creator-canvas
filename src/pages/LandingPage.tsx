import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, FileText, Zap, ArrowRight, Check, Video, BookOpen, Share2 } from "lucide-react";
import heroImage from "@/assets/hero-image.png";
import AIChatbot from "@/components/AIChatbot";
import FeatureShowcaseDialog from "@/components/FeatureShowcaseDialog";
const features = [
  {
    icon: Video,
    title: "Screen Recording",
    description: "Capture your screen with one click. Add webcam, audio, and annotations in real-time.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description: "Our AI automatically removes filler words, enhances scripts, and generates professional voiceovers.",
  },
  {
    icon: BookOpen,
    title: "Auto-Generated Guides",
    description: "Transform recordings into step-by-step documentation with screenshots and instructions.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Export as MP4, PDF, or interactive guides. Share with password protection and analytics.",
  },
];

const steps = [
  { step: "01", title: "Record", description: "Capture your screen with audio" },
  { step: "02", title: "AI Enhances", description: "Script cleanup & voiceover generation" },
  { step: "03", title: "Edit & Polish", description: "Fine-tune in dual-panel editor" },
  { step: "04", title: "Share", description: "Export & distribute everywhere" },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    priceINR: "",
    description: "Perfect for trying out creAnva",
    features: ["3 videos/month", "5 min max length", "Basic AI voices", "Watermarked exports"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    priceINR: "₹4,500",
    period: "/month",
    description: "For power users and small teams",
    features: ["Unlimited videos", "30 min max length", "Premium AI voices", "No watermarks", "Priority processing", "Team collaboration"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceINR: "",
    description: "For large organizations",
    features: ["Everything in Pro", "Custom AI training", "SSO & SAML", "Dedicated support", "SLA guarantee", "Custom integrations"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">creAnva</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Video Creation</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Turn Screen Recordings into{" "}
            <span className="text-gradient">Professional Content</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Record your screen once. Let AI transform it into polished videos, step-by-step guides, and documentation—automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <FeatureShowcaseDialog>
              <Button variant="hero" size="xl">
                Start Creating for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </FeatureShowcaseDialog>
            <Button variant="glass" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            No credit card required • Free forever plan available
          </p>
        </div>

        {/* Hero Visual */}
        <div className="container mx-auto mt-16 max-w-5xl animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
            <div className="relative glass rounded-2xl p-2 shadow-card">
              <img 
                src={heroImage} 
                alt="creAnva AI-powered video editing interface showing screen recording transformation" 
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From recording to sharing, creAnva handles the entire content creation workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to transform your recordings into professional content.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative glass rounded-2xl p-8 animate-fade-in-up ${
                  tier.popular ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                {tier.priceINR && (
                  <p className="text-sm text-muted-foreground mb-2">{tier.priceINR}/month</p>
                )}
                <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.name === "Enterprise" ? (
                  <Button variant="outline" className="w-full">
                    {tier.cta}
                  </Button>
                ) : (
                  <FeatureShowcaseDialog>
                    <Button
                      variant={tier.popular ? "hero" : "outline"}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </FeatureShowcaseDialog>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative glass rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-5" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Content?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of teams creating professional videos and guides in minutes, not hours.
              </p>
              <FeatureShowcaseDialog>
                <Button variant="hero" size="xl">
                  Start Creating Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </FeatureShowcaseDialog>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">creAnva</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 creAnva. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}

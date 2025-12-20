import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Video,
  Sparkles,
  Wand2,
  Mic,
  FileText,
  Share2,
  ArrowRight,
  Check,
  Play,
} from "lucide-react";

interface FeatureShowcaseDialogProps {
  children: React.ReactNode;
}

const showcaseFeatures = [
  {
    icon: Video,
    title: "One-Click Recording",
    description: "Capture screen, webcam & audio instantly",
  },
  {
    icon: Sparkles,
    title: "AI Script Enhancement",
    description: "Remove filler words & polish your script",
  },
  {
    icon: Wand2,
    title: "Auto Scene Detection",
    description: "Smart editing with automatic cuts",
  },
  {
    icon: Mic,
    title: "Premium AI Voices",
    description: "Professional voiceovers in 20+ languages",
  },
  {
    icon: FileText,
    title: "Auto Documentation",
    description: "Generate step-by-step guides automatically",
  },
  {
    icon: Share2,
    title: "Multi-Format Export",
    description: "MP4, PDF, interactive guides & more",
  },
];

const quickStats = [
  { value: "50K+", label: "Videos Created" },
  { value: "10K+", label: "Happy Users" },
  { value: "4.9★", label: "User Rating" },
];

export default function FeatureShowcaseDialog({ children }: FeatureShowcaseDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
            <Play className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold">
            Create Professional Videos in Minutes
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            Transform screen recordings into polished content with AI
          </p>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="flex justify-center gap-8 py-4 border-y border-border/50">
          {quickStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {showcaseFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/30"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Free Plan Highlights */}
        <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Free Plan Includes
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              "3 videos per month",
              "5 minute max length",
              "Basic AI voices",
              "HD exports",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="hero" size="lg" className="flex-1" asChild>
            <Link to="/auth" onClick={() => setOpen(false)}>
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="flex-1" asChild>
            <Link to="/auth" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          No credit card required • Start creating in 30 seconds
        </p>
      </DialogContent>
    </Dialog>
  );
}

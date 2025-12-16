import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, Loader2, Wand2, FileText, Volume2, Video } from "lucide-react";

interface ProcessingStage {
  id: string;
  label: string;
  description: string;
  icon: typeof Wand2;
  status: "pending" | "processing" | "complete";
  progress?: number;
}

export default function ProcessingPage() {
  const navigate = useNavigate();
  const [stages, setStages] = useState<ProcessingStage[]>([
    {
      id: "analyze",
      label: "Analyzing Video",
      description: "Extracting audio and detecting scene changes",
      icon: Video,
      status: "pending",
    },
    {
      id: "transcribe",
      label: "Transcribing Audio",
      description: "Converting speech to text with timestamps",
      icon: FileText,
      status: "pending",
    },
    {
      id: "enhance",
      label: "AI Enhancement",
      description: "Improving script clarity and structure",
      icon: Wand2,
      status: "pending",
    },
    {
      id: "voice",
      label: "Voice Generation",
      description: "Creating professional AI voiceover",
      icon: Volume2,
      status: "pending",
    },
    {
      id: "guide",
      label: "Guide Creation",
      description: "Generating step-by-step documentation",
      icon: Sparkles,
      status: "pending",
    },
  ]);

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const simulateProcessing = async () => {
      for (let i = 0; i < stages.length; i++) {
        // Set current stage to processing
        setStages((prev) =>
          prev.map((stage, idx) =>
            idx === i ? { ...stage, status: "processing" } : stage
          )
        );
        setCurrentStageIndex(i);

        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setStages((prev) =>
            prev.map((stage, idx) =>
              idx === i ? { ...stage, progress } : stage
            )
          );
          setOverallProgress(Math.round(((i * 100 + progress) / stages.length)));
        }

        // Mark as complete
        setStages((prev) =>
          prev.map((stage, idx) =>
            idx === i ? { ...stage, status: "complete", progress: 100 } : stage
          )
        );
      }

      // Navigate to editor after completion
      setTimeout(() => {
        navigate("/editor/new");
      }, 1500);
    };

    simulateProcessing();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 relative">
            <Sparkles className="w-10 h-10 text-primary" />
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AI is Working Its Magic</h1>
          <p className="text-muted-foreground">
            Transforming your recording into professional content
          </p>
        </div>

        {/* Overall Progress */}
        <div className="glass rounded-2xl p-6 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Overall Progress</span>
            <span className="text-primary font-mono">{overallProgress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Processing Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon;
            const isActive = stage.status === "processing";
            const isComplete = stage.status === "complete";

            return (
              <div
                key={stage.id}
                className={`glass rounded-xl p-4 transition-all duration-300 animate-fade-in-up ${
                  isActive ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isComplete
                        ? "bg-secondary/20"
                        : isActive
                        ? "bg-primary/20"
                        : "bg-muted"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="w-6 h-6 text-secondary" />
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    ) : (
                      <StageIcon className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${isActive ? "text-primary" : ""}`}>
                      {stage.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                    {isActive && stage.progress !== undefined && (
                      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-200"
                          style={{ width: `${stage.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {isComplete && (
                    <span className="text-xs text-secondary font-medium">Complete</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm text-muted-foreground">
            💡 Tip: Processing typically takes 1-2 minutes per minute of video
          </p>
        </div>
      </div>
    </div>
  );
}

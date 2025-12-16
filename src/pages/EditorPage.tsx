import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Download,
  Share2,
  Settings,
  Wand2,
  Type,
  Image,
  Music,
  Layers,
  Plus,
  GripVertical,
  Check,
  Edit3,
  Trash2,
  ChevronRight,
  FileText,
  Video,
  Copy,
  Eye,
} from "lucide-react";

interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  timestamp: number;
  screenshot: string;
}

const mockSteps: Step[] = [
  {
    id: "1",
    number: 1,
    title: "Navigate to Dashboard",
    description: "Click on the dashboard icon in the left sidebar to access the main dashboard view.",
    timestamp: 0,
    screenshot: "",
  },
  {
    id: "2",
    number: 2,
    title: "Create New Project",
    description: "Click the 'New Project' button in the top right corner to start creating a new project.",
    timestamp: 15,
    screenshot: "",
  },
  {
    id: "3",
    number: 3,
    title: "Configure Settings",
    description: "Fill in the project name, description, and select your preferred options from the settings panel.",
    timestamp: 45,
    screenshot: "",
  },
  {
    id: "4",
    number: 4,
    title: "Save and Publish",
    description: "Review your changes and click 'Save' to store the project, then 'Publish' to make it live.",
    timestamp: 90,
    screenshot: "",
  },
];

export default function EditorPage() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120);
  const [selectedStep, setSelectedStep] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<"video" | "guide">("video");
  const [steps, setSteps] = useState(mockSteps);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const editorTools = [
    { id: "ai", icon: Wand2, label: "AI Enhance" },
    { id: "text", icon: Type, label: "Captions" },
    { id: "image", icon: Image, label: "Overlays" },
    { id: "music", icon: Music, label: "Audio" },
    { id: "layers", icon: Layers, label: "Layers" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">Product Onboarding Tutorial</h1>
              <p className="text-xs text-muted-foreground">Auto-saved 2 min ago</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="hero" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      {/* Main Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tools */}
        <aside className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
          {editorTools.map((tool) => (
            <Button key={tool.id} variant="ghost" size="icon" className="w-12 h-12" title={tool.label}>
              <tool.icon className="w-5 h-5" />
            </Button>
          ))}
        </aside>

        {/* Center - Video Preview & Timeline */}
        <div className="flex-1 flex flex-col bg-muted/30">
          {/* Tab Switcher */}
          <div className="flex items-center gap-2 px-6 pt-4">
            <Button
              variant={activeTab === "video" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("video")}
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </Button>
            <Button
              variant={activeTab === "guide" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("guide")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Guide
            </Button>
          </div>

          {/* Video Preview */}
          <div className="flex-1 p-6">
            <div className="h-full bg-card rounded-xl shadow-card overflow-hidden flex flex-col">
              <div className="flex-1 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Video Preview</p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-4 mb-3">
                  <Button variant="ghost" size="icon">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-mono text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <div className="flex-1" />
                  <Button variant="ghost" size="icon">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Timeline */}
                <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                  {/* Waveform placeholder */}
                  <div className="absolute inset-0 flex items-center px-2">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 mx-px bg-primary/40 rounded-full"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Playhead */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-primary"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full" />
                  </div>

                  {/* Step markers */}
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className="absolute top-1 w-1 h-2 bg-secondary rounded-full cursor-pointer hover:scale-150 transition-transform"
                      style={{ left: `${(step.timestamp / duration) * 100}%` }}
                      onClick={() => {
                        setSelectedStep(step.id);
                        setCurrentTime(step.timestamp);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Steps Editor */}
        <aside className="w-96 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Steps</h2>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`group glass rounded-xl p-4 cursor-pointer transition-all ${
                  selectedStep === step.id ? "ring-2 ring-primary" : "hover:shadow-card"
                }`}
                onClick={() => {
                  setSelectedStep(step.id);
                  setCurrentTime(step.timestamp);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 truncate">{step.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {formatTime(step.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Screenshot preview */}
                <div className="mt-3 aspect-video bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Wand2 className="w-4 h-4 mr-2 text-primary" />
              Regenerate All Steps
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Copy className="w-4 h-4 mr-2" />
              Copy as Markdown
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

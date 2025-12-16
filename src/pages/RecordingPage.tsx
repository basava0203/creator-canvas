import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Monitor,
  AppWindow,
  Chrome,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Circle,
  Square,
  Pause,
  Play,
  Settings,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

type RecordingSource = "screen" | "window" | "tab";

export default function RecordingPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedSource, setSelectedSource] = useState<RecordingSource>("screen");
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [systemAudioEnabled, setSystemAudioEnabled] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sourceOptions: { id: RecordingSource; label: string; icon: typeof Monitor; description: string }[] = [
    { id: "screen", label: "Full Screen", icon: Monitor, description: "Record your entire screen" },
    { id: "window", label: "Window", icon: AppWindow, description: "Record a specific application" },
    { id: "tab", label: "Browser Tab", icon: Chrome, description: "Record a single browser tab" },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = useCallback(async () => {
    try {
      // In a real app, this would use navigator.mediaDevices.getDisplayMedia()
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setShowPreview(true);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => {
      if (prev) {
        timerRef.current = setInterval(() => {
          setRecordingTime((t) => t + 1);
        }, 1000);
      } else if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return !prev;
    });
  }, []);

  const handleProcessRecording = () => {
    // Navigate to processing/editor
    navigate("/editor/new");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (showPreview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
              <Check className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Recording Complete!</h1>
            <p className="text-muted-foreground">
              Your recording is ready. Review and proceed to AI enhancement.
            </p>
          </div>

          <div className="glass rounded-2xl p-2 mb-8 animate-fade-in-up">
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Recording Preview</p>
                <p className="text-sm text-muted-foreground">Duration: {formatTime(recordingTime)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setShowPreview(false);
                setRecordingTime(0);
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Discard & Retry
            </Button>
            <Button variant="hero" size="lg" onClick={handleProcessRecording}>
              <Sparkles className="w-4 h-4 mr-2" />
              Process with AI
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
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
              <span className="text-xl font-bold">Clue</span>
            </div>
          </div>
          
          {isRecording && (
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="font-mono font-medium text-destructive">{formatTime(recordingTime)}</span>
              </div>
            </div>
          )}

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {!isRecording ? (
            <>
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-4xl font-bold mb-4">Start Recording</h1>
                <p className="text-xl text-muted-foreground">
                  Choose your recording source and settings, then hit record.
                </p>
              </div>

              {/* Source Selection */}
              <div className="mb-8 animate-fade-in-up">
                <h2 className="text-lg font-semibold mb-4">Recording Source</h2>
                <div className="grid grid-cols-3 gap-4">
                  {sourceOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSource(option.id)}
                      className={`glass rounded-xl p-6 text-left transition-all duration-200 hover:-translate-y-1 ${
                        selectedSource === option.id
                          ? "ring-2 ring-primary shadow-glow"
                          : "hover:shadow-card"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                          selectedSource === option.id ? "bg-primary/20" : "bg-muted"
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 ${
                            selectedSource === option.id ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <h3 className="font-semibold mb-1">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio/Video Options */}
              <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-lg font-semibold mb-4">Audio & Video</h2>
                <div className="glass rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <button
                      onClick={() => setMicEnabled(!micEnabled)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-colors ${
                        micEnabled ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      {micEnabled ? (
                        <Mic className="w-6 h-6 text-primary" />
                      ) : (
                        <MicOff className="w-6 h-6 text-muted-foreground" />
                      )}
                      <span className={micEnabled ? "text-primary font-medium" : "text-muted-foreground"}>
                        Microphone
                      </span>
                    </button>

                    <button
                      onClick={() => setCameraEnabled(!cameraEnabled)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-colors ${
                        cameraEnabled ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      {cameraEnabled ? (
                        <Camera className="w-6 h-6 text-primary" />
                      ) : (
                        <CameraOff className="w-6 h-6 text-muted-foreground" />
                      )}
                      <span className={cameraEnabled ? "text-primary font-medium" : "text-muted-foreground"}>
                        Webcam
                      </span>
                    </button>

                    <button
                      onClick={() => setSystemAudioEnabled(!systemAudioEnabled)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-colors ${
                        systemAudioEnabled ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      {systemAudioEnabled ? (
                        <Volume2 className="w-6 h-6 text-primary" />
                      ) : (
                        <VolumeX className="w-6 h-6 text-muted-foreground" />
                      )}
                      <span className={systemAudioEnabled ? "text-primary font-medium" : "text-muted-foreground"}>
                        System Audio
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Area */}
              <div className="glass rounded-2xl p-2 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a screen to preview</p>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <Button variant="hero" size="xl" onClick={startRecording} className="px-12">
                  <Circle className="w-5 h-5 fill-current" />
                  Start Recording
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center animate-fade-in">
              {/* Recording View */}
              <div className="glass rounded-2xl p-2 mb-8">
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4 relative">
                      <div className="absolute inset-0 rounded-full bg-destructive/30 animate-pulse-ring" />
                      <Video className="w-10 h-10 text-destructive" />
                    </div>
                    <p className="text-xl font-medium">Recording in Progress</p>
                    <p className="text-muted-foreground">{formatTime(recordingTime)}</p>
                  </div>
                  
                  {/* Webcam Preview */}
                  {cameraEnabled && (
                    <div className="absolute bottom-4 right-4 w-48 aspect-video bg-card rounded-lg border border-border overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="lg" onClick={togglePause}>
                  {isPaused ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button variant="destructive" size="lg" onClick={stopRecording}>
                  <Square className="w-5 h-5 mr-2 fill-current" />
                  Stop Recording
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

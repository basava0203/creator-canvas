import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  FileText,
  Clock,
  CheckCircle2,
  Loader2,
  Settings,
  Bell,
  User,
  Video,
  BookOpen,
  BarChart3,
  FolderOpen,
  ChevronDown,
} from "lucide-react";

type ProjectStatus = "recording" | "processing" | "ready" | "published";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  status: ProjectStatus;
  type: "video" | "guide" | "both";
  duration: string;
  createdAt: string;
  progress?: number;
}

const statusConfig: Record<ProjectStatus, { label: string; icon: typeof Clock; color: string }> = {
  recording: { label: "Recording", icon: Loader2, color: "text-amber-500" },
  processing: { label: "AI Processing", icon: Sparkles, color: "text-primary" },
  ready: { label: "Ready to Edit", icon: CheckCircle2, color: "text-secondary" },
  published: { label: "Published", icon: CheckCircle2, color: "text-secondary" },
};

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Product Onboarding Tutorial",
    thumbnail: "",
    status: "published",
    type: "both",
    duration: "4:32",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Feature Walkthrough - Dashboard",
    thumbnail: "",
    status: "ready",
    type: "video",
    duration: "2:15",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    title: "API Integration Guide",
    thumbnail: "",
    status: "processing",
    type: "guide",
    duration: "8:45",
    createdAt: "1 day ago",
    progress: 67,
  },
  {
    id: "4",
    title: "Settings Configuration",
    thumbnail: "",
    status: "processing",
    type: "both",
    duration: "3:20",
    createdAt: "1 day ago",
    progress: 23,
  },
  {
    id: "5",
    title: "Customer Support Flow",
    thumbnail: "",
    status: "ready",
    type: "video",
    duration: "5:10",
    createdAt: "2 days ago",
  },
  {
    id: "6",
    title: "Mobile App Demo",
    thumbnail: "",
    status: "published",
    type: "both",
    duration: "6:45",
    createdAt: "3 days ago",
  },
];

const stats = [
  { label: "Videos Created", value: "24", icon: Video, change: "+12%" },
  { label: "Guides Generated", value: "18", icon: BookOpen, change: "+8%" },
  { label: "Time Saved", value: "32h", icon: Clock, change: "+25%" },
  { label: "Views", value: "1.2k", icon: BarChart3, change: "+15%" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-4 flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Clue</span>
        </Link>

        <Button variant="hero" className="w-full mb-6" asChild>
          <Link to="/record">
            <Plus className="w-4 h-4" />
            New Recording
          </Link>
        </Button>

        <nav className="space-y-1 flex-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium">
            <FolderOpen className="w-5 h-5" />
            All Projects
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <Video className="w-5 h-5" />
            Videos
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <BookOpen className="w-5 h-5" />
            Guides
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </a>
        </nav>

        <div className="border-t border-border pt-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage your recordings and content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-5 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-secondary">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {(["all", "processing", "ready", "published"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                >
                  {status === "all" ? "All" : statusConfig[status]?.label || status}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <Link
      to={`/editor/${project.id}`}
      className="group glass rounded-xl overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-5 h-5 text-foreground" />
          </div>
        </div>
        {project.status === "processing" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-md bg-card/80 backdrop-blur text-xs font-medium">
            {project.duration}
          </span>
        </div>
        <div className="absolute top-3 left-3 flex gap-1">
          {(project.type === "video" || project.type === "both") && (
            <span className="p-1.5 rounded-md bg-card/80 backdrop-blur">
              <Video className="w-3 h-3" />
            </span>
          )}
          {(project.type === "guide" || project.type === "both") && (
            <span className="p-1.5 rounded-md bg-card/80 backdrop-blur">
              <FileText className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <Button variant="ghost" size="icon" className="shrink-0 -mr-2 -mt-1 h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-sm ${status.color}`}>
            <StatusIcon className={`w-4 h-4 ${project.status === "processing" ? "animate-spin" : ""}`} />
            <span>{status.label}</span>
            {project.progress !== undefined && (
              <span className="text-muted-foreground">({project.progress}%)</span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{project.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}

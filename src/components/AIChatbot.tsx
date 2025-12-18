import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! 👋 I'm creAnva's AI assistant. I can help you with:\n\n• Getting started with screen recording\n• Understanding our AI features\n• Pricing and plans\n• Technical support\n\nHow can I help you today?",
    timestamp: new Date(),
  },
];

const quickReplies = [
  "How do I start recording?",
  "What does AI enhancement do?",
  "Tell me about pricing",
  "How to export my video?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("record") || lowerMessage.includes("start")) {
      return "Starting a recording is easy! 🎬\n\n1. Click 'Start Recording' from your dashboard\n2. Choose what to capture: full screen, window, or browser tab\n3. Toggle webcam and microphone as needed\n4. Hit the record button and you're live!\n\nWould you like me to guide you to the recording page?";
    }

    if (lowerMessage.includes("ai") || lowerMessage.includes("enhance")) {
      return "Our AI enhancement is where the magic happens! ✨\n\n• **Script Cleanup**: Removes filler words (um, ah, like)\n• **Voice Generation**: Creates professional voiceovers\n• **Smart Chapters**: Auto-generates video chapters\n• **Guide Creation**: Transforms recordings into step-by-step docs\n\nAll of this happens automatically after you finish recording!";
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
      return "We have flexible pricing for everyone! 💰\n\n**Starter (Free)**\n• 3 videos/month\n• 5 min max length\n\n**Pro ($29/mo)**\n• Unlimited videos\n• 30 min max length\n• Premium AI voices\n\n**Enterprise (Custom)**\n• Everything in Pro\n• Custom AI training\n• Dedicated support\n\nWant to start with our free plan?";
    }

    if (lowerMessage.includes("export") || lowerMessage.includes("download") || lowerMessage.includes("share")) {
      return "You have lots of export options! 📤\n\n**Video Formats**\n• MP4 (1080p, 720p, 480p)\n• GIF snippets\n• Social media formats (9:16, 1:1, 16:9)\n\n**Guide Formats**\n• Interactive HTML\n• PDF with branding\n• Markdown\n• Confluence-compatible\n\nYou can also share with password-protected links!";
    }

    return "Great question! 🤔 I'd be happy to help with that. For more specific assistance, you can:\n\n• Visit our Help Center for detailed guides\n• Contact support@creanva.com for personalized help\n• Join our community Discord\n\nIs there anything else I can help you with?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "rotate-0" : "animate-pulse-slow"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="glass-strong rounded-2xl shadow-card overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
          {/* Header */}
          <div className="bg-gradient-primary p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">creAnva Assistant</h3>
              <p className="text-xs text-primary-foreground/80">AI-powered support</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                variant="hero"
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  userId: string;
}

const ChatInterface = ({ userId }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, [userId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) throw error;
      
      const mappedMessages = (data || []).map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.message_text,
        created_at: msg.created_at,
      }));
      
      setMessages(mappedMessages);
    } catch (error: any) {
      console.error("Error loading messages:", error);
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .insert({
          user_id: userId,
          role,
          message_text: content,
        });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error saving message:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message to UI immediately
    const tempUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      // Save user message
      await saveMessage("user", userMessage);

      // Call AI function
      const { data, error } = await supabase.functions.invoke("chat-companion", {
        body: { message: userMessage, userId },
      });

      if (error) {
        if (error.message?.includes("429")) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        }
        if (error.message?.includes("402")) {
          throw new Error("AI usage limit reached. Please contact support.");
        }
        throw error;
      }

      const assistantMessage = data.response;

      // Add assistant message to UI
      const tempAssistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantMessage,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, tempAssistantMsg]);

      // Save assistant message
      await saveMessage("assistant", assistantMessage);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
      
      // Remove the temporary user message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                Hi there! I'm UniFriend 👋
              </p>
              <p className="text-sm text-muted-foreground">
                I'm here to support you through your university journey. Ask me anything about your courses, 
                or just chat if you need someone to talk to!
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">UniFriend is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

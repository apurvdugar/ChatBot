import { useEffect, useMemo, useState } from "react";
import { SendHorizonal } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/ChatWindow";
import SuggestionChips from "@/components/SuggestionChips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PERSONAS = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    suggestions: [
      "How do I crack a FAANG interview in 6 months?",
      "Is a CS degree necessary to get into top product companies?",
      "What's the biggest mistake candidates make in DSA prep?"
    ]
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    suggestions: [
      "Can you explain dynamic programming like I'm a complete beginner?",
      "How should I approach a system design interview from scratch?",
      "What's the best way to debug my thinking during a coding interview?"
    ]
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    suggestions: [
      "How do I stay consistent when motivation fades?",
      "What separates a 10x engineer from an average one?",
      "I feel like a fraud in tech - how do I overcome imposter syndrome?"
    ]
  }
];
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

function App() {
  const [messages, setMessages] = useState([
    { id: "welcome", role: "assistant", content: "Hi! Ask me anything to get started." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [personaId, setPersonaId] = useState(PERSONAS[0].id);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const selectedPersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === personaId) ?? PERSONAS[0],
    [personaId]
  );
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, persona: selectedPersona.id })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const reply = typeof data.response === "string" ? data.response : "No reply received.";

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply
        }
      ]);
    } catch (e) {
      setError("Could not reach chatbot service. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong while fetching a response."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaChange = async (nextPersonaId) => {
    // if (nextPersonaId === personaId || loading) return;

    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/changePersona/${nextPersonaId}`, {
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error("Persona update failed");
      }

      setPersonaId(nextPersonaId);
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Switched to ${PERSONAS.find((persona) => persona.id === nextPersonaId)?.name}.`
        }
      ]);
    } catch (e) {
      setError("Could not switch persona right now. Please try again.");
    }
  };

  useEffect(() => {
    const fn = async() => {
      await handlePersonaChange(personaId);
    }
    fn()
  },[])

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        personas={PERSONAS}
        selectedPersona={selectedPersona}
        onPersonaChange={handlePersonaChange}
        theme={theme}
        onThemeChange={(checked) => setTheme(checked ? "dark" : "light")}
      />

      <main className="mx-auto flex w-full max-w-[700px] flex-1 flex-col gap-3 px-4 py-4">
        <ChatWindow messages={messages} loading={loading} />

        <div className="sticky bottom-0 space-y-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <SuggestionChips
            suggestions={selectedPersona.suggestions}
            disabled={loading}
            onSelect={sendMessage}
          />

          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${selectedPersona.name}...`}
              disabled={loading}
            />
            <Button type="submit" disabled={!canSend}>
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </form>

          {error ? <p className="text-xs text-red-500">{error}</p> : null}
        </div>
      </main>
    </div>
  );
}

export default App;

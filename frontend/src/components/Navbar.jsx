import { Bot, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

function Navbar({ personas, selectedPersona, onPersonaChange, theme, onThemeChange }) {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-14 w-full max-w-[700px] items-center justify-between px-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Bot className="h-4 w-4" />
          <span>Persona: {selectedPersona.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                {selectedPersona.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {personas.map((persona) => (
                <DropdownMenuCheckboxItem
                  key={persona.id}
                  checked={persona.id === selectedPersona.id}
                  onCheckedChange={() => onPersonaChange(persona.id)}
                  disabled={selectedPersona.id === persona.id}
                  className={selectedPersona.id === persona.id ? "opacity-50 cursor-not-allowed" : ""}
                >
                  {persona.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 dark:border-slate-800">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <Switch checked={isDark} onCheckedChange={onThemeChange} aria-label="Toggle dark mode" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

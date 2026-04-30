import { cn } from "@/lib/utils";

function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm",
          isUser
            ? "rounded-br-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            : "rounded-bl-md bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        )}
      >
        {content}
      </div>
    </div>
  );
}

export default MessageBubble;

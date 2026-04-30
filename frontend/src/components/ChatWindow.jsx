import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <Card className="flex-1 overflow-hidden shadow-sm">
      <CardContent className="h-full overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} content={message.content} />
          ))}
          {loading && <MessageBubble role="assistant" content="..." />}
          <div ref={bottomRef} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ChatWindow;

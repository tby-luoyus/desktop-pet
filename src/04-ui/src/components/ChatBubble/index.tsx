import { useState, useEffect } from 'react';

interface ChatBubbleProps {
  content: string;
  duration?: number;
}

export function ChatBubble({ content, duration = 5000 }: ChatBubbleProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="chat-bubble">
      {content}
    </div>
  );
}

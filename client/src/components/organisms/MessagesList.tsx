import { useEffect, useRef } from 'react';

import { Message } from 'modules/messages/service';
import ChatBubble from 'components/molecules/ChatBubble';
import MutedText from 'components/atoms/MutedText';

type MessagesListProps = {
  messages: Message[];
  currentUsername: string;
};

function MessagesList({ messages, currentUsername }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (messages.length === 0) {
      initialLoadDone.current = false;
      return;
    }

    if (!initialLoadDone.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView();
      initialLoadDone.current = true;
      return;
    }

    if (initialLoadDone.current) {
      const container = containerRef.current;
      if (!container) return;

      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;

      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-grow-1 overflow-auto border rounded p-3 mb-3"
      style={{ minHeight: 0 }}
    >
      {messages.length === 0 && (
        <MutedText className="d-block text-center">No messages yet. Say hello!</MutedText>
      )}

      {messages.map((msg) => {
        const isOwn = msg.senderId.username === currentUsername;
        return <ChatBubble key={msg._id} message={msg} isOwn={isOwn} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessagesList;

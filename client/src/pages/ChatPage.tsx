import { useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useAppDispatch, useAppSelector } from 'store/store';
import { LoadingState } from 'store/constants';
import { fetchMessages } from 'modules/messages/service';
import { Message } from 'modules/messages/service';
import messagesSlice from 'modules/messages/store';
import { getSocket } from 'modules/chat/socket';
import CenteredSpinner from 'components/molecules/CenteredSpinner';
import ChatBubble from 'components/molecules/ChatBubble';
import ChatMessageInput from 'components/organisms/ChatMessageInput';
import MutedText from 'components/atoms/MutedText';

export function ChatPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { messages, loading } = useAppSelector((state) => state.messages);
  const currentUsername = useAppSelector((state) => state.auth.username);
  const threads = useAppSelector((state) => state.threads.threads);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  const thread = threads.find((t) => t._id === threadId);
  const otherParticipant = thread?.participants.find(
    (p) => p.username !== currentUsername,
  );

  useEffect(() => {
    if (!threadId) return;

    initialLoadDone.current = false;
    dispatch(messagesSlice.actions.clearMessages());
    dispatch(fetchMessages({ threadId }));

    const socket = getSocket();
    if (socket) {
      socket.emit('joinThread', { threadId });

      const handleNewMessage = (message: Message) => {
        if (message.threadId === threadId) {
          dispatch(messagesSlice.actions.addMessage(message));
        }
      };

      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.emit('leaveThread', { threadId });
        dispatch(messagesSlice.actions.clearMessages());
      };
    }
  }, [threadId, dispatch]);

  useEffect(() => {
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

  const handleSend = useCallback(
    (text: string) => {
      const socket = getSocket();
      if (socket && threadId) {
        socket.emit('sendMessage', { threadId, text });
      }
    },
    [threadId],
  );

  if (loading === LoadingState.Pending && messages.length === 0) {
    return <CenteredSpinner />;
  }

  return (
    <Container className="mt-4 d-flex flex-column" style={{ maxWidth: 600, height: 'calc(100vh - 100px)' }}>
      <div className="d-flex align-items-center mb-3">
        <Button variant="outline-secondary" size="sm" onClick={() => navigate('/threads')} className="me-3">
          &larr; Back
        </Button>
        <h5 className="mb-0">{otherParticipant?.username ?? 'Chat'}</h5>
      </div>

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

      <ChatMessageInput onSend={handleSend} />
    </Container>
  );
}

import { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/store';
import { LoadingState } from 'store/constants';
import { fetchMessages } from 'modules/messages/service';
import { Message } from 'modules/messages/service';
import messagesSlice from 'modules/messages/store';
import { getSocket } from 'modules/chat/socket';
import NarrowColumnTemplate from 'components/templates/NarrowColumnTemplate';
import CenteredSpinner from 'components/molecules/CenteredSpinner';
import PageHeaderGroup from 'components/molecules/PageHeaderGroup';
import MessagesList from 'components/organisms/MessagesList';
import ChatMessageForm from 'components/organisms/ChatMessageForm';

export function ChatPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { messages, loading } = useAppSelector((state) => state.messages);
  const currentUsername = useAppSelector((state) => state.auth.username);
  const threads = useAppSelector((state) => state.threads.threads);

  const thread = threads.find((t) => t._id === threadId);
  const otherParticipant = thread?.participants.find(
    (p) => p.username !== currentUsername,
  );

  useEffect(() => {
    if (!threadId) return;

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
    <NarrowColumnTemplate className="d-flex flex-column" style={{ height: 'calc(100vh - 100px)' }}>
      <PageHeaderGroup title={otherParticipant?.username ?? 'Chat'} onBack={() => navigate('/threads')} />
      <MessagesList messages={messages} currentUsername={currentUsername ?? ''} />
      <ChatMessageForm onSend={handleSend} />
    </NarrowColumnTemplate>
  );
}

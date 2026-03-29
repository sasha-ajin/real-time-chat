import MutedText from 'components/atoms/MutedText';
import { Message } from 'modules/messages/service';

type ChatBubbleProps = {
  message: Message;
  isOwn: boolean;
};

function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  return (
    <div className={`d-flex mb-2 ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}>
      <div
        className={`px-3 py-2 rounded-3 ${isOwn ? 'bg-primary text-white' : 'bg-light border'}`}
        style={{ maxWidth: '70%', wordBreak: 'break-word' }}
      >
        <div>{message.text}</div>
        <small
          className={isOwn ? 'text-white-50' : undefined}
          style={{ fontSize: '0.7rem' }}
        >
          {isOwn ? (
            new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          ) : (
            <MutedText>
              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </MutedText>
          )}
        </small>
      </div>
    </div>
  );
}

export default ChatBubble;

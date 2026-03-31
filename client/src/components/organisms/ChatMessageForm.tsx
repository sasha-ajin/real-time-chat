import { useState, useCallback, FormEvent, KeyboardEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import PrimarySubmitButtonControl from 'components/atoms/PrimarySubmitButtonControl';

type ChatMessageFormProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

function ChatMessageForm({ onSend, disabled }: ChatMessageFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      const trimmed = text.trim();
      if (!trimmed) return;
      onSend(trimmed);
      setText('');
    },
    [text, onSend],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{ resize: 'none' }}
        />
        <PrimarySubmitButtonControl disabled={disabled || !text.trim()}>
          Send
        </PrimarySubmitButtonControl>
      </InputGroup>
    </Form>
  );
}

export default ChatMessageForm;

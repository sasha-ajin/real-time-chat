import { CSSProperties, ReactNode } from 'react';

type MutedTextProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

function MutedText({ children, className, style }: MutedTextProps) {
  return (
    <small className={`text-muted ${className ?? ''}`.trim()} style={style}>
      {children}
    </small>
  );
}

export default MutedText;

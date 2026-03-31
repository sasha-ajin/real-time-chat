import Button, { ButtonProps } from 'react-bootstrap/Button';
import clsx from 'clsx';

export type BackButtonControlProps = Omit<ButtonProps, 'variant' | 'size'> & {
  className?: string;
};

function BackButtonControl({ children = '\u2190 Back', className, ...props }: BackButtonControlProps) {
  return (
    <Button variant="outline-secondary" size="sm" className={clsx(className)} {...props}>
      {children}
    </Button>
  );
}

export default BackButtonControl;

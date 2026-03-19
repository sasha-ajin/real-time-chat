import Button, { ButtonProps } from 'react-bootstrap/Button';
import clsx from 'clsx';

export type PrimarySubmitButtonControlProps = Omit<ButtonProps, 'variant' | 'type'> & {
  className?: string;
};

function PrimarySubmitButtonControl({ children, className, ...props }: PrimarySubmitButtonControlProps) {
  return (
    <Button variant="primary" type="submit" className={clsx(className)} {...props}>
      {children}
    </Button>
  );
}

export default PrimarySubmitButtonControl;

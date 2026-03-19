import clsx from 'clsx';
import PrimarySubmitButtonControl, {
  PrimarySubmitButtonControlProps,
} from '@atoms/PrimarySubmitButtonControl';

type PrimarySubmitButtonGroupProps = PrimarySubmitButtonControlProps & {
  className?: string;
};

function PrimarySubmitButtonGroup({ children, className, ...controlProps }: PrimarySubmitButtonGroupProps) {
  return (
    <div className={clsx('mb-3', className)}>
      <PrimarySubmitButtonControl className="w-100" {...controlProps}>
        {children}
      </PrimarySubmitButtonControl>
    </div>
  );
}

export default PrimarySubmitButtonGroup;

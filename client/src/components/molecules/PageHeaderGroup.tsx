import clsx from 'clsx';

import BackButtonControl from 'components/atoms/BackButtonControl';

type PageHeaderGroupProps = {
  title: string;
  onBack: () => void;
  className?: string;
};

function PageHeaderGroup({ title, onBack, className }: PageHeaderGroupProps) {
  return (
    <div className={clsx('d-flex align-items-center mb-3', className)}>
      <BackButtonControl onClick={onBack} className="me-3" />
      <h5 className="mb-0">{title}</h5>
    </div>
  );
}

export default PageHeaderGroup;

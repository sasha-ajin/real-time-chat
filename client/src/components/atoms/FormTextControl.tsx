import { Form, FormControlProps as BaseFormControlProps } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import clsx from 'clsx';

export type FormControlProps = Omit<BaseFormControlProps, 'size'> & {
  name: string;
  className?: string;
  hasSolidBackground?: boolean;
};

function FormTextControl({ name, className, hasSolidBackground = true, ...props }: FormControlProps) {
  const formik = useFormikContext();
  const field = formik.getFieldMeta<string>(name);
  const fieldProps = formik.getFieldProps<string>(name);
  const isInvalid = Boolean(field.error);

  return (
    <>
      <Form.Control
        {...fieldProps}
        {...props}
        type="text"
        name={name}
        onChange={formik.handleChange}
        value={field.value ?? ''}
        className={clsx(`form-control`, className, {
          'is-invalid': isInvalid,
          'form-control-solid': hasSolidBackground,
        })}
      />
      {isInvalid && <p className="text-danger">{field.error}</p>}
    </>
  );
}

export default FormTextControl;

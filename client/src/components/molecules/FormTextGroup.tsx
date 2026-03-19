import Form from 'react-bootstrap/Form';
import FormTextControl, { FormControlProps } from 'components/atoms/FormTextControl';

type FormTextGroupProps = FormControlProps & {
  label: string;
  controlId: string;
};

function FormTextGroup({ label, controlId, ...controlProps }: FormTextGroupProps) {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <FormTextControl {...controlProps} />
    </Form.Group>
  );
}

export default FormTextGroup;

import Form from 'react-bootstrap/Form';
import FormTextControl from '@atoms/FormTextControl';

export function FormTextGroup({ label, className, hasSolidBackground = true, ...props }) {
  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{label}</Form.Label>
      <FormTextControl name="name" placeholder="Enter name" />
    </Form.Group>
  );
}

import { useMemo, useCallback } from 'react';
import { FormikValues, FormikHelpers, FormikProvider } from 'formik';
import { handleBackEndValidation } from 'utils/handleBackendValidation';
import * as yup from 'yup';
import { useForm } from 'hooks/form/useForm';
import { buildValidationSchema } from 'utils/buildValidationSchema';
import FormTextGroup from '@molecules/FormTextGroup';
import Form from 'react-bootstrap/Form';
import PrimarySubmitButtonGroup from '@molecules/PrimarySubmitButtonGroup';

export interface SignUpInput extends FormikValues {
  email: string;
  username: string;
  password: string;
}

export interface SignUpOutput extends FormikValues {
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

function SignUpFormCard() {
  const initialValues = useMemo<SignUpInput>(
    () => ({
      email: '',
      username: '',
      password: '',
    }),
    [],
  );

  const validationSchema = useMemo(
    () =>
      buildValidationSchema<SignUpInput>({
        username: yup.string().required().max(50),
        email: yup.string().email().required().max(50),
        password: yup.string().required().max(10),
      }),
    [],
  );

  const handleSubmit = useCallback(async (values: SignUpInput, formikHelpers: FormikHelpers<SignUpInput>) => {
    const submitWithValidation = handleBackEndValidation<SignUpInput>(async (values) => {
      return console.log('success');
    });
    const response = (await submitWithValidation(values, formikHelpers)) as SignUpOutput;
    if (response) {
      formik.resetForm();
    }
  }, []);

  const formik = useForm<SignUpInput>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
          <FormTextGroup
            name="username"
            label="Username"
            controlId="username"
            placeholder="Enter username"
          />
          <FormTextGroup
            name="email"
            label="Email"
            controlId="email"
            placeholder="Enter email"
          />
          <FormTextGroup
            name="password"
            label="Password"
            controlId="password"
            placeholder="Enter password"
            type="password"
          />
          <PrimarySubmitButtonGroup>Sign Up</PrimarySubmitButtonGroup>
      </Form>
    </FormikProvider>
  );
}

export default SignUpFormCard;

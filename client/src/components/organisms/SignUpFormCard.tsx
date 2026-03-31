import { useMemo, useCallback } from 'react';
import { FormikValues, FormikHelpers, FormikProvider } from 'formik';
import { handleBackEndValidation } from 'utils/handleBackendValidation';
import * as yup from 'yup';
import { useForm } from 'hooks/form/useForm';
import { buildValidationSchema } from 'utils/buildValidationSchema';
import FormTextGroup from 'components/molecules/FormTextGroup';
import Form from 'react-bootstrap/Form';
import PrimarySubmitButtonGroup from 'components/molecules/PrimarySubmitButtonGroup';
import { useAppDispatch } from 'store/store';
import { signUp } from 'modules/auth/service';
import { useNavigate } from 'react-router-dom';

export interface SignUpInput extends FormikValues {
  email: string;
  username: string;
  password: string;
}

function SignUpFormCard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      const result = await dispatch(signUp({
        username: values.username,
        email: values.email,
        password: values.password,
      })).unwrap();
      return result;
    });
    const response = await submitWithValidation(values, formikHelpers);
    if (response) {
      formikHelpers.resetForm();
      navigate('/');
    }
  }, [dispatch, navigate]);

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
          />
          <PrimarySubmitButtonGroup>Sign Up</PrimarySubmitButtonGroup>
      </Form>
    </FormikProvider>
  );
}

export default SignUpFormCard;

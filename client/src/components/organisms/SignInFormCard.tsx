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
import { signIn } from 'modules/auth/service';
import { useNavigate } from 'react-router-dom';

export interface SignInInput extends FormikValues {
  username: string;
  password: string;
}

function SignInFormCard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValues = useMemo<SignInInput>(
    () => ({
      username: '',
      password: '',
    }),
    [],
  );

  const validationSchema = useMemo(
    () =>
      buildValidationSchema<SignInInput>({
        username: yup.string().required().max(50),
        password: yup.string().required().max(10),
      }),
    [],
  );

  const handleSubmit = useCallback(async (values: SignInInput, formikHelpers: FormikHelpers<SignInInput>) => {
    const submitWithValidation = handleBackEndValidation<SignInInput>(async (values) => {
      const result = await dispatch(signIn({
        username: values.username,
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

  const formik = useForm<SignInInput>({
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
            name="password"
            label="Password"
            controlId="password"
            placeholder="Enter password"
            type="password"
          />
          <PrimarySubmitButtonGroup>Sign In</PrimarySubmitButtonGroup>
      </Form>
    </FormikProvider>
  );
}

export default SignInFormCard;

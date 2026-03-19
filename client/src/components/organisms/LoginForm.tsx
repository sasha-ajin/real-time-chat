import { useMemo, useCallback } from 'react';
import { FormikValues } from 'formik';
import { handleBackEndValidation } from 'utils/handleBackendValidation';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useForm } from 'hooks/form/useForm';
import { buildValidationSchema } from 'utils/buildValidationSchema';

export interface LoginInput extends FormikValues {
  email: string;
  username: string;
  password: string;
}

export interface LoginOutput extends FormikValues {
  user: {
    _id: string;
    email: string;
    username: string;
  };
}

function LoginForm() {
  const initialValues = useMemo<LoginInput>(
    () => ({
      email: '',
      username: '',
      password: '',
    }),
    [],
  );

  const validationSchema = useMemo(
    () =>
      buildValidationSchema<LoginInput>({
        username: yup.string().required().max(50),
        email: yup.string().email().required().max(50),
        password: yup.string().required().max(5),
      }),
    [],
  );

  const handleSubmit = useCallback(async (values: LoginInput, formikHelpers: FormikHelpers<LoginInput>) => {
    const submitWithValidation = handleBackEndValidation<LoginInput>(async (values) => {
      return 'f';
    });
    const response = (await submitWithValidation(values, formikHelpers)) as LoginOutput;
    if (response) {
      formik.resetForm();
    }
  }, []);

  const formik = useForm<LoginInput>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return <div></div>;
}

export default LoginForm;

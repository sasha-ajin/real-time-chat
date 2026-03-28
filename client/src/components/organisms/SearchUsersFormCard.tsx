import { useMemo, useCallback } from 'react';
import { FormikValues, FormikHelpers, FormikProvider } from 'formik';
import { handleBackEndValidation } from 'utils/handleBackendValidation';
import * as yup from 'yup';
import { useForm } from 'hooks/form/useForm';
import { buildValidationSchema } from 'utils/buildValidationSchema';
import FormTextGroup from 'components/molecules/FormTextGroup';
import Form from 'react-bootstrap/Form';
import PrimarySubmitButtonGroup from 'components/molecules/PrimarySubmitButtonGroup';

export interface SearchUsersInput extends FormikValues {
  userName: string;
}

type SearchUsersFormCardProps = {
  onSearch: (userName: string) => Promise<void>;
};

function SearchUsersFormCard({ onSearch }: SearchUsersFormCardProps) {
  const initialValues = useMemo<SearchUsersInput>(
    () => ({
      userName: '',
    }),
    [],
  );

  const validationSchema = useMemo(
    () =>
      buildValidationSchema<SearchUsersInput>({
        userName: yup.string().required().max(50),
      }),
    [],
  );

  const handleSubmit = useCallback(async (values: SearchUsersInput, formikHelpers: FormikHelpers<SearchUsersInput>) => {
    const submitWithValidation = handleBackEndValidation<SearchUsersInput>(async (values) => {
      await onSearch(values.userName);
    });
    await submitWithValidation(values, formikHelpers);
  }, [onSearch]);

  const formik = useForm<SearchUsersInput>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
          <FormTextGroup
            name="userName"
            label="Username"
            controlId="userName"
            placeholder="Enter username"
          />
          <PrimarySubmitButtonGroup>Search</PrimarySubmitButtonGroup>
      </Form>
    </FormikProvider>
  );
}

export default SearchUsersFormCard;

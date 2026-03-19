import { AxiosError } from 'axios';
import { FormikHelpers, FormikValues } from 'formik';

export function handleBackEndValidation<T = FormikValues>(
    onSubmit: (values: T) => Promise<unknown>,
): (values: T, formikHelpers: FormikHelpers<T>) => Promise<unknown> {
    return async (values: T, formikHelpers: FormikHelpers<T>) => {
        try {
            return await onSubmit(values);
        } catch (error) {
            const internalError = error as AxiosError;

            if (internalError?.response?.status === 403 && internalError.response.data?.errors) {
                for (const fieldName in internalError.response.data.errors) {
                    if (!Object.prototype.hasOwnProperty.call(internalError.response.data.errors, fieldName)) {
                        continue;
                    }

                    const errors = internalError.response.data.errors[fieldName];
                    const errorMessage = errors.join(' ');

                    formikHelpers.setFieldError(fieldName, errorMessage);
                }
            }
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };
}
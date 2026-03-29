import { FormikHelpers, FormikValues } from 'formik';

interface BackendErrorWithFields {
  errors: Record<string, string[]>;
}

interface BackendErrorWithMessage {
  message: string | string[];
}

function isErrorWithFields(error: unknown): error is BackendErrorWithFields {
  return typeof error === 'object' && error !== null && 'errors' in error;
}

function isErrorWithMessage(error: unknown): error is BackendErrorWithMessage {
  const msg = (error as BackendErrorWithMessage)?.message;
  return (
    typeof error === 'object' && error !== null && 'message' in error && (typeof msg === 'string' || Array.isArray(msg))
  );
}

export function handleBackEndValidation<T = FormikValues>(
  onSubmit: (values: T) => Promise<unknown>,
): (values: T, formikHelpers: FormikHelpers<T>) => Promise<unknown> {
  return async (values: T, formikHelpers: FormikHelpers<T>) => {
    try {
      return await onSubmit(values);
    } catch (error) {
      if (isErrorWithFields(error)) {
        for (const fieldName in error.errors) {
          if (!Object.prototype.hasOwnProperty.call(error.errors, fieldName)) {
            continue;
          }

          const errors = error.errors[fieldName];
          const errorMessage = errors.join(' ');

          formikHelpers.setFieldError(fieldName, errorMessage);
        }
      } else if (isErrorWithMessage(error)) {
        const messages = Array.isArray(error.message) ? error.message : [error.message];
        const fieldNames = Object.keys(values as FormikValues);

        for (const msg of messages) {
          const matchedField = fieldNames.find((field) => msg.toLowerCase().includes(field.toLowerCase()));

          if (matchedField) {
            formikHelpers.setFieldError(matchedField, msg);
          }
        }
      }
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };
}

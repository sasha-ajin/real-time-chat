import {
  FormikContextType,
  FormikHelpers,
  FormikValues,
  useFormik,
} from 'formik';
import * as yup from 'yup';

type FormConfig<T extends FormikValues> = {
  initialValues: T;
  initialStatus?: unknown;
  validationSchema?: yup.ObjectSchema<Record<keyof T, any>>;
  onSubmit?: (
    values: T,
    formikHelpers: FormikHelpers<T>,
  ) => void | Promise<void | undefined | unknown>;
};

export function useForm<T extends FormikValues>({
  initialValues,
  initialStatus,
  validationSchema,
  onSubmit,
}: FormConfig<T>): FormikContextType<T> {
  const formik = useFormik({
    initialValues,
    initialStatus,
    validationSchema: validationSchema ?? yup.object().shape({}),
    onSubmit: onSubmit ?? (() => undefined),
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  }) as unknown as FormikContextType<T>;

  return formik;
}

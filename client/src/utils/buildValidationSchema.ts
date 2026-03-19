import * as yup from 'yup';
import { FormikValues } from 'formik';

export function buildValidationSchema<T extends FormikValues>(
  shape: { [K in keyof Required<T>]: yup.AnySchema },
) {
  return yup.object().shape(shape);
}
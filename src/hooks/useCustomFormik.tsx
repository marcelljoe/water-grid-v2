import { FormikConfig, FormikProps, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useCustomFormik = <Values extends FormikValues = FormikValues>(
  config: FormikConfig<Values>
): FormikProps<Values> => {
  const { locale } = useRouter();

  const formik = useFormik(config);

  // Reset to prevent showing errors in language before locale change
  useEffect(() => {
    formik.setErrors({});
  }, [locale]);

  // Scroll to first error message when there is a error found
  useEffect(() => {
    if (formik.isValid || !formik.isSubmitting) {
      return;
    }

    // console.log(formik.errors);
    const firstErrorFieldName = Object.keys(formik.errors)[0];
    // console.log(firstErrorFieldName);

    // use getById if Fields Component don't have name props
    let element = document.getElementsByName(firstErrorFieldName)[0] || document.getElementById(firstErrorFieldName);
    if (!element && firstErrorFieldName) {
      const obj = formik.errors[firstErrorFieldName] as any;

      if (obj) {
        const ifValue = obj.value;
        const first = ifValue ? Object.keys(ifValue)[0] : '';

        // check if it iframe
        element = document.getElementsByName(first + '_ifr')[0] || document.getElementById(first + '_ifr');

        if (!element) {
          element = document.getElementsByName(first)[0];
        }
      }
    }

    // Avoid element not found
    if (!element) {
      // console.log(firstErrorFieldName, ' not found')
      return;
    }

    formik.errors[firstErrorFieldName] !== '' && element.scrollIntoView({ behavior: 'smooth' });
  }, [formik.isSubmitting, formik.isValid, formik.errors]);

  return formik;
};

export default useCustomFormik;

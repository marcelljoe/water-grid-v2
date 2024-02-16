import * as yup from 'yup';

const roleSchema = yup.object().shape({
  description: yup.string().required('Description is Required'),
  status: yup
    .number()
    .required('Status is Required')
    .oneOf([0, 1], 'Status must be either 0 or 1')
    .integer('Status must be an integer')
});

// export role schema
export default roleSchema;

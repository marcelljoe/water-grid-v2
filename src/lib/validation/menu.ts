import * as yup from 'yup';

const menuSchema = yup.object().shape({
  menu: yup.string().required('Menu is Required'),
  path: yup.string().required('Path is Required'),
  sort: yup.string().required('Sort is Required')
});

// export users schema
export default menuSchema;

// import modules
import * as yup from 'yup';

// define loginSchema
const loginSchema = yup.object().shape({
  username: yup.string().required('Username is Required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')
});

// export login schema
export default loginSchema;

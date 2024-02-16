// Import Modules
import * as yup from 'yup';

// Define Forgot Schema
const resetSchema = yup.object().shape({
  password: yup.string().min(8, 'Minimum Length 8 Character').required('Password is Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Password must match')
    .required('Confirm Password is Required')
});

// Export Forgot Schema
export default resetSchema;

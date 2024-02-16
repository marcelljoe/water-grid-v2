// Import Modules
import * as yup from 'yup';

// Define Forgot Schema
const forgotSchema = yup.object().shape({
  email: yup.string().email('Email Invalid').required('Email is Required')
});

// Export Forgot Schema
export default forgotSchema;

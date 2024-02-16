import * as yup from 'yup';

const profileSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
  confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')
});

// export users schema
export default profileSchema;

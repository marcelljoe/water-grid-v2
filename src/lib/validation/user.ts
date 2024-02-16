import * as yup from 'yup';

const userSchema = yup.object().shape({
  hp: yup.string().required('Hp is Required'),
  name: yup.string().required('Name is Required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
  role: yup.string().required('Role is Required'),
  username: yup.string().required('Username is Required')
});

// export users schema
export default userSchema;

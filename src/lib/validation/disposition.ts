// Import Modules
import * as yup from 'yup';

// Define Forgot Schema
const dispositionSchema = yup.object().shape({
  // employee: yup.array().min(1, 'Employee must be filled'),
  // employee: yup.string().required('Employee must be filled'),
  employee: yup
    .object()
    .shape({
      label: yup.string().required('Employee label is required'),
      value: yup.string().required('Employee value is required')
    })
    .nullable()
    .required('Employee must be filled'),
  notes: yup.string().required('Notes is Required'),
  date: yup.string().required('Date is required')
});

// Export disposition Schema
export default dispositionSchema;

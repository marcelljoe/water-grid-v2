import * as yup from 'yup';

const IncomingMailSchema = yup.object().shape({
  letterNumber: yup.string().required('Nomor Surat is Required'),
  letterDate: yup.string().required('Tanggal Surat is Required'),
  regarding: yup.string().required('Perihal is Required'),
  letterFrom: yup.string().required('Asal Surat is Required'),
  letterDescription: yup.string().required('Deskripsi Surat is Required')
});

export default IncomingMailSchema;

import * as yup from 'yup';

const templateSchema = yup.object().shape({
  templateName: yup.string().required('Harap isi Nama Template'),
  mailTitle: yup.string().required('Harap isi Judul Surat'),
  withImage: yup.boolean(),
  withMailNumber: yup.boolean(),
  templateHeaderBorder: yup.string().required('Harap Pilih Jenis Border'),
  templateOrigin: yup.string().required('Harap Pilih Template Asal Surat'),
  templateContent: yup.string().required('Harap Pilih Template Badan Surat'),
  templateApproval: yup.string().required('Harap Pilih Template Tanda Tangan'),
  withReciever: yup.boolean(),
  withOpeningText: yup.boolean(),
  withClosingText: yup.boolean(),
  withCarbonCopy: yup.boolean(),
  withMailFooter: yup.boolean()
});

export default templateSchema;

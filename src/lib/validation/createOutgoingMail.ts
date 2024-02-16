import * as yup from 'yup';

// 4. Kolom yg required ketika bikin surat :   Isi Surat, Tanda Tangan

const OutgoingMailSchema = yup.object().shape({
  mailTypeId: yup.object().required('Template Surat harus dipilih'),
  // header: yup.object().shape({
  //   value: yup.object().shape({
  //     Judul: yup.string().required('Judul harus diisi')
  //   })
  // }),
  content: yup.object().shape({
    value: yup.object().shape({
      ['Isi Surat']: yup.string().required('Isi Surat harus diisi')
    })
  }),
  signature: yup.object().shape({
    value: yup.object().test('is-defined', 'Tanda Tangan tidak boleh kosong', function (value) {
      // If the value is not undefined, it passes the validation
      return value !== undefined;
    })
  }),
  type: yup.string().required('Type is required'),
  value: yup.object().shape(
    {
      diTempat: yup.string().required('Tempat harus diisi'),
      subject: yup.string().required('Perihal Surat harus diisi'),
      docNo: yup.string().required('Nomor Surat harus diisi'),
      letterDate: yup.string().required('Tanggal Surat harus diisi'),
      // from: yup.string().required('Dari harus diisi'),
      paraf: yup.array().min(1, 'Approval untuk paraf harus dipilih'),
      toGroup: yup.array().when('addressedTo', (addressedTo, sch) => {
        const value = addressedTo[0] || undefined;
        if (!value) {
          return sch.min(1, 'Ditujukan kepada harus dipilih').required('Ditujukan kepada harus dipilih');
        }
        return sch.notRequired();
      }),
      addressedTo: yup.string().when(['toGroup'], (toGroup, sch) => {
        if (!toGroup || toGroup.length < 1) {
          return sch.required('Ditujukan kepada harus diisi');
        }
        return sch.notRequired();
      })
    },
    [['toGroup', 'addressedTo']]
  )
});

export default OutgoingMailSchema;

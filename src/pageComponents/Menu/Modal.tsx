import * as React from 'react';
import { Box, Modal } from '@mui/material';
import { MenuBox } from './Menu.styled';
import { MenuInitialValue } from './Menu.types';
import MenuForm from './Form';
import { menuSchema } from '@/lib/validation';
import useCustomFormik from '@/hooks/useCustomFormik';
import { Formik, FormikProvider, Form as FormikForm } from 'formik';
import { http } from '@/utils/httpClient';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 380,
  width: '35%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  // boxShadow: 24,
  p: 4
};

type Props = {
  modal: boolean;
  openModal: any;
  data: any;
  onFormSubmit: any;
};

const FormModal = (props: Props) => {
  const { modal, openModal, data, onFormSubmit } = props;
  const reset = () => {
    formik.resetForm();
  };

  let formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: props.data?.id || '',
      menu: props.data?.menu || '',
      path: props.data?.path || '',
      sort: props.data?.sort || '',
      status: props.data?.status || 0,
      header: props.data?.header || 0,
      oldMenu: props.data?.menu || ''
    },

    onSubmit: values => {
      onFormSubmit(values);
      openModal(false, [], formik.isSubmitting);
      reset();
    },
    validationSchema: menuSchema
  });

  // define handleShowPassword

  return (
    <React.Fragment>
      <Modal
        open={modal}
        onClose={() => openModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={'custom-papper'}>
          <FormikProvider value={formik}>
            <FormikForm>
              <MenuForm
                isSubmitting={formik.isSubmitting}
                isValid={formik.isValid}
                dirty={formik.dirty}
                values={formik.values}
              />
            </FormikForm>
          </FormikProvider>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default FormModal;

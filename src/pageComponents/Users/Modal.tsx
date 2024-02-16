import React, { useContext, useEffect, useState } from 'react';

import { Box, Modal } from '@mui/material';
import UsersForm from './Form';
import { UsersInitialValue } from './Users.types';
import { Formik } from 'formik';
import { userSchema } from '@/lib/validation';
import { UsersBox } from './Users.styled';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm } from 'formik';
import useSWR, { mutate } from 'swr';
import { http } from '@/utils/httpClient';
import { StoreContext } from '@/context/context';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4
};

type Props = {
  modal: boolean;
  openModal: any;
  datarow?: any;
};

const FormModal = (props: Props) => {
  const { modal, openModal, datarow } = props;
  const { state, actions } = useContext(StoreContext);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const submit = async (values: any) => {
    if (!values.id) {
      const response = await http.post('/api/setting/users', values);
      if (response.data == 'Success') {
        formik.resetForm();
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Berhasil membuat akun',
          title: 'Sukses',
          type: 'success',
          onClose: () => {
            openModal(false);
          }
        });
      } else {
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/error.png',
          content: 'Terjadi Kesalahan',
          title: 'Error',
          type: 'error',
          onClose: () => {
            openModal(false);
          }
        });
      }
    } else {
      const response = await http.post('/api/setting/users?type=update', values);
      if (response.data == 'Success') {
        formik.resetForm();
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Berhasil mengubah data',
          title: 'Sukses',
          type: 'success',
          onClose: () => {
            openModal(false);
          }
        });
      } else {
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/error.png',
          content: 'Terjadi Kesalahan',
          title: 'Error',
          type: 'error',
          onClose: () => {
            openModal(false);
          }
        });
      }
    }
  };

  let formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: datarow?.id || '',
      name: datarow?.name || '',
      oldUsername: datarow?.username || '',
      username: datarow?.username || '',
      hp: datarow?.hp || '',
      password: '',
      role: datarow?.accessId || ''
    },
    validationSchema: userSchema,

    onSubmit: values => {
      submit(values);
      formik.resetForm();
    }
  });

  // define handleShowPassword
  const handleShowPassword = () => {
    setShowPassword(open => !open);
  };

  const handleSubmit = () => {};

  const { data, error } = useSWR(`/api/master/access`);

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
              <UsersBox>
                <UsersForm
                  isSubmitting={formik.isSubmitting}
                  isValid={formik.isValid}
                  dirty={formik.dirty}
                  values={formik.values}
                  openPassword={showPassword}
                  handleShowPass={handleShowPassword}
                  access={data}
                  openModal={openModal}
                />
              </UsersBox>
            </FormikForm>
          </FormikProvider>
        </Box>
      </Modal>
      <ConfirmationDialog />
    </React.Fragment>
  );
};

export default FormModal;

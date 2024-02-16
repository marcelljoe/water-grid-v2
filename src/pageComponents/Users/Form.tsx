import { CustomFormControl, CustomFormInput } from '@/components/FormControlled/Form.styled';
import { Field } from 'formik';
import { FormContent, UsersCard, UsersCardContent, UsersCardFooter } from './Users.styled';
import { PropsUsersForm } from './Users.types';
import TextField from '@/components/FormControlled/Formik/TextField';
import { CardHeader, IconButton, InputAdornment } from '@mui/material';
import {
  AccessibilityOutlined,
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material';
import { ButtonPrimary, ButtonSecondary } from '@/components/Button/Button.styled';
import Select from '@/components/FormControlled/Formik/Select';
import { Label } from '../Template/Form/Form.styled';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';

const UsersForm = (props: PropsUsersForm) => {
  const { openPassword, handleShowPass, isSubmitting, isValid, dirty, values, access, openModal } = props;

  return (
    <UsersCard>
      <UsersCardContent>
        <FormContent>
          <CardHeader
            sx={{ marginTop: '-30px', marginBottom: '-30px' }}
            title={values?.id ? 'Update User' : 'Add User'}
          />
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              {/* <Label>Username</Label> */}
              <FormikField
                fieldType={FormikFieldType.TextField}
                name="username"
                placeholder="Username"
                size="small"
                type={'text'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <FormikField
                fieldType={FormikFieldType.TextField}
                name="password"
                placeholder="Kata Sandi"
                size="small"
                type={openPassword ? 'text' : 'password'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginLeft: '-30px' }}>
                      <IconButton onClick={handleShowPass}>
                        {openPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <FormikField fieldType={FormikFieldType.TextField} type={'text'} name="name" placeholder="Name" />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <FormikField fieldType={FormikFieldType.TextField} type={'number'} name="hp" placeholder="Phone Number" />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <FormikField
                fieldType={FormikFieldType.Select}
                type="text"
                name="role"
                placeholder="Role"
                options={access || []}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginLeft: '15px' }}>
                      <AccessibilityOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </CustomFormControl>
          </CustomFormInput>
        </FormContent>
      </UsersCardContent>
      <UsersCardFooter>
        <ButtonPrimary fullWidth variant="contained" type="submit" disabled={isSubmitting || !isValid || !dirty}>
          Simpan
        </ButtonPrimary>
        <ButtonSecondary fullWidth variant="contained" onClick={() => openModal(false)}>
          Batal
        </ButtonSecondary>
      </UsersCardFooter>
    </UsersCard>
  );
};

export default UsersForm;

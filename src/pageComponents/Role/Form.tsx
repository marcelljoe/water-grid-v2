import { Container, Grid, Button } from '@mui/material';
import React from 'react';
import TextField from '@/components/FormControlled/Formik/TextField';
import { PropsRoleForm } from './Role.types';
import CollapsibleMenuTable from './Table';
import SelectComponent from '@/components/FormControlled/Formik/Select/Select';
import { Field } from 'formik';

import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { Label } from '../Template/Form/Form.styled';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';
import { useRouter } from 'next/router';

const statusOption = [
  {
    label: 'Active',
    value: 1
  },
  {
    label: 'Inactive',
    value: 2
  }
];
const FormRole = (props: PropsRoleForm) => {
  const { isSubmitting, isValid, dirty, data, columns, values, menuUpdated } = props;

  const router = useRouter();

  const back = () => {
    router.push(`/setting/role`);
  };

  return (
    <>
      <React.Fragment>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormInput>
                <Label>Deskripsi Role</Label>
                <FormControl fullWidth variant="standard">
                  <FormikField
                    fieldType={FormikFieldType.TextField}
                    type="text"
                    name="description"
                    placeholder="Deskripsi"
                    size="small"
                  />
                </FormControl>
              </FormInput>
            </Grid>
            <Grid item xs={12} md={6}>
              <Label>Status</Label>
              <FormControl fullWidth variant="standard">
                <FormikField
                  fieldType={FormikFieldType.Select}
                  name="status"
                  // id="status"
                  placeholder="Pilih Status"
                  size="small"
                  options={statusOption || []}
                />
              </FormControl>
            </Grid>
          </Grid>
          <CollapsibleMenuTable data={data} columns={columns} values={values.menu} dataUpdate={menuUpdated} />
          <Button fullWidth variant="contained" type="submit">
            Simpan
          </Button>
          <Button fullWidth variant="contained" onClick={() => back()}>
            Batal
          </Button>
        </Container>
      </React.Fragment>
    </>
  );
};

export default FormRole;

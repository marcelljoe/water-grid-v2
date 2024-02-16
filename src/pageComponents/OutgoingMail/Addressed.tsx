import { FormControl, Grid } from '@mui/material';
import React, { memo } from 'react';
import { ContentTitle } from './Form/Form.styled';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';

interface AddressedPageProps {
  type: 'external' | 'internal';
  open: boolean;
  department: optionType[];
}

const Addressed: React.FC<AddressedPageProps> = props => {
  const { type } = props;

  if (type == 'internal') {
    return (
      <>
        <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 6}>
          <ContentTitle>Ditujukan Kepada (Bagian)</ContentTitle>
          <FormControl fullWidth variant="standard">
            <FormikField
              name={'value.toGroup'}
              fieldType={FormikFieldType.AutoComplete}
              options={props.department ?? []}
              placeholder="Pilih Bagian"
              size="small"
              multiple={true}
            />
          </FormControl>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 6}>
        <ContentTitle>Ditujukan Kepada</ContentTitle>
        <FormControl fullWidth variant="standard">
          <FormikField name={`value.addressedTo`} fieldType={FormikFieldType.TinyMce} size="small" />
        </FormControl>
      </Grid>
      <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 6}>
        <ContentTitle>E-mail</ContentTitle>
        <FormControl fullWidth variant="standard">
          <FormikField
            name={`value.addressedToEmail`}
            type="email"
            fieldType={FormikFieldType.TextField}
            size="small"
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default memo(Addressed);

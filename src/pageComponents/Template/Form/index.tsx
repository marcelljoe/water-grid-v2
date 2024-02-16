import React from 'react';
import { CreateTemplateFormProps } from './Form.types';
import { ContentTitle, FormCard, FormCardHeader, FormCardContent } from './Form.styled';
import { Grid } from '@mui/material';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';

const CreateTemplateForm = (props: CreateTemplateFormProps) => {
  const { master } = props;

  return (
    <FormCard>
      <FormCardHeader>
        <FormikField
          fieldType={FormikFieldType.TextField}
          type="text"
          name="name"
          id="name"
          placeholder="Nama Template"
          size="small"
        />
      </FormCardHeader>
      <FormCardContent>
        <ContentTitle>Kepala Surat</ContentTitle>
        <Grid container spacing={2}>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="header"
              placeholder="Template Kepala Surat"
              size="small"
              id="header"
              options={master.component?.header?.item ?? []}
            />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="opener"
              id="opener"
              placeholder="Template Pembuka Surat"
              size="small"
              options={master.component?.opener.item || []}
            />
          </Grid>
        </Grid>

        <ContentTitle>Isi Surat</ContentTitle>
        <Grid container spacing={2}>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="content"
              id="content"
              placeholder="Pilih Bentuk Isi"
              size="small"
              options={master.component?.content.item || []}
            />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="signature"
              id="signature"
              placeholder="Pilih Bentuk Tanda Tangan"
              size="small"
              options={master.component?.signature.item || []}
            />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="disposition"
              id="disposition"
              placeholder="Pilih Bentuk Disposisi"
              size="small"
              options={master.component?.disposition?.item || []}
            />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.SelectCustom}
              name="backLetter"
              id="backLetter"
              placeholder="Pilih Bentuk Belakang"
              size="small"
              options={master.component?.backLetter?.item || []}
            />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField fieldType={FormikFieldType.Switch} id="footer" name="footer" label="Footer" size="small" />
          </Grid>
          <Grid item xs={props.open ? 12 : 6}>
            <FormikField
              fieldType={FormikFieldType.Switch}
              id="perforation"
              name="perforation"
              label="Tembusan"
              size="small"
            />
          </Grid>
        </Grid>
      </FormCardContent>
    </FormCard>
  );
};

export default CreateTemplateForm;

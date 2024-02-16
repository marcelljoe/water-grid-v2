import React, { useEffect, useState } from 'react';
import { CreateTemplateFormProps, IMailTemplate } from './Form.types';
import {
  CustomFormControl as FormControl,
  CustomFormInput as FormInput
} from '@/components/FormControlled/Form.styled';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField as UploadField
} from '@mui/material';
import { http } from '@/utils/httpClient';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';
import { ContentTitle, FormCard, FormCardContent } from './Form.styled';
import Addressed from '../Addressed';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';

const attachmentOption = [
  { label: '-', value: [] },
  { label: '1 (Satu) Berkas', value: [1] },
  { label: '2 (Dua) Berkas', value: [1, 2] }
];

const CreateTemplateForm = (props: CreateTemplateFormProps) => {
  const { formik, docNo } = props;
  const [mailTemplate, setMailTemplate] = useState<IMailTemplate>();

  useEffect(() => {
    const abortController = new AbortController();
    async function getMailTemplate() {
      const mailTemplate = await http.get(`/api/mail/mail_template_byId?mailId=${formik.values.mailTypeId?.value}`, {
        signal: abortController.signal
      });

      if (mailTemplate.data) {
        setMailTemplate(mailTemplate?.data);

        formik.setFieldValue('value', formik.initialValues.value);
        if (docNo) {
          formik.setFieldValue('value.docNo', props.docNo.replace('mailType', mailTemplate?.data.mailCode));
        }
        formik.setFieldValue('header', {
          code: mailTemplate?.data.component.header.name,
          value: { Judul: formik.values.mailTypeId?.label }
        });
        formik.setFieldValue('opener', { code: mailTemplate?.data.component.opener.name });
        formik.setFieldValue('content', { code: mailTemplate?.data.component.content.name });
        formik.setFieldValue('signature', { code: mailTemplate?.data.component.signature.name });
        formik.setFieldValue('disposition', { code: mailTemplate?.data.component.disposition.name });
        formik.setFieldValue('backLetter', { code: mailTemplate?.data.component.backLetter.name });
        formik.setFieldValue('footer', { code: mailTemplate?.data.component.footer.name });
        formik.setFieldValue('perforation', { code: mailTemplate?.data.component.perforation.name });
      }
    }
    if (formik.values.mailTypeId) {
      getMailTemplate();
    }

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.mailTypeId]);

  useEffect(() => {
    formik.setFieldValue('value.subject', formik.values?.opener?.value['Perihal']);
  }, [formik.values?.opener?.value?.['Perihal']]);

  const selectedValuesperforation = React.useMemo(
    () => props.master?.department?.filter(v => !formik.values.value?.toGroup?.includes(v)),
    [formik.values?.value?.toGroup]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files);
      formik.setFieldValue('value.files', [...formik.values.value?.files, ...validFiles]);
    }
  };

  return (
    <FormCard className={'custom-form'}>
      <FormCardContent className="content">
        <Grid container item rowSpacing={2} spacing={2} sx={{ paddingBottom: 3 }}>
          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 12}>
            <ContentTitle>Pilih Template Surat</ContentTitle>
            <FormControl fullWidth variant="standard">
              <FormikField
                id="mailTypeId"
                name="mailTypeId"
                fieldType={FormikFieldType.AutoComplete}
                options={props.master.template ?? []}
                placeholder="Pilih Template Surat"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 6}>
            <ContentTitle>Perihal Surat</ContentTitle>

            <FormControl fullWidth variant="standard">
              <FormikField id="subject" name={`value.subject`} fieldType={FormikFieldType.TextField} size="small" />
            </FormControl>
          </Grid>
          <Addressed
            type={formik.values.type == '1' ? 'internal' : 'external'}
            open={props.open}
            department={props.master.department}
          />
          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 12}>
            <ContentTitle>Paraf</ContentTitle>

            <FormControl fullWidth variant="standard">
              <FormikField
                name={'value.paraf'}
                fieldType={FormikFieldType.AutoComplete}
                placeholder="Pilih Tujuan"
                size="small"
                multiple={true}
                optiontype={'approver'}
                mailtype={formik.values.type}
                mailtypeid={formik.values.mailTypeId?.value}
              />
            </FormControl>
          </Grid>
          {formik.values.value.paraf != null && formik.values.value.paraf?.length > 0 && (
            <>
              <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 12}>
                <ContentTitle>List Paraf</ContentTitle>
                <TableContainer
                  component={Box}
                  sx={{ background: '#f8f9fd', padding: '10px', borderRadius: '10px', border: '1px solid #eff1f4' }}
                >
                  <Table className="table-p">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Box component="span">NIP</Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box component="span">Nama</Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box component="span">Posisi</Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box component="span">Departemen</Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formik.values.value?.paraf?.map((item: any, idx: number) => (
                        <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{item.NIP}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.position}</TableCell>
                          <TableCell align="center">{item.department}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}

          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
            <ContentTitle>Nomor Surat</ContentTitle>

            <FormControl fullWidth variant="standard">
              <FormikField
                name={`value.docNo`}
                fieldType={FormikFieldType.TextField}
                size="small"
                // disabled={props.mailType == '1' ? true : false}
              />
            </FormControl>
          </Grid>

          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
            <ContentTitle>Tempat</ContentTitle>

            <FormControl fullWidth variant="standard">
              <FormikField name={`value.diTempat`} fieldType={FormikFieldType.TextField} size="small" />
            </FormControl>
          </Grid>

          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
            <ContentTitle>Tanggal Surat</ContentTitle>
            <FormControl fullWidth variant="standard">
              <FormikField
                name={`value.letterDate`}
                fieldType={FormikFieldType.TextField}
                placeholder="Tanggal"
                size="small"
                type="date"
              />
            </FormControl>
          </Grid>

          <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
            <ContentTitle>Agenda</ContentTitle>
            <FormControl fullWidth variant="standard">
              <FormikField
                id="agenda"
                label="Agenda"
                size="small"
                name={`value.agenda`}
                fieldType={FormikFieldType.Switch}
              />
            </FormControl>
          </Grid>

          {formik.values.value?.agenda && (
            <>
              <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
                <ContentTitle>Tanggal Mulai</ContentTitle>
                <FormControl fullWidth variant="standard">
                  <FormikField
                    name={`value.agendaStartDate`}
                    fieldType={FormikFieldType.TextField}
                    placeholder="Tanggal Mulai"
                    size="small"
                    type="date"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={props.open ? 12 : 12} md={props.open ? 12 : 4}>
                <ContentTitle>Tanggal Selesai</ContentTitle>
                <FormControl fullWidth variant="standard">
                  <FormikField
                    name={`value.agendaEndDate`}
                    fieldType={FormikFieldType.TextField}
                    placeholder="Tanggal Selesai"
                    size="small"
                    type="date"
                  />
                </FormControl>
              </Grid>
            </>
          )}

          {mailTemplate?.component.header.name && (
            <>
              {mailTemplate.component.header.item.map(item => (
                <Grid item xs={props.open ? 12 : 12} key={'header' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>

                  <FormControl fullWidth variant="standard">
                    <FormikField
                      fieldType={FormikFieldType[item.component]}
                      name={`header.value.[${item.description}]`}
                      size="small"
                      placeholder={item.description}
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}

          {mailTemplate?.component.opener.name && (
            <>
              {mailTemplate?.component.opener.item.map(item => (
                <Grid item xs={props.open ? 12 : 4} key={'opener' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  <FormControl fullWidth variant="standard">
                    <FormikField
                      fieldType={FormikFieldType[item.component]}
                      type={item.field_type}
                      name={`opener.value[${item.description}]`}
                      size="small"
                      placeholder={item.description}
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}

          {mailTemplate?.component.content.name && (
            <>
              {mailTemplate?.component.content.item.map(item => (
                <Grid item xs={props.open ? 12 : 12} key={'content' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  <FormikField
                    fieldType={FormikFieldType[item.component]}
                    id={`${item.description}`}
                    name={`content.value[${item.description}]`}
                    size="small"
                  />
                </Grid>
              ))}
            </>
          )}

          {mailTemplate?.component.signature.name && (
            <>
              {mailTemplate?.component.signature.item.map(item => (
                <Grid item xs={props.open ? 12 : 6} key={'signature' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  <FormControl fullWidth variant="standard">
                    <FormikField
                      fieldType={FormikFieldType[item.component]}
                      type={item.field_type}
                      name={`signature.value[${item.description}]`}
                      size="small"
                      optiontype={item.field_type}
                      mailtype={formik.values.type}
                      mailtypeid={formik.values.mailTypeId?.value}
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}
          {mailTemplate?.component.disposition.name && (
            <>
              {mailTemplate?.component.disposition.item.map(item => (
                <Grid item xs={props.open ? 12 : 6} key={'disposition' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  <FormikField
                    fieldType={FormikFieldType[item.component]}
                    type={item.field_type}
                    name={`disposition.value[${item.description}]`}
                    size="small"
                    optiontype={item.field_type}
                    mailtype={formik.values.type}
                    mailtypeid={formik.values.mailTypeId?.value}
                  />
                </Grid>
              ))}
            </>
          )}
          {mailTemplate?.component.backLetter.name && (
            <>
              {mailTemplate?.component.backLetter.item.map(item => (
                <Grid item xs={props.open ? 12 : 6} key={'backLetter' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  {/* <FormControl fullWidth variant="standard">
                  <Field
                    component={FormikField}
                    fieldType={FormikFieldType[item.field_type]}
                    name={item.description}
                    // placeholder="Pilih Template"
                    size="small"
                    // options={props.mailType}
                    // value={values.mailTypeId}
                  />
                </FormControl> */}
                </Grid>
              ))}
            </>
          )}
          {mailTemplate?.component.perforation.name && (
            <>
              {mailTemplate?.component.perforation.item.map(item => (
                <Grid item xs={props.open ? 12 : 6} key={'perforation' + item.description}>
                  <ContentTitle>{item.description}</ContentTitle>
                  <FormControl fullWidth variant="standard">
                    <FormikField
                      fieldType={FormikFieldType[item.component]}
                      type={item.field_type}
                      name={`perforation.value[${item.description}]`}
                      size="small"
                      options={selectedValuesperforation}
                      perforationtype={props.mailType}
                      multiple={true}
                      mailtypeid={formik.values.mailTypeId?.value}
                    />
                  </FormControl>
                </Grid>
              ))}
            </>
          )}
          <Grid item xs={props.open ? 12 : 6}>
            <ContentTitle>Lampiran</ContentTitle>

            <FormControl fullWidth variant="standard">
              <FormikField
                name={'value.attachmentLength'}
                fieldType={FormikFieldType.AutoComplete}
                placeholder="Pilih Lampiran"
                size="small"
                options={attachmentOption}
              />
            </FormControl>
          </Grid>
          {formik.values.value?.attachmentLength?.value.map((item: optionType, i: number) => (
            <Grid key={'lampiran' + i} item xs={props.open ? 12 : 6}>
              <ContentTitle>Upload Berkas {i + 1}</ContentTitle>

              <FormControl fullWidth variant="standard">
                <FormInput>
                  <FormControl fullWidth>
                    <UploadField
                      id="files"
                      name="files"
                      type="file"
                      onChange={handleFileChange}
                      inputProps={{
                        accept: 'image/*, application/pdf',
                        sx: {
                          fontSize: '0.75rem',
                          fontFamily: 'inherit',
                          fontWeight: '500',
                          padding: '0.8rem',
                          color: '#536580',
                          '&::placeholder': {
                            color: '#536580'
                          },

                          '&[type=number]': {
                            MozAppearance: 'textfield'
                          },

                          '&::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                          },
                          '&::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                          },
                          '&::-webkit-datetime-edit': {
                            marginTop: '-5px'
                          },
                          '&[type=file]': {
                            marginTop: '-5px',
                            padding: '1rem 0.8rem'
                          },
                          '&::file-selector-button': {
                            marginTop: '2px'
                          }
                        }
                      }}
                      InputProps={{
                        sx: {
                          background: '#F8F9FD',
                          borderRadius: '0.75rem',
                          '&.MuiOutlinedInput-root': {
                            paddingRight: '0',
                            '& fieldset': {
                              border: '1px solid #EFF1F4'
                            },
                            '&:hover fieldset': {
                              border: '1px solid #536580'
                            },
                            '&.Mui-focused fieldset': {
                              border: '1px solid #01C3FF'
                            }
                          }
                        }
                      }}
                    />
                  </FormControl>
                </FormInput>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </FormCardContent>
      <div className="header"></div>
    </FormCard>
  );
};

export default CreateTemplateForm;

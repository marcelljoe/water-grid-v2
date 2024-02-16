import React from 'react';
import { Grid } from '@mui/material';
import { ViewTemplateProps } from './ViewTemplate.types';
import { MailContainer, MailContainer2 } from './ViewTemplate.styled';
import Footer from '@/components/Mail/Footer';
import Header from '@/components/Mail/Header';
import Greetings from '@/components/Mail/Greetings';
import Content from '@/components/Mail/Content';
import Signature from '@/components/Mail/Signature';
import Disposition from '@/components/Mail/Disposition';
import Perforation from '@/components/Mail/Perforation';
import BackLetter from '@/components/Mail/BackLetter';
import { HeaderEnum } from '@/components/Mail/Header/Header.types';
import { GreetingsEnum } from '@/components/Mail/Greetings/Greetings.types';
import { ContentEnum } from '@/components/Mail/Content/Content.types';
import { SignatureEnum } from '@/components/Mail/Signature/Signature.types';
import { PerforationEnum } from '@/components/Mail/Perforation/Perforation.types';
import { FooterEnum } from '@/components/Mail/Footer/Footer.types';
import { BackLetterEnum } from '@/components/Mail/BackLetter/BackLetter.types';
import { DispositionEnum } from '@/components/Mail/Disposition/Disposition.types';

const ViewTemplate = (props: ViewTemplateProps) => {
  const { values, mailSignature, mailDisposition, formik } = props;

  return (
    <>
      {values?.backLetter?.code ? (
        <MailContainer2 className="">
          <Grid container gap={'2rem'} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <BackLetter code={values?.backLetter?.code as BackLetterEnum} />
            </Grid>
          </Grid>
        </MailContainer2>
      ) : (
        <MailContainer className="responsive-surat">
          <Grid container gap={'2rem'} sx={{ width: '100%' }}>
            {/* Header */}
            <Grid item xs={12}>
              <Header
                code={(values?.header?.code as HeaderEnum) || ''}
                values={{ ...values?.value, ...values?.header?.value }}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container gap={'1rem'} style={{ marginBottom: '175px' }}>
                {/* Opening Text */}
                <Grid item xs={12} style={{ marginRight: '100px', textAlign: 'left' }}>
                  <Greetings
                    formik={formik}
                    code={(values?.opener?.code as GreetingsEnum) || ''}
                    values={{
                      ...values?.value,
                      ...values?.opener?.value,
                      Judul: values.header?.value?.Judul,
                      type: values.type
                    }}
                  />
                </Grid>
                {/* Content */}
                <Grid item xs={12} style={{ minHeight: '0px' }}>
                  <Content
                    code={(values?.content?.code as ContentEnum) || ''}
                    values={{ ...values?.value, ...values?.content?.value }}
                  />
                </Grid>
                {/* Closing Text */}
                <Grid item xs={12} style={{ bottom: '0px', left: 0, right: 0 }}>
                  <Signature
                    code={(values?.signature?.code as SignatureEnum) || ''}
                    values={{ ...values?.value, ...values?.signature?.value, type: values.type }}
                    mailSignature={mailSignature}
                  />
                </Grid>
                {/* Approval */}
                <Disposition
                  code={(values?.disposition?.code as DispositionEnum) || ''}
                  values={{ ...values?.value, ...values?.disposition?.value, type: values.type }}
                  mailDisposition={mailDisposition}
                />
              </Grid>
            </Grid>
            {/* Footer */}
            <Grid item xs={12} sx={{ alignSelf: 'flex-end' }}>
              <Perforation
                code={(values?.perforation?.code as PerforationEnum) || ''}
                values={{ ...values?.value, ...values?.perforation?.value }}
              />
              <Footer
                code={(values?.footer?.code as FooterEnum) || ''}
                values={{ ...values?.value, ...values?.footer?.value }}
              />
            </Grid>
          </Grid>
        </MailContainer>
      )}
    </>
  );
};

export default ViewTemplate;

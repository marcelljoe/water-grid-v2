import { CustomFormControl, CustomFormInput } from '@/components/FormControlled/Form.styled';
import { Field } from 'formik';
import { FormContent, MenuCardFooter } from './Menu.styled';
import TextField from '@/components/FormControlled/Formik/TextField';
import { Card, CardContent, CardHeader, FormControl, Grid, MenuItem } from '@mui/material';
import { ButtonPrimary, ButtonSecondary } from '@/components/Button/Button.styled';
import { PropsMenuForm } from './Menu.types';

const MenuForm = (props: PropsMenuForm) => {
  const { isSubmitting, isValid, dirty, values } = props;
  const selectStatus: any = [
    {
      value: 0,
      label: 'Inactive'
    },
    {
      value: 1,
      label: 'Active'
    }
  ];

  return (
    <Card>
      <CardHeader title={values?.id ? 'Update Menu' : 'Add Menu'} />

      <CardContent>
        <FormContent>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field component={TextField} type="text" name="menu" placeholder="Menu" />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field component={TextField} type="text" name="path" placeholder="Path" />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field component={TextField} type="number" name="sort" placeholder="Sort" />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput sx={{ heigt: '150px' }}>
            <FormControl fullWidth variant="standard">
              {/* <Box> */}
              <Field component={TextField} type="text" name="status" placeholder="Sort" select>
                {selectStatus.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
              {/* </Box> */}
            </FormControl>
          </CustomFormInput>
        </FormContent>
      </CardContent>
      <MenuCardFooter>
        <Grid
          container
          spacing={2}
          style={{ marginTop: '-25px', marginBottom: '25px', justifyContent: 'center', display: 'flex' }}
        >
          <Grid item xs={6} md={4}>
            <ButtonPrimary
              className="custom-button-left"
              color="success"
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Simpan
            </ButtonPrimary>
          </Grid>
          <Grid item xs={6} md={4}>
            <ButtonSecondary
              className="custom-button-right"
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Batal
            </ButtonSecondary>
          </Grid>
        </Grid>
      </MenuCardFooter>
    </Card>
  );
};

export default MenuForm;

import React from 'react';
import styles from './Perforation.module.css';
import { Grid, Typography } from '@mui/material';
import { PerforationComponentProps, PerforationEnum } from './Perforation.types';
import { Item } from './Perforation.styled';
import { Container } from './Perforation.styled';

const Perforation = (props: PerforationComponentProps) => {
  const dataTembusan = props.values?.Tembusan ? props.values.Tembusan : [];

  return (
    <>
      <Container style={{ marginLeft: '1.5cm' }}>
        {dataTembusan.length > 0 && (
          <footer>
            <Grid container style={{ position: 'absolute', bottom: '110px', marginTop: '30px' }}>
              <Grid item xs={10}>
                <Grid container className={styles.font} style={{ bottom: '60px' }}>
                  <Typography className={styles.tembusan}>Tembusan, </Typography>
                  <Typography className={styles.tembusan}> disampaikan kepada Yth :</Typography>
                </Grid>
                {dataTembusan.map((item, i) => (
                  <Item style={{ margin: '-4px', padding: '1px' }} key={item.label + i}>
                    {`${i + 1}. ${item?.headPosition || ''} ${item.label}`}
                  </Item>
                ))}
              </Grid>
            </Grid>
          </footer>
        )}
      </Container>
    </>
  );
};

const Default = () => {
  return <></>;
};

const PERFORATION: Record<PerforationEnum, (props: PerforationComponentProps) => React.ReactNode> = {
  [PerforationEnum.Perforation]: props => <Perforation {...props} />,
  [PerforationEnum.Default]: props => <Default />
};

const FooterComponents: React.FC<PerforationComponentProps> = props => {
  const selectedEnumValue: PerforationEnum = props.code ? PerforationEnum[props.code] : PerforationEnum.Default;

  const selectedComponent = PERFORATION[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default FooterComponents;

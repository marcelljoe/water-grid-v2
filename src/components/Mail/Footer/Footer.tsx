import React from 'react';
import { FooterComponentProps, FooterEnum } from './Footer.types';
import { Container } from './Footer.styled';
import styles from './Footer.module.css';

const Footer = (props: FooterComponentProps) => {
  return (
    <footer>
      <Container
        className={styles.text}
        style={{ lineHeight: '1.1', position: 'absolute', bottom: '45px', left: 0, right: 0 }}
      >
        <div className={styles.title}>perumda tirta benteng kota tangerang</div>
        <div>Jl. Komplek PU Prosida Bendungan Ps Baru, Kel. Mekarsari, Kec. Neglasari - Kota Tangerang</div>
        <div>Telp. (021) 5587234, 5538865 Fax. (021) 55799287</div>
      </Container>
    </footer>
  );
};

const Default = () => {
  return <></>;
};

const FOOTER: Record<FooterEnum, (props: FooterComponentProps) => React.ReactNode> = {
  [FooterEnum.Footer]: props => <Footer {...props} />,
  [FooterEnum.Default]: props => <Default />
};

const FooterComponents: React.FC<FooterComponentProps> = props => {
  const selectedEnumValue: FooterEnum = props.code ? FooterEnum[props.code] : FooterEnum.Default;

  const selectedComponent = FOOTER[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default FooterComponents;

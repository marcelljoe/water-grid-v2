// import modules
import React from 'react';

// import components
import ContentComponent from '../Content';

// define layout props
interface PropsLayout {
  children: React.ReactElement;
}

// define layout component
const LayoutComponent = (props: PropsLayout) => {
  const { children } = props;
  return <ContentComponent>{children}</ContentComponent>;
};

export default LayoutComponent;

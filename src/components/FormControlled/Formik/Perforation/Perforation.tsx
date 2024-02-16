import React, { FC, useEffect, useState } from 'react';
import { PerforationProps } from './Perforation.types';
import AutoComplete from '../AutoComplete';
import AutoCompleteCreateable from '../AutoCompleteCreateable';

const PerforationComponent: FC<PerforationProps> = ({ ...props }) => {
  const { perforationtype } = props;

  if (perforationtype == '1') return <AutoComplete {...props} />;
  if (perforationtype == '2') return <AutoCompleteCreateable {...props} />;
};

export default React.memo(PerforationComponent);

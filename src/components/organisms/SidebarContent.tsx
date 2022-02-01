import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import { InputForm } from '../molecules/InputForm';
import { SugList } from '../molecules/SugList';

export function SidebarContent() {
  const [sugDateIdxs, setSugDateIdxs] = useState([] as number[]);

  return (
    <>
      <InputForm setSugDateIdxs={setSugDateIdxs} />
      <Divider variant="middle" />
      <SugList sugDateIdxs={sugDateIdxs} />
    </>
  );
}

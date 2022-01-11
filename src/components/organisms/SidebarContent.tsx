import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import { ScheduleList } from '../../calcSchedule';
import { InputForm } from '../molecules/InputForm';
import { SugList } from '../molecules/SugList';

export function SidebarContent() {
  const [sugs, setSugs] = useState([] as ScheduleList[]);

  return (
    <>
      <InputForm setSugs={setSugs} />
      <Divider variant="middle" />
      <SugList sugs={sugs} />
    </>
  );
}

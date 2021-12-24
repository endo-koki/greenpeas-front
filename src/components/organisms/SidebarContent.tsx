import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import { ScheduleList } from '../../features/sideBar/calcSchedule';
import { InputForm } from '../molecules/InputForm';
import { SugList } from '../molecules/SugList';

export function SidebarContent() {
  const [sugs, setSugs] = useState([] as ScheduleList[]);
  const [computed, setComputed] = useState(false);

  return (
    <>
      <InputForm setSugs={setSugs} setComputed={setComputed} />
      <Divider variant="middle" />
      <SugList sugs={sugs} computed={computed} />
    </>
  );
}

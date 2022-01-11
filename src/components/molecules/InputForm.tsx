import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { findOptScheduleWithPref, ScheduleList } from '../../calcSchedule';
import {
  selectDateArr,
  selectMemMat,
  setCalcState,
} from '../../features/allDateSlice';
import { ContainedBtn } from '../atom/ContainedBtn';
import { NumberSelector } from '../atom/NumberSelector';

export function InputForm(props: {
  setSugs: React.Dispatch<React.SetStateAction<ScheduleList[]>>;
}) {
  const [maxDateNum, setMaxDateNum] = useState(3);
  const [minAttendNum, setminAttendNum] = useState(2);

  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setCalcState('pending'));

    const includeIdxs: number[] = [];
    const excludeIdxs: number[] = [];
    dateArr.forEach((val, idx) => {
      if (val === 0) {
        includeIdxs.push(idx);
      } else if (val === 1) {
        excludeIdxs.push(idx);
      }
    });

    const sugs = findOptScheduleWithPref(
      memMat,
      maxDateNum,
      minAttendNum,
      3,
      includeIdxs,
      excludeIdxs
    );
    props.setSugs(sugs);
    dispatch(setCalcState('computed'));
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ paddingY: '16px' }}
    >
      <Grid item>
        <NumberSelector
          text="練習日数"
          value={maxDateNum}
          setValue={setMaxDateNum}
        />
      </Grid>
      <Grid item>
        <NumberSelector
          text="最低参加回数"
          value={minAttendNum}
          setValue={setminAttendNum}
        />
      </Grid>
      <Grid item sx={{ marginTop: '8px' }}>
        <ContainedBtn text="計算する！" onClick={handleClick} />
      </Grid>
    </Grid>
  );
}

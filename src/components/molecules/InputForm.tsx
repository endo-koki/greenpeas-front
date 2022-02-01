import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { findOptScheduleWithPrefPy } from '../../calcSchedule';
import {
  selectCalcState,
  selectDateArr,
  selectMemMat,
  setCalcState,
} from '../../features/allDateSlice';
import { NumberSelector } from '../atom/NumberSelector';

export function InputForm(props: {
  setSugDateIdxs: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [maxDateNum, setMaxDateNum] = useState(3);
  const [minAttendNum, setminAttendNum] = useState(2);

  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);
  const calcState = useAppSelector(selectCalcState);

  const dispatch = useAppDispatch();

  async function handleClick() {
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

    const res = await findOptScheduleWithPrefPy(
      memMat,
      maxDateNum,
      minAttendNum,
      3,
      includeIdxs,
      excludeIdxs
    );
    props.setSugDateIdxs(res.dateIdxs);
    dispatch(setCalcState(res.status));
  }

  const disabled = calcState === 'init' || calcState === 'pending';

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
        <Button
          variant="contained"
          disabled={disabled}
          onClick={handleClick}
          sx={{ borderRadius: '20px' }}
        >
          計算する！
        </Button>
      </Grid>
    </Grid>
  );
}

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectDateArr } from '../../features/allDateSlice';
import { AllDateTable } from './AllDateTable';
import { DetailTable } from './DetailTable';
import { SummaryTable } from './SummaryTable';

const classes = {
  closed: css({
    width: '100vw',
    backgroundColor: green[50],
    transition: 'width 150ms 0s ease',
    padding: '16px',
  }),
  opened: css({
    width: '80vw',
    backgroundColor: green[50],
    transition: 'width 150ms 0s ease',
    padding: '16px',
  }),
};

export function Main(props: { open: boolean }) {
  const dateArr = useAppSelector(selectDateArr);
  const selectedDateNum = dateArr.filter(
    (val) => val === -1 || val === 0
  ).length;

  return (
    <>
      <div css={props.open ? classes.opened : classes.closed}>
        <Typography variant="h6" component="h2">
          日程リスト
        </Typography>
        <AllDateTable />
        <Typography variant="h6" component="h2" sx={{ marginTop: '16px' }}>
          各メンバーの参加数
        </Typography>
        <SummaryTable />
        <Typography variant="h6" component="h2" sx={{ marginTop: '16px' }}>
          選んだ日程…{selectedDateNum}個
        </Typography>
        <DetailTable />
      </div>
    </>
  );
}

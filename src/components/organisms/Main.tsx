/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AllDateTable } from './AllDateTable';
import { DetailTable } from './DetailTable';
import { SummaryTable } from './SummaryTable';

const classes = {
  closed: css({
    width: '100vw',
    backgroundColor: green[50],
    transition: 'width 150ms 0s ease',
    padding: '8px',
  }),
  opened: css({
    width: '75vw',
    backgroundColor: green[50],
    transition: 'width 150ms 0s ease',
    padding: '8px',
  }),
};

export function Main(props: { open: boolean }) {
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
          選んだ日程
        </Typography>
        <DetailTable />
      </div>
      {/* <AllDateTable2 /> */}
      {/* <AllDateTable3 /> */}
    </>
  );
}

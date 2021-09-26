/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AllDateTable } from './AllDateTable';

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
      </div>
      {/* <AllDateTable2 /> */}
      {/* <AllDateTable3 /> */}
    </>
  );
}

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAllDateList,
  selectMemMat,
} from '../../features/allDateList/allDateSlice';
import { uuKey } from '../../utils';

const classes = {
  table: css({
    display: 'flex',
  }),
  thRow: css({
    width: '40px',
  }),
  col: css({
    display: 'flex',
    flexDirection: 'column',
  }),
};

type Marker = '○' | '△' | '×';
const markers: Marker[] = ['○', '△', '×'];

function AllDateHead() {
  const items = ['日程'].concat(markers).map((item) => (
    <TableCell key={uuKey()} align="center">
      {item}
    </TableCell>
  ));

  return (
    <TableHead>
      <TableRow css={classes.col} sx={{ width: '80px' }}>
        {items}
      </TableRow>
    </TableHead>
  );
}

function DateCol(props: { date: string; markersCnt: number[] }) {
  const items = props.markersCnt.map((item) => (
    <TableCell key={uuKey()}>{item}</TableCell>
  ));

  return (
    <TableRow css={classes.col}>
      <TableCell>{props.date}</TableCell>
      {items}
    </TableRow>
  );
}

function AllDateBody() {
  const memMat = useAppSelector(selectMemMat);
  const allDateList = useAppSelector(selectAllDateList);

  const rowItems = memMat.map((memVec, idx) => {
    const markersCnt = markers.map(
      (marker) => memVec.filter((m) => m === marker).length
    );
    const date = allDateList[idx];
    return <DateCol key={uuKey()} date={date} markersCnt={markersCnt} />;
  });

  return <TableBody css={classes.table}>{rowItems}</TableBody>;
}

export function AllDateTable2() {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#c0c0c0' }}>
      <Table aria-label="all date table" css={classes.table}>
        <AllDateHead />
        <AllDateBody />
      </Table>
    </TableContainer>
  );
}

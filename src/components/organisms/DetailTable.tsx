/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAllDateList,
  selectDateArr,
  selectMemList,
  selectMemMat,
} from '../../features/allDateSlice';
import { uuKey } from '../../utils';
import { Marker, marker2Icon, markers } from '../atom/marker';

const classes = {
  table: css({
    borderCollapse: 'separate',
    '& th, & td': {
      padding: '5px',
      borderLeft: '1px solid #dfdfdf',
    },
  }),
  th: css({
    minWidth: '60px',
    fontSize: 'small',
    fontWeight: 'bold',
  }),
  thCol0: css({
    backgroundColor: 'white',
    position: 'sticky',
    minWidth: '60px',
    left: '0px',
    fontSize: '12px',
  }),
  thCol1: css({
    backgroundColor: 'white',
    position: 'sticky',
    minWidth: '35px',
    left: '71px',
  }),
  thCol2: css({
    backgroundColor: 'white',
    position: 'sticky',
    minWidth: '35px',
    left: '117px',
  }),
  thCol3: css({
    backgroundColor: 'white',
    position: 'sticky',
    minWidth: '35px',
    left: '163px',
    borderRight: '1px solid #dfdfdf',
  }),
};

function DetailHead() {
  const memList = useAppSelector(selectMemList);
  const cells = memList.map((mem) => (
    <TableCell key={uuKey()} align="center" css={classes.th}>
      {mem}
    </TableCell>
  ));

  return (
    <TableHead>
      <TableRow>
        <TableCell css={classes.thCol0} />
        <TableCell align="center" css={classes.thCol1}>
          {marker2Icon('○')}
        </TableCell>
        <TableCell align="center" css={classes.thCol2}>
          {marker2Icon('△')}
        </TableCell>
        <TableCell align="center" css={classes.thCol3}>
          {marker2Icon('×')}
        </TableCell>
        {cells}
      </TableRow>
    </TableHead>
  );
}

function DetailRow(props: { date: string; memVec: string[]; isLast: boolean }) {
  const styles = [classes.thCol1, classes.thCol2, classes.thCol3];
  const markerCells = markers.map((marker, idx) => (
    <TableCell key={uuKey()} align="center" css={styles[idx]}>
      {props.memVec.filter((item) => item === marker).length}
    </TableCell>
  ));
  const memCells = props.memVec.map((marker) => (
    <TableCell key={uuKey()} align="center">
      {marker2Icon(marker as Marker)}
    </TableCell>
  ));

  return (
    <TableRow>
      <TableCell
        css={classes.thCol0}
        align="center"
        sx={{ borderRadius: props.isLast ? '0 0 0 10px' : '0' }}
      >
        {props.date}
      </TableCell>
      {markerCells}
      {memCells}
    </TableRow>
  );
}

function DetailBody() {
  const memMat = useAppSelector(selectMemMat);
  const allDateList = useAppSelector(selectAllDateList);
  const dateArr = useAppSelector(selectDateArr);

  const isSelected = (val: any, idx: number) => {
    const state = dateArr[idx];
    return state === -1 || state === 0;
  };
  const selectedDates = allDateList.filter(isSelected);
  const selectedVecs = memMat.filter(isSelected);

  const rowItems = selectedDates.map((date, idx, arr) => (
    <DetailRow
      key={uuKey()}
      date={date}
      memVec={selectedVecs[idx]}
      isLast={idx === arr.length - 1}
    />
  ));

  return <TableBody>{rowItems}</TableBody>;
}

export function DetailTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '10px', width: 'calc(100% - 32px)' }}
    >
      <Table aria-label="detail table" css={classes.table}>
        <DetailHead />
        <DetailBody />
      </Table>
    </TableContainer>
  );
}

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
import { uuKey } from '../../utils';
import {
  selectAllDateList,
  selectMemMat,
} from '../../features/allDateList/allDateSlice';
import { useAppSelector } from '../../app/hooks';
import { DateCell } from '../atom/DateCell';
import { Marker, marker2Icon, markers } from '../atom/marker';

const classes = {
  table: css({
    borderCollapse: 'separate',
    '& th, & td': {
      padding: '5px',
      borderLeft: '1px solid #dfdfdf',
    },
    '& th': {
      minWidth: '60px',
      fontSize: 'small',
      fontWeight: 'bold',
    },
  }),
  thCol: css({
    backgroundColor: 'white',
    minWidth: '50px',
    position: 'sticky',
    left: '0px',
    borderRight: '1px solid #dfdfdf',
  }),
};

function AllDateHead() {
  const allDateList = useAppSelector(selectAllDateList);
  const tableCells = allDateList.map((date, idx) => (
    <DateCell key={uuKey()} content={date} idx={idx} />
  ));

  return (
    <TableHead>
      <TableRow>
        <TableCell
          css={classes.thCol}
          align="center"
          sx={{ borderRadius: '10px 0 0 0' }}
        >
          日程
        </TableCell>
        {tableCells}
      </TableRow>
    </TableHead>
  );
}

function AllDateRow(props: { marker: Marker }) {
  const memMat = useAppSelector(selectMemMat);
  const items = memMat.map((memVec, idx) => {
    const memCount = memVec.filter((m) => m === props.marker).length;
    return <DateCell key={uuKey()} content={memCount} idx={idx} />;
  });

  return (
    <TableRow>
      <TableCell
        css={classes.thCol}
        align="center"
        sx={{ borderRadius: props.marker === '×' ? '0 0 0 10px' : '0' }}
      >
        {marker2Icon(props.marker)}
      </TableCell>
      {items}
    </TableRow>
  );
}

function AllDateBody() {
  const rows = markers.map((marker) => (
    <AllDateRow key={uuKey()} marker={marker} />
  ));
  return <TableBody>{rows}</TableBody>;
}

export function AllDateTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '10px',
        width: 'calc(100% - 16px)',
        overflowX: 'scroll',
      }}
    >
      <Table aria-label="all date table" css={classes.table}>
        <AllDateHead />
        <AllDateBody />
      </Table>
    </TableContainer>
  );
}

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
  selectDateArr,
  selectMemList,
  selectMemMat,
} from '../../features/allDateList/allDateSlice';
import { uuKey } from '../../utils';
import { Marker, marker2Icon } from '../atom/marker';

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
  thCol: css({
    backgroundColor: 'white',
    minWidth: '40px',
    position: 'sticky',
    left: '0px',
    borderRight: '1px solid #dfdfdf',
  }),
};

function SummaryHead() {
  const memList = useAppSelector(selectMemList);
  const cells = memList.map((mem) => (
    <TableCell key={uuKey()} align="center" css={classes.th}>
      {mem}
    </TableCell>
  ));

  return (
    <TableHead>
      <TableRow>
        <TableCell css={classes.thCol} />
        {cells}
      </TableRow>
    </TableHead>
  );
}

function SummaryRow(props: { marker: Marker; vec: number[] }) {
  const cells = props.vec.map((item) => (
    <TableCell key={uuKey()} align="center">
      {item}
    </TableCell>
  ));

  return (
    <TableRow>
      <TableCell
        css={classes.thCol}
        align="center"
        sx={{ borderRadius: props.marker === '×' ? '0 0 0 10px' : '0' }}
      >
        {marker2Icon(props.marker)}
      </TableCell>
      {cells}
    </TableRow>
  );
}

function SummaryBody() {
  const memMat = useAppSelector(selectMemMat);
  const dateArr = useAppSelector(selectDateArr);

  const memNum = memMat.length === 0 ? 0 : memMat[0].length;
  const okVec: number[] = new Array(memNum).fill(0);
  const qVec: number[] = new Array(memNum).fill(0);
  const ngVec: number[] = new Array(memNum).fill(0);
  for (let i = 0; i < memMat.length; i++) {
    if (dateArr[i] === -1 || dateArr[i] === 0) {
      // suggested or included
      const memVec = memMat[i];
      memVec.forEach((val, idx) => {
        if (val === '○') {
          okVec[idx] += 1;
        } else if (val === '△') {
          qVec[idx] += 1;
        } else if (val === '×') {
          ngVec[idx] += 1;
        }
      });
    }
  }

  return (
    <TableBody>
      <SummaryRow marker="○" vec={okVec} />
      <SummaryRow marker="△" vec={qVec} />
      <SummaryRow marker="×" vec={ngVec} />
    </TableBody>
  );
}

export function SummaryTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '10px', width: 'calc(100% - 16px)' }}
    >
      <Table aria-label="summary table" css={classes.table}>
        <SummaryHead />
        <SummaryBody />
      </Table>
    </TableContainer>
  );
}

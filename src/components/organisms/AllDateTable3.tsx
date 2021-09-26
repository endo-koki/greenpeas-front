/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectAllDateList,
  selectMemMat,
} from '../../features/allDateList/allDateSlice';
import { uuKey } from '../../utils';

const classes = {
  headColOut: css({
    position: 'sticky',
    left: '0px',
  }),
  headColIn: css({
    width: '50px',
    backgroundColor: green[100],
  }),
};

type Marker = '○' | '△' | '×';
const markers: Marker[] = ['○', '△', '×'];

function AllDateHead() {
  const items = ['日程'].concat(markers).map((item) => (
    <Grid item key={uuKey()}>
      <Typography>{item}</Typography>
    </Grid>
  ));

  return (
    <Grid item css={classes.headColOut}>
      <Grid container direction="column" css={classes.headColIn}>
        {items}
      </Grid>
    </Grid>
  );
}

function DateCol(props: { date: string; markersCnt: number[] }) {
  const items = props.markersCnt.map((item) => (
    <Grid item key={uuKey()}>
      <Typography>{item}</Typography>
    </Grid>
  ));

  return (
    <Grid container direction="column" sx={{ width: '60ox' }}>
      <Grid item>
        <Typography>{props.date}</Typography>
      </Grid>
      {items}
    </Grid>
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
    return (
      <>
        <Divider orientation="vertical" flexItem />
        <Grid item>
          <DateCol key={uuKey()} date={date} markersCnt={markersCnt} />
        </Grid>
      </>
    );
  });

  return <>{rowItems}</>;
}

export function AllDateTable3() {
  return (
    <Paper>
      <Grid
        container
        direction="row"
        wrap="nowrap"
        sx={{ overflowX: 'scroll' }}
      >
        <AllDateHead />
        <AllDateBody />
      </Grid>
    </Paper>
  );
}

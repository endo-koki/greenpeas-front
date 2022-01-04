/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { grey, lime } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { selectMemList, selectMemMat } from '../../features/allDateSlice';
import { useAppSelector } from '../../app/hooks';

const classes = {
  dateInfo: css({
    position: 'absolute',
    // border: '1px solid black',
    // borderRadius: '3px',
    color: grey[800],
    backgroundColor: lime[50],
    padding: '3px',
    lineHeight: 1.5,
    zIndex: 1500, // drawerは1200っぽい
  }),
  icon: css({
    fontSize: '12px',
  }),
  text: css({
    fontSize: '12px',
    paddingLeft: '2em',
    textIndent: '-2em',
  }),
};

export function DateInfo(props: { idx: number; x: number; y: number }) {
  const memMat = useAppSelector(selectMemMat);
  const memList = useAppSelector(selectMemList);
  const memVec = memMat[props.idx];
  const okMems = memList.filter((_, idx) => memVec[idx] === '○');
  const qMems = memList.filter((_, idx) => memVec[idx] === '△');
  const ngMems = memList.filter((_, idx) => memVec[idx] === '×');

  const pos: { top: string; left?: string; right?: string } = {
    top: `${props.y + 10}px`,
  };
  if (props.x <= 0.8 * window.innerWidth) {
    pos.left = `${props.x + 10}px`;
  } else {
    pos.right = `${window.innerWidth - props.x + 10}px`;
  }

  return (
    <Paper css={classes.dateInfo} sx={pos}>
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
          <Typography align="left" css={classes.text}>
            <CircleOutlinedIcon css={classes.icon} />：{okMems.join(', ')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="left" css={classes.text}>
            <ChangeHistoryIcon css={classes.icon} />：{qMems.join(', ')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="left" css={classes.text}>
            <ClearIcon css={classes.icon} />：{ngMems.join(', ')}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

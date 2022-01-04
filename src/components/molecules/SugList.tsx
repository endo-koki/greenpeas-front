/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { green } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSuggestion,
  selectAllDateList,
  suggestDate,
} from '../../features/allDateSlice';
import { ScheduleList } from '../../calcSchedule';
import { uuKey } from '../../utils';

const classes = {
  noResult: css({
    width: '16vw',
    margin: '16px auto',
    textAlign: 'center',
  }),
  sugPaper: css({
    width: '16vw',
    backgroundColor: green[100],
    margin: '8px auto',
    padding: '8px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 250ms 0s ease',
    '&:hover': {
      backgroundColor: green[50],
    },
  }),
  sugList: css({
    maxHeight: 'calc(100vh - 221.5px)',
    overflowY: 'scroll',
  }),
};

function SugPaper(props: { sug: ScheduleList }) {
  const allDateList = useAppSelector(selectAllDateList);
  const dispatch = useAppDispatch();

  const dateList = props.sug.dateIdxs.map((idx) => (
    <li key={uuKey()}>{allDateList[idx]}</li>
  ));

  function handleClick() {
    dispatch(clearSuggestion());
    props.sug.dateIdxs.forEach((idx) => {
      dispatch(suggestDate(idx));
    });
  }

  return (
    <Paper variant="outlined" onClick={handleClick} css={classes.sugPaper}>
      <Typography>候補日: </Typography>
      <ul>{dateList}</ul>
    </Paper>
  );
}

export function SugList(props: { sugs: ScheduleList[]; computed: boolean }) {
  const noResult = props.computed && props.sugs.length === 0;
  const cands = noResult
    ? [<Typography css={classes.noResult}>候補なし</Typography>]
    : props.sugs.map((sug) => <SugPaper key={uuKey()} sug={sug} />);

  return <div css={classes.sugList}>{cands}</div>;
}

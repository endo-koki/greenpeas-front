/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearSuggestion,
  selectAllDateList,
  selectCalcState,
  suggestDate,
} from '../../features/allDateSlice';
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

function SugPaper(props: { sugDateIdxs: number[] }) {
  const allDateList = useAppSelector(selectAllDateList);
  const dispatch = useAppDispatch();

  const dateList = props.sugDateIdxs.map((idx) => (
    <li key={uuKey()}>{allDateList[idx]}</li>
  ));

  function handleClick() {
    dispatch(clearSuggestion());
    props.sugDateIdxs.forEach((idx) => {
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

export function SugList(props: { sugDateIdxs: number[] }) {
  const calcState = useAppSelector(selectCalcState);

  let statusStrs: string[] = [];
  let suggestion = null;
  switch (calcState) {
    case 'init':
    case 'ready':
    case 'LOADED':
      break;
    case 'pending':
      statusStrs = ['計算中…'];
      suggestion = (
        <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
      );
      break;
    case 'OPTIMAL':
      suggestion = <SugPaper sugDateIdxs={props.sugDateIdxs} />;
      break;
    case 'FEASIBLE':
      statusStrs = [
        '計算が終わらなかったため途中結果を表示しました。',
        '候補日数を減らすとより良い解が見つかるかもしれません。',
      ];
      suggestion = <SugPaper sugDateIdxs={props.sugDateIdxs} />;
      break;
    case 'INFEASIBLE':
    case 'INT_INFEASIBLE':
    case 'CUTOFF':
    case 'NO_SOLUTION_FOUND':
      statusStrs = ['候補なし。', '条件を緩めてください。'];
      break;
    case 'ERROR':
    case 'UNBOUNDED':
      statusStrs = ['計算中にエラーが発生しました。', calcState];
      break;
    default:
      break;
  }

  const text: any[] = [];
  statusStrs.forEach((str) => {
    text.push(str);
    text.push(<br />);
  });
  text.pop();

  return (
    <div css={classes.sugList}>
      <Typography css={classes.noResult}>{text}</Typography>
      {suggestion}
    </div>
  );
}

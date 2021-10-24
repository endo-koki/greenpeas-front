/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import { green, grey } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDateArr,
  switchDate,
} from '../../features/allDateList/allDateSlice';
import { DateInfo } from '../molecules/DateInfo';

const colors: string[] = [green[300], green[400], grey[700], ''];

const classes = {
  cell: css({
    cursor: 'pointer',
  }),
};

export function DateCell(props: { content: string | number; idx: number }) {
  const dispatch = useAppDispatch();
  const dateArr = useAppSelector(selectDateArr);
  const dateState = dateArr[props.idx];
  const color = colors[dateState + 1];

  const [showInfo, setShowInfo] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0] as [number, number]);
  function handleMouseMove(e: React.MouseEvent) {
    setShowInfo(true);
    setMousePos([e.nativeEvent.pageX, e.nativeEvent.pageY]);
  }

  return (
    <>
      <TableCell
        align="center"
        onClick={() => dispatch(switchDate(props.idx))}
        // onMouseEnter={() => dispatch(setInfoIdx(props.idx))}
        // onMouseLeave={() => dispatch(setInfoIdx(-1))}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowInfo(false)}
        css={classes.cell}
        sx={{ backgroundColor: color }}
      >
        {props.content}
        {showInfo && (
          <DateInfo idx={props.idx} x={mousePos[0]} y={mousePos[1]} />
        )}
      </TableCell>
    </>
  );
}

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import React from 'react';

const btnCls = css({
  borderRadius: '20px',
});

export function ContainedBtn(props: { text: string; onClick: () => void }) {
  return (
    <Button variant="contained" onClick={props.onClick} css={btnCls}>
      {props.text}
    </Button>
  );
}

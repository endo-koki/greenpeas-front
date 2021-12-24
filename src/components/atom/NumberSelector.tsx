/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

const classes = {
  input: css({
    width: '25vw',
  }),
};

export function NumberSelector(props: {
  text: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  function increment() {
    const currentNum = props.value;
    props.setValue(currentNum + 1);
  }
  function decrement() {
    const currentNum = props.value;
    props.setValue(Math.max(currentNum - 1, 0));
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      css={classes.input}
    >
      <Grid item>
        <Typography sx={{ width: '100px' }}>{props.text}</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item>
            <IconButton onClick={decrement}>
              <RemoveIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>{props.value}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={increment}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

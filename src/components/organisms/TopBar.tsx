/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Grid from '@mui/material/Grid';
import { green } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Button from '@mui/material/Button';

const classes = {
  root: css({
    backgroundColor: green[600],
  }),
  title: css({
    fontSize: '34px',
    fontWeight: 'bold',
  }),
  loadBtn: css({
    color: 'white',
    borderRadius: '20px',
    borderColor: 'white',
    '&:hover': {
      backgroundColor: green[500],
      borderColor: 'white',
    },
  }),
  iconBtn: css({
    color: 'white',
  }),
};

export function TopBar(props: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenLoader: () => void;
  onOpenExporter: () => void;
}) {
  function handleBtnClick() {
    props.setOpenDrawer(!props.openDrawer);
  }

  return (
    <AppBar position="fixed" css={classes.root}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="left" spacing={4}>
          <Grid item>
            <Typography variant="h5" component="h1" css={classes.title}>
              Green Peas
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={props.onOpenLoader}
              css={classes.loadBtn}
            >
              csvファイルを読込
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={props.onOpenExporter}
              css={classes.loadBtn}
            >
              調整結果をエクスポート
            </Button>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
            <IconButton onClick={handleBtnClick} css={classes.iconBtn}>
              <EventNoteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

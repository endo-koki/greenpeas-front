/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { ContainedBtn } from '../atom/ContainedBtn';

const classes = {
  dialogBody: css({
    width: '520px',
    padding: '15px',
  }),
  urlField: css({
    width: '470px',
  }),
  cancelBtn: css({
    borderRadius: '20px',
    color: green[700],
    borderColor: green[700],
    '&:hover': {
      borderColor: green[700],
      backgroundColor: green[100],
    },
  }),
  dlBtn: css({
    borderRadius: '20px',
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[600],
    },
  }),
};

type Props = {
  open: boolean;
  onClose: () => void;
};
export function DownloadDialog(props: Props) {
  const [url, setUrl] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  function download(): void {
    const urlHead = 'https://chouseisan.com/s?h=';
    if (url.indexOf(urlHead) !== 0) {
      alert('urlが正しくないようです。');
      return;
    }
    const csvId = url.slice(urlHead.length);
    const downloadUrl = `https://chouseisan.com/schedule/List/createCsv?h=${csvId}`;
    window.open(downloadUrl);
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>csvファイルをダウンロード</DialogTitle>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        spacing={2}
        css={classes.dialogBody}
      >
        <Grid item>
          <Typography>
            調整さんのurlを入力してダウンロードボタンを押してください。
          </Typography>
        </Grid>
        <Grid item>
          <Input
            id="url"
            value={url}
            placeholder="https://chouseisan.com/s?h=…"
            onChange={handleChange}
            css={classes.urlField}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                variant="outlined"
                onClick={props.onClose}
                css={classes.cancelBtn}
              >
                戻る
              </Button>
            </Grid>
            <Grid item>
              <ContainedBtn text="ダウンロード" onClick={download} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

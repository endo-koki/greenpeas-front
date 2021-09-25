/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { green } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DownloadDialog } from '../molecules/Downloader';

const classes = {
  root: css({
    width: '100vw',
    height: 'calc(100vh - 20px)',
    padding: '10px',
    backgroundColor: green[200],
  }),
  card: css({
    width: '400px',
    height: '400px',
    margin: '0 auto',
    backgroundColor: green[100],
  }),
  // fileBtn: css({
  //   backgroundColor: '#e0e0e0',
  //   color: 'black',
  //   '&:hover': {
  //     backgroundColor: '#d7d7d7',
  //   },
  // }),
  fileBtn: css({
    borderRadius: '20px',
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[600],
    },
  }),
  dlBtn: css({
    borderRadius: '20px',
    color: green[700],
    '&:hover': {
      backgroundColor: green[200],
    },
  }),
};

type Props = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
export function LoadPage(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const filename: string =
    props.file === null ? 'ファイル未選択' : props.file.name;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) {
      props.setFile(null);
    } else {
      props.setFile(e.target.files[0]);
    }
  }

  return (
    <div css={classes.root}>
      <Card css={classes.card}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item />
          <Grid item>
            <Typography variant="h5" component="h2">
              csvファイルを選択
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item sx={{ flexGrow: 1 }}>
                <Button
                  variant="contained"
                  component="label"
                  css={classes.fileBtn}
                >
                  ファイルを選択
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => handleChange(e)}
                  />
                </Button>
              </Grid>
              <Grid item>
                <Typography>{filename}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={() => setOpenDialog(true)}
              endIcon={<ChevronRightIcon />}
              css={classes.dlBtn}
            >
              csvファイルを持っていない？
            </Button>
          </Grid>
        </Grid>
        <DownloadDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </Card>
    </div>
  );
}
